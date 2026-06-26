# BackupPilot — Enterprise Multi-Tenant AWS Backup SaaS

> **BackupPilot is a Multi-Tenant SaaS orchestrator for AWS backups.** 
> Built with Next.js 14, Tailwind CSS, Prisma, Amazon Cognito, and a highly distributed Control Plane vs. Data Plane architecture utilizing AWS STS, Secrets Manager, Aurora PostgreSQL, EventBridge, and Lambda.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![AWS](https://img.shields.io/badge/AWS-Cognito%20%7C%20STS%20%7C%20Secrets%20Manager-orange?logo=amazonaws)
![Prisma](https://img.shields.io/badge/ORM-Prisma%205-2D3748?logo=prisma)

---

## 📖 Deep-Dive Architecture Guide
**Hackathon Judges & Technical Reviewers:** Please see the highly comprehensive [PROJECT_GUIDE.md](PROJECT_GUIDE.md) for an in-depth breakdown of the "What," "Why," and "How" of every AWS service, coding framework, and architectural decision used to build this platform.

---

## 🏗 Architectural Overview

BackupPilot operates on a **Control Plane vs. Data Plane** SaaS architecture to guarantee absolute data privacy, compliance, and cost-efficiency.

```text
       [ BackupPilot Control Plane ]
        Next.js Frontend & API (Vercel)
        Cognito User Pool (Authentication)
        Control DB (Users, Connection metadata)
                      │
                      │ 1. AssumeRole (STS) with ExternalId
                      │ 2. Fetch RDS Password (Secrets Manager)
                      ▼
       ┌───────────────────────────────────────────────────┐
       │             CUSTOMER AWS ACCOUNT                  │
       │                                                   │
       │  [ Aurora PostgreSQL Serverless v2 ]              │
       │  Stores: targets, policies, jobs, snapshots,      │
       │          restores, notifications, audit logs      │
       │                      ▲                            │
       │                      │ Read / Write               │
       │                      │                            │
       │        ┌─────────────┴─────────────┐              │
       │        │   Backup/Restore Lambdas  │              │
       │        └─────────────┬─────────────┘              │
       │                      │ Orchestrates               │
       │                      ▼                            │
       │           [ EC2 / EBS Snapshots ]                 │
       │                                                   │
       └───────────────────────────────────────────────────┘
```

### The Concept: Zero-Knowledge Storage
*   **No Stored Credentials:** BackupPilot uses AWS STS (Secure Token Service) to temporarily assume an IAM Role inside the customer's account. It dynamically fetches database passwords from AWS Secrets Manager on the fly and never stores them.
*   **Isolated Compute:** Backups are executed by AWS Lambdas running inside the customer's AWS account. BackupPilot orchestrates the process without ever touching the actual snapshot data, meaning it costs BackupPilot $0 in storage to scale to millions of customers.

---

## 🚀 Key Features

*   **Multi-Tenant Resource Isolation** — Dynamic instantiation of Prisma clients based on the logged-in Cognito user ID.
*   **Automated Snapshots** — EventBridge-driven cron schedules invoke AWS Lambdas to capture EBS volume state.
*   **Smart Retention Logic** — Automatic cleanup of aging snapshots directly controlled by customer-defined backup policies.
*   **In-Place Volume Restore** — 1-click recreation of EBS volumes from historical snapshots via the dashboard.
*   **Dynamic Data Plane Setup** — 1-click customer onboarding using a custom AWS CloudFormation infrastructure-as-code template.

---

## 💻 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), React 18, Tailwind CSS |
| **Auth** | Amazon Cognito (User Pool, Authorization Code Flow) |
| **Control DB ORM** | Prisma 5 (`@prisma/client`) |
| **Control DB** | Aurora PostgreSQL Serverless v2 (Control Plane Metadata) |
| **Data Plane ORM** | Prisma 5 (`@prisma/customer-client`) |
| **Data Plane DB** | RDS Aurora PostgreSQL (Customer AWS Account) |
| **Infrastructure (Control)**| AWS, Vercel |
| **Infrastructure (Customer)**| AWS CloudFormation Template (`public/CloudFormation.yaml`) |
| **Assumed Auth Provider**| AWS STS (Secure Token Service) |

---

## 🛠 Local Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Clients
BackupPilot uses two separate schemas and client outputs. Generate them both:
```bash
# 1. Generate Control Plane Client
npx prisma generate

# 2. Generate Customer Data Plane Client
npx prisma generate --schema=prisma/customer.prisma
```

### 3. AWS Configuration
In your `.env` file, ensure you have configured your AWS programmatic access keys and Cognito User Pool credentials. `MOCK_AWS` should be set to `"false"`.
```bash
MOCK_AWS="false"
AWS_REGION="ap-south-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
COGNITO_USER_POOL_ID="..."
COGNITO_CLIENT_ID="..."
DATABASE_URL="..." # Control Plane DB
```

### 4. Database Setup & Seeding
Push the control plane schema to your main database and seed it:
```bash
npx prisma db push
npm run prisma:seed
```

### 5. Deploying a Customer Data Plane (CloudFormation)
To act as a customer and link your AWS account to the SaaS:
1. In the AWS Console, deploy the `public/CloudFormation.yaml` template.
2. Wait for the deployment to finish and go to the **Outputs** tab.
3. Start the app with `npm run dev` and navigate to `http://localhost:3000/dashboard/connect`.
4. Input your AWS connection credentials. The backend will automatically scaffold the required tables (zero-touch database migration) into your new AWS RDS instance securely via the SDK!

---
*Built for the cloud, architected for security.*
