##############################################################################
# BackupPilot — Terraform Infrastructure
#
# Provisions:
#   • Cognito User Pool + App Client (no client secret)
#   • Aurora Serverless v2 (PostgreSQL 15)
#   • Lambda functions (backup-worker + restore-worker)
#   • EventBridge Scheduler IAM role
#   • SNS topic for email alerts
#   • VPC, Subnets, Security Groups for Aurora
#   • All required IAM roles/policies
##############################################################################

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ──────────────────────────────────────────────────────
# Variables
# ──────────────────────────────────────────────────────

variable "aws_region" {
  default     = "us-east-1"
  description = "AWS region for all resources"
}

variable "project_name" {
  default     = "backuppilot"
  description = "Project prefix used in resource names"
}

variable "db_master_username" {
  default     = "bpadmin"
  sensitive   = true
  description = "Aurora master username"
}

variable "db_master_password" {
  sensitive   = true
  description = "Aurora master password"
}

variable "notification_email" {
  description = "Email address for SNS alert subscriptions"
}

locals {
  tags = {
    Project     = var.project_name
    ManagedBy   = "Terraform"
    Environment = "production"
  }
}

# ──────────────────────────────────────────────────────
# VPC + Networking
# ──────────────────────────────────────────────────────

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(local.tags, { Name = "${var.project_name}-vpc" })
}

resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"

  tags = merge(local.tags, { Name = "${var.project_name}-private-a" })
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"

  tags = merge(local.tags, { Name = "${var.project_name}-private-b" })
}

resource "aws_security_group" "aurora" {
  name_prefix = "${var.project_name}-aurora-"
  vpc_id      = aws_vpc.main.id
  description = "Security group for Aurora Serverless v2"

  ingress {
    description     = "PostgreSQL from Lambda SG"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.lambda.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.tags
}

resource "aws_security_group" "lambda" {
  name_prefix = "${var.project_name}-lambda-"
  vpc_id      = aws_vpc.main.id
  description = "Security group for Lambda workers"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.tags
}

resource "aws_db_subnet_group" "aurora" {
  name       = "${var.project_name}-aurora-subnets"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]
  tags       = local.tags
}

# ──────────────────────────────────────────────────────
# Aurora Serverless v2 (PostgreSQL)
# ──────────────────────────────────────────────────────

resource "aws_rds_cluster" "aurora" {
  cluster_identifier     = "${var.project_name}-aurora"
  engine                 = "aurora-postgresql"
  engine_mode            = "provisioned"
  engine_version         = "15.4"
  database_name          = "backuppilot"
  master_username        = var.db_master_username
  master_password        = var.db_master_password
  db_subnet_group_name   = aws_db_subnet_group.aurora.name
  vpc_security_group_ids = [aws_security_group.aurora.id]
  skip_final_snapshot    = true

  serverlessv2_scaling_configuration {
    min_capacity = 0.5
    max_capacity = 4.0
  }

  tags = local.tags
}

resource "aws_rds_cluster_instance" "aurora_instance" {
  cluster_identifier = aws_rds_cluster.aurora.id
  instance_class     = "db.serverless"
  engine             = aws_rds_cluster.aurora.engine
  engine_version     = aws_rds_cluster.aurora.engine_version

  tags = local.tags
}

# ──────────────────────────────────────────────────────
# Cognito User Pool
# ──────────────────────────────────────────────────────

resource "aws_cognito_user_pool" "main" {
  name = "${var.project_name}-user-pool"

  auto_verified_attributes = ["email"]
  username_attributes      = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_uppercase = true
    require_numbers   = true
    require_symbols   = false
  }

  schema {
    attribute_data_type = "String"
    name                = "email"
    required            = true
    mutable             = true
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  schema {
    attribute_data_type = "String"
    name                = "name"
    required            = true
    mutable             = true
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  tags = local.tags
}

resource "aws_cognito_user_pool_client" "app" {
  name                = "${var.project_name}-app-client"
  user_pool_id        = aws_cognito_user_pool.main.id
  generate_secret     = false # No client secret (SPA/public client)
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_USER_PASSWORD_AUTH",
  ]

  prevent_user_existence_errors = "ENABLED"
}

resource "aws_cognito_user_group" "admin" {
  name         = "Admin"
  user_pool_id = aws_cognito_user_pool.main.id
  description  = "Administrator group"
}

resource "aws_cognito_user_group" "user" {
  name         = "User"
  user_pool_id = aws_cognito_user_pool.main.id
  description  = "Standard user group"
}

# ──────────────────────────────────────────────────────
# SNS Topic
# ──────────────────────────────────────────────────────

resource "aws_sns_topic" "alerts" {
  name = "${var.project_name}-alerts"
  tags = local.tags
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.notification_email
}

# ──────────────────────────────────────────────────────
# IAM — Lambda Execution Role
# ──────────────────────────────────────────────────────

resource "aws_iam_role" "lambda_exec" {
  name = "${var.project_name}-lambda-exec"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })

  tags = local.tags
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_vpc" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

resource "aws_iam_role_policy" "lambda_services" {
  name = "${var.project_name}-lambda-services"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ec2:CreateSnapshot",
          "ec2:DescribeSnapshots",
          "ec2:DescribeVolumes",
          "ec2:CreateVolume",
          "ec2:DescribeInstances",
          "ec2:CreateTags",
          "ec2:DeleteSnapshot",
          "ec2:AttachVolume"
        ]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = ["sns:Publish"]
        Resource = [aws_sns_topic.alerts.arn]
      }
    ]
  })
}

# ──────────────────────────────────────────────────────
# IAM — EventBridge Scheduler Role
# ──────────────────────────────────────────────────────

resource "aws_iam_role" "scheduler_exec" {
  name = "${var.project_name}-scheduler-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "scheduler.amazonaws.com" }
    }]
  })

  tags = local.tags
}

resource "aws_iam_role_policy" "scheduler_invoke_lambda" {
  name = "${var.project_name}-scheduler-invoke"
  role = aws_iam_role.scheduler_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["lambda:InvokeFunction"]
      Resource = [
        aws_lambda_function.backup_worker.arn,
        aws_lambda_function.restore_worker.arn
      ]
    }]
  })
}

# ──────────────────────────────────────────────────────
# Lambda Functions
# ──────────────────────────────────────────────────────

data "archive_file" "backup_worker" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda/backup-worker"
  output_path = "${path.module}/.build/backup-worker.zip"
}

data "archive_file" "restore_worker" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda/restore-worker"
  output_path = "${path.module}/.build/restore-worker.zip"
}

resource "aws_lambda_function" "backup_worker" {
  function_name = "${var.project_name}-backup-worker"
  runtime       = "nodejs20.x"
  handler       = "index.handler"
  role          = aws_iam_role.lambda_exec.arn
  filename      = data.archive_file.backup_worker.output_path
  source_code_hash = data.archive_file.backup_worker.output_base64sha256
  timeout       = 300
  memory_size   = 256

  vpc_config {
    subnet_ids         = [aws_subnet.private_a.id, aws_subnet.private_b.id]
    security_group_ids = [aws_security_group.lambda.id]
  }

  environment {
    variables = {
      DATABASE_URL        = "postgresql://${var.db_master_username}:${var.db_master_password}@${aws_rds_cluster.aurora.endpoint}:5432/backuppilot"
      SNS_TOPIC_ARN       = aws_sns_topic.alerts.arn
      AWS_REGION_CUSTOM   = var.aws_region
    }
  }

  tags = local.tags
}

resource "aws_lambda_function" "restore_worker" {
  function_name = "${var.project_name}-restore-worker"
  runtime       = "nodejs20.x"
  handler       = "index.handler"
  role          = aws_iam_role.lambda_exec.arn
  filename      = data.archive_file.restore_worker.output_path
  source_code_hash = data.archive_file.restore_worker.output_base64sha256
  timeout       = 300
  memory_size   = 256

  vpc_config {
    subnet_ids         = [aws_subnet.private_a.id, aws_subnet.private_b.id]
    security_group_ids = [aws_security_group.lambda.id]
  }

  environment {
    variables = {
      DATABASE_URL        = "postgresql://${var.db_master_username}:${var.db_master_password}@${aws_rds_cluster.aurora.endpoint}:5432/backuppilot"
      SNS_TOPIC_ARN       = aws_sns_topic.alerts.arn
      AWS_REGION_CUSTOM   = var.aws_region
    }
  }

  tags = local.tags
}

# ──────────────────────────────────────────────────────
# Outputs
# ──────────────────────────────────────────────────────

output "cognito_user_pool_id" {
  value       = aws_cognito_user_pool.main.id
  description = "Cognito User Pool ID"
}

output "cognito_client_id" {
  value       = aws_cognito_user_pool_client.app.id
  description = "Cognito App Client ID (no secret)"
}

output "aurora_cluster_endpoint" {
  value       = aws_rds_cluster.aurora.endpoint
  description = "Aurora PostgreSQL writer endpoint"
}

output "aurora_database_url" {
  value       = "postgresql://${var.db_master_username}:PASSWORD@${aws_rds_cluster.aurora.endpoint}:5432/backuppilot"
  description = "DATABASE_URL template (replace PASSWORD)"
  sensitive   = true
}

output "backup_worker_lambda_arn" {
  value = aws_lambda_function.backup_worker.arn
}

output "restore_worker_lambda_arn" {
  value = aws_lambda_function.restore_worker.arn
}

output "sns_topic_arn" {
  value = aws_sns_topic.alerts.arn
}

output "scheduler_role_arn" {
  value = aws_iam_role.scheduler_exec.arn
}
