<div align="center">

# ☁️ BackupPilot

### Production-Oriented Multi-Tenant AWS Backup Orchestration Platform

**A multi-tenant SaaS control plane designed to orchestrate EBS backups across multiple customer AWS accounts without centralizing customer data.**

[![Next.js](https://img.shields.io/badge/Next.js_14-App_Router-000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![AWS](https://img.shields.io/badge/AWS-STS_|_Cognito_|_Aurora_|_Lambda-FF9900?logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![Prisma](https://img.shields.io/badge/Prisma_5-Dual_Schema-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

<!-- 📸 SCREENSHOT PLACEHOLDER -->
![BackupPilot Dashboard Placeholder](public/images/dashboard-placeholder.png)

<!-- 🎬 DEMO VIDEO PLACEHOLDER -->
[![Watch the Demo Video](https://img.shields.io/badge/Demo_Video-Watch_Walkthrough-red?style=for-the-badge&logo=youtube)](https://youtu.be/placeholder)

<!-- 🔗 LIVE DEMO PLACEHOLDER -->
[![Live Demo](https://img.shields.io/badge/Live_Demo-backuppilot.vercel.app-blue?style=for-the-badge&logo=vercel)](https://backuppilot.vercel.app)

</div>

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-the-solution)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [AWS Services Deep-Dive](#-aws-services-deep-dive)
- [Database Design](#-database-design)
- [Security Model](#-security-model)
- [Scalability](#-scalability)
- [Challenges Faced](#-challenges-faced)
- [Production-Oriented Design](#-production-oriented-design)
- [Setup & Installation](#-setup--installation)
- [Project Structure](#-project-structure)
- [Future Improvements](#-future-improvements)

---

## 🎯 Problem Statement

**AWS backup management across multiple accounts is often fragmented, manual, and inconsistent.**

Organizations running workloads on EC2/EBS face three critical operational challenges:

| Challenge | Impact |
|-----------|--------|
| **No centralized backup orchestration** | Teams manually snapshot volumes or maintain custom scripts per account, increasing administrative overhead. |
| **Security vs. convenience tradeoff** | Conventional tools often require persistent IAM access keys or excessive administrative access. |
| **Multi-account sprawl** | Managing visibility and auditing across multiple AWS accounts becomes increasingly complex. |

Standard AWS Backup workflows require per-account configuration with no native multi-tenant SaaS management layer. Third-party solutions often demand high-privilege credentials or root-level access to customer infrastructure, which introduces significant security and compliance overhead.

> **BackupPilot is architected to address this:** a single SaaS control plane that orchestrates automated EBS backups across multiple AWS accounts, utilizing dynamic, temporary AWS credentials to eliminate the need for storing customer IAM access keys.

---

## 💡 The Solution

BackupPilot is a **Multi-Tenant SaaS Backup Orchestration Platform** that separates the *control plane* (management) from the *data plane* (execution).

Instead of centralizing customer data, BackupPilot orchestrates backup and restore operations that execute **entirely inside the customer's own AWS account**. The platform is designed to avoid storing user credentials and to minimize management-plane costs by utilizing customer-managed compute resources.

```
┌─────────────────────────────────────────┐
│         How BackupPilot Works           │
├─────────────────────────────────────────┤
│                                         │
│  1. Customer deploys a CloudFormation   │
│     stack in their AWS account          │
│                                         │
│  2. BackupPilot assumes a scoped IAM    │
│     Role via STS (no stored access keys)│
│                                         │
│  3. Backups execute via Lambda inside   │
│     the customer's account              │
│                                         │
│  4. Data never leaves the customer's    │
│     AWS account boundary                │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✨ Key Features

### 🏢 Multi-Tenancy
- **Per-tenant database isolation** — Customer data resides in dedicated Aurora PostgreSQL instances in their respective AWS accounts.
- **Dynamic Prisma client instantiation** — Tenant-specific database connections are established at runtime based on the authenticated Cognito user identity.
- **Physical database isolation** — Tenant database instances are separated, preventing cross-tenant data access or co-mingling in the control plane.

### 🔐 Security
- **Security-focused control plane** — Avoids storing permanent AWS access keys, database passwords, or backup snapshot data.
- **Cross-account STS AssumeRole** — Employs temporary, short-lived (1-hour expiry) security credentials instead of persistent keys.
- **Confused Deputy mitigation** — Uses the Cognito user UUID as the `ExternalId` during STS AssumeRole calls to prevent unauthorized role assumptions.
- **Dynamic Secrets Manager retrieval** — Fetches database connection passwords dynamically at request runtime in memory.

### ⚡ Automation
- **EventBridge-driven scheduling** — Creates custom EventBridge Scheduler rules inside the customer's account to invoke Lambdas on set schedules.
- **Policy-based retention** — Automates the deletion of expired snapshots based on configured retention durations via the Lambda execution worker.
- **Automated database schema updates** — Onboarded customer databases are automatically structured by applying schema migrations programmatically using Next.js route handlers.

### 📊 Reporting & Observability
- **CSV and PDF reports** — Allows exporting backup metrics, success rates, storage estimates, and restore history.
- **Operational dashboard** — Displays job statistics, storage trends, and system status via interactive React charts (Recharts).
- **Audit logging** — Captures detailed audit logs (actor, action, timestamp, entity) for operational accountability.
- **Notification center** — In-app notification center that surfaces backup and restore alerts in real-time.

### 🔄 Backup & Restore
- **Automated EBS snapshots** — EventBridge triggers regional Lambda functions to execute EBS snapshots with structured tag propagation.
- **Simplified volume restore** — Re-provisions EBS volumes from existing snapshots directly via the dashboard interface.
- **Validated target registration** — Registers and validates active EC2 instances and EBS volumes prior to scheduling.

### 👤 User Experience
- **Managed user authentication** — Complete authentication flow including signup, email verification, signin, password resets, and changes via Amazon Cognito.
- **Guided AWS onboarding** — Step-by-step setup using a CloudFormation template with inline connection validation.
- **SNS alerts** — Delivers success/failure notifications directly to customer-configured SNS topics.

---

## 🏗 Architecture

BackupPilot implements a **Control Plane vs. Data Plane** architecture — a pattern designed to isolate customer data and manage resources securely at scale.

<!-- 🖼 ARCHITECTURE DIAGRAM PLACEHOLDER -->
![BackupPilot Architecture Diagram Placeholder](public/images/architecture-placeholder.png)

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                     CONTROL PLANE (BackupPilot)                      │
│                                                                      │
│  ┌──────────────┐   ┌──────────────┐   ┌───────────────────────┐    │
│  │  Next.js 14  │   │   Amazon     │   │  Aurora PostgreSQL    │    │
│  │  App Router  │◄─►│   Cognito    │   │  (Control Database)   │    │
│  │  (Vercel)    │   │   (Auth)     │   │  Users + Connections  │    │
│  └──────┬───────┘   └──────────────┘   └───────────────────────┘    │
│         │                                                            │
│         │ API Route Handlers                                         │
│         │ ┌─────────────────────────────────────────┐                │
│         ├─│ 1. Verify JWT (middleware.ts)            │                │
│         ├─│ 2. Lookup AwsConnection (Control DB)    │                │
│         ├─│ 3. STS AssumeRole + ExternalId           │                │
│         └─│ 4. Fetch DB password (Secrets Manager)  │                │
│           └──────────────────┬──────────────────────┘                │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                     Cross-Account Boundary
                               │
 ┌─────────────────────────────┼───────────────────────────────────────┐
 │                  DATA PLANE (Customer AWS Account)                    │
 │                             ▼                                       │
 │  ┌─────────────────────────────────────────────────────────────┐     │
 │  │  BackupPilotCustomerRole (IAM)                              │     │
 │  │  Trusted by: BackupPilot SaaS Account                       │     │
 │  │  Condition: sts:ExternalId == Cognito User UUID             │     │
 │  └─────────────────────────────────────────────────────────────┘     │
 │                                                                      │
 │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  ┌──────────┐  │
 │  │   Aurora     │  │  EventBridge │  │   Lambda    │  │   SNS    │  │
 │  │  PostgreSQL  │  │  Scheduler   │  │  Workers    │  │  Alerts  │  │
 │  │  (Customer   │  │  (Cron Jobs) │  │  (Backup +  │  │  (Email) │  │
 │  │   Data)      │  │              │  │   Restore)  │  │          │  │
 │  └──────────────┘  └──────────────┘  └─────────────┘  └──────────┘  │
 │                                                                      │
 │  ┌─────────────────────────────┐  ┌──────────────────────────────┐  │
 │  │  Secrets Manager            │  │  EC2 / EBS                   │  │
 │  │  (Aurora Credentials)       │  │  (Protected Resources)       │  │
 │  └─────────────────────────────┘  └──────────────────────────────┘  │
 │                                                                      │
 └──────────────────────────────────────────────────────────────────────┘
```

### Customer Onboarding Flow

```
Customer                    BackupPilot                  Customer AWS Account
   │                            │                               │
   │  1. Deploy CloudFormation  │                               │
   │  ─────────────────────────────────────────────────────────►│
   │                            │        Provisions:            │
   │                            │        • VPC + Subnets        │
   │                            │        • Aurora PostgreSQL    │
   │                            │        • IAM Role             │
   │                            │        • Secrets Manager      │
   │                            │        • Lambda Functions     │
   │                            │        • SNS Topic            │
   │  2. Copy CloudFormation    │                               │
   │     Outputs                │                               │
   │  ─────────────────────────►│                               │
   │                            │  3. STS AssumeRole ──────────►│
   │                            │  4. Fetch Secret ────────────►│
   │                            │  5. Connect to Aurora ───────►│
   │                            │  6. prisma db push ──────────►│
   │                            │     (scaffolds all tables)    │
   │  ◄────────────────────────│                               │
   │  Connection Verified ✓     │                               │
```

### Multi-Tenant Request Flow

When a logged-in user clicks "View Backup Jobs," this is the exact sequence:

1. **Browser** → `GET /api/jobs`
2. **Middleware** (`middleware.ts`) → Verifies Cognito JWT, extracts `sub` (User UUID), injects `x-user-id` header
3. **API Route** → Calls `getTenantContext(request)` which:
   - Looks up the user's `AwsConnection` in the Control DB
   - Calls `STS AssumeRole` with the customer's Role ARN + ExternalId
   - Uses temporary credentials to fetch the Aurora password from Secrets Manager
   - Constructs a `postgresql://` connection string dynamically
   - Instantiates (or reuses) a tenant-scoped `@prisma/customer-client`
4. **Query** → Prisma queries the customer's Aurora instance: `SELECT * FROM backup_jobs`
5. **Response** → JSON returned to the React frontend

---

## 🛠 Technology Stack

| Layer | Technology | Why This Choice |
|-------|-----------|-----------------|
| **Frontend** | Next.js 14 (App Router), React 18 | Server Components enable secure, direct AWS SDK calls without exposing credentials to the browser. API Route Handlers act as serverless microservices. |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS enables rapid prototyping with consistent design tokens across the dashboard UI. |
| **Auth** | Amazon Cognito | Managed identity service handles registration, email verification, password resets, and JWT issuance — reducing custom authentication overhead. |
| **Control DB ORM** | Prisma 5 (`@prisma/client`) | Type-safe ORM for the central SaaS database. Schema-first approach catches data model errors at compile time. |
| **Data Plane ORM** | Prisma 5 (`@prisma/customer-client`) | Second Prisma client with a separate schema and output path. Dynamically initialized per-tenant at runtime with the customer's Aurora connection string. |
| **Language** | TypeScript 5.x | Strict typing across AWS SDK interactions and dual-database queries mitigates data-mismatch bugs at compile time. |
| **Charts** | Recharts | Composable charting library for dashboard visualizations (job success/failure trends, storage growth). |
| **PDF Generation** | pdf-lib | Pure JavaScript PDF generation for downloadable compliance reports — no server-side rendering dependencies. |
| **JWT Verification** | jose | Edge-compatible JOSE library for JWT verification in Next.js middleware (supports both Cognito JWKS and mock HMAC). |
| **Deployment** | Vercel | Zero-config deployment for Next.js with edge functions, automatic HTTPS, and global CDN. |

---

## ☁️ AWS Services Deep-Dive

<details>
<summary><strong>Amazon Cognito</strong> — Identity & Access Management</summary>

- **Purpose:** Handles the user authentication lifecycle — signup, email verification, login, token issuance, password reset, and password change.
- **How:** The Next.js frontend sends credentials to Cognito. Cognito returns JWTs (ID Token, Access Token, Refresh Token). The Next.js `middleware.ts` intercepts every request, cryptographically verifies the JWT against Cognito's JWKS endpoint, and extracts the `sub` claim to identify the tenant.
- **Key Detail:** Tokens are stored in `httpOnly`, `secure`, `sameSite: strict` cookies.

</details>

<details>
<summary><strong>AWS STS</strong> — Secure Token Service</summary>

- **Purpose:** Enables cross-account access without permanent credentials, forming the basis of the SaaS model.
- **How:** The CloudFormation template creates a `BackupPilotCustomerRole` that trusts the BackupPilot SaaS AWS Account. At runtime, `tenant.ts` calls `AssumeRoleCommand` with the role ARN and an `ExternalId` (the user's Cognito UUID). STS returns temporary credentials valid for 1 hour.
- **Key Detail:** The ExternalId condition helps mitigate the **Confused Deputy Problem** — even if a role ARN is exposed, it cannot be assumed without the matching Cognito user UUID.

</details>

<details>
<summary><strong>AWS Secrets Manager</strong> — Credential Storage</summary>

- **Purpose:** Securely stores the auto-generated Aurora PostgreSQL master password.
- **How:** CloudFormation generates a random password and stores it in Secrets Manager. At runtime, BackupPilot uses the STS temporary credentials to call `GetSecretValueCommand`, retrieving the password into memory for the duration of the request.
- **Key Detail:** The password is held in memory only during connection initialization and is not persisted in the SaaS database.

</details>

<details>
<summary><strong>Amazon Aurora PostgreSQL Serverless v2</strong> — Customer Databases</summary>

- **Purpose:** Each customer's backup metadata (targets, policies, jobs, snapshots, restore history, audit logs, notifications) is stored in their own Aurora instance.
- **How:** Provisioned by CloudFormation inside the customer's VPC. BackupPilot connects via the dynamic Prisma Client to read/write operational data.
- **Key Detail:** Serverless v2 scales down during periods of inactivity, optimizing resource costs.

</details>

<details>
<summary><strong>Amazon EventBridge Scheduler</strong> — Backup Scheduling</summary>

- **Purpose:** Automates backup execution based on customer schedules, offloading scheduling load from the control plane.
- **How:** When a user creates a Backup Policy, BackupPilot uses STS credentials to create an EventBridge schedule (`rate(1 day)`, `cron(...)`, etc.) in the customer's account. When the schedule fires, EventBridge invokes the customer's Backup Worker Lambda.

</details>

<details>
<summary><strong>AWS Lambda</strong> — Serverless Compute Workers</summary>

- **Purpose:** Executes backup and restore operations inside the customer's AWS account.
- **Workers:**
  - `backup-worker` — Triggered by EventBridge. Creates EBS snapshots, polls for completion, records results in Aurora, enforces retention policies (auto-deletes expired snapshots), creates in-app notifications, writes audit logs, and publishes SNS alerts.
  - `restore-worker` — Triggered by the BackupPilot API. Calls `CreateVolume` from a historical snapshot, tags the new volume, and records the restore operation.

</details>

<details>
<summary><strong>AWS CloudFormation</strong> — Infrastructure as Code</summary>

- **Purpose:** Streamlines customer onboarding by automating resource provisioning via a single YAML template.
- **Provisions:** VPC, Subnets, Internet Gateway, Route Tables, Security Groups, Aurora PostgreSQL, Secrets Manager, IAM Roles (Customer Role + Scheduler Role), Lambda Functions (Backup + Restore), SNS Topic, and all associated permissions.
- **Key Detail:** The template accepts the BackupPilot SaaS Account ID as a parameter and creates a trust relationship scoped to that account.

</details>

<details>
<summary><strong>Amazon SNS</strong> — Email Notifications</summary>

- **Purpose:** Sends email alerts to customers when backups succeed or fail.
- **How:** The Backup Worker Lambda publishes a structured message to the customer's SNS topic upon job completion. SNS routes the email to the customer's subscribed inbox.

</details>

<details>
<summary><strong>Amazon EC2 / EBS</strong> — Protected Resources</summary>

- **Purpose:** These are the resources BackupPilot protects. EC2 instances and their attached EBS volumes are the backup targets.
- **How:** BackupPilot queries `DescribeInstances` and `DescribeVolumes` to list available resources. `CreateSnapshot` and `CreateVolume` handle the backup and restore lifecycle.

</details>

---

## 🗄 Database Design

BackupPilot uses a **dual-database architecture** with complete tenant isolation:

### Control Database (SaaS-Owned)

Hosted in BackupPilot's own AWS account. Stores only tenant identity and connection metadata — **zero customer operational data**.

```
┌──────────────────────┐       ┌──────────────────────────────────┐
│       users          │       │        aws_connections           │
├──────────────────────┤       ├──────────────────────────────────┤
│ id (Cognito UUID) PK │──────►│ user_id (FK, unique)             │
│ email                │       │ role_arn                         │
│ name                 │       │ secret_arn                       │
│ role (User/Admin)    │       │ aurora_endpoint                  │
│ created_at           │       │ region                           │
└──────────────────────┘       │ account_id                       │
                               │ database_name                    │
                               │ stack_name                       │
                               └──────────────────────────────────┘
```

### Customer Database (Customer-Owned)

Lives inside each customer's AWS account in their Aurora PostgreSQL instance. Contains all operational data:

```
users ──► backup_targets ──► backup_policies ──► backup_jobs ──► snapshots ──► restore_jobs
                                    │
                                    └──► eventbridge_schedule_name
          notifications (per-user)
          audit_logs (system-wide)
```

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `BackupTarget` | Registered EC2/EBS resources | `instance_id`, `volume_id`, `region` |
| `BackupPolicy` | Scheduling rules + retention config | `frequency`, `retention_days`, `status`, `eventbridge_schedule_name` |
| `BackupJob` | Execution records | `status` (Running/Success/Failed), `error_message` |
| `Snapshot` | EBS snapshot references | `snapshot_id` (e.g., `snap-xxxxx`), `size`, `state` |
| `RestoreJob` | Volume recovery tracking | `snapshot_id`, `new_volume_id`, `status` |
| `Notification` | In-app alerts | `type` (BACKUP_SUCCESS, RESTORE_FAILED), `status` (Sent/Read) |
| `AuditLog` | Compliance trail | `actor`, `action`, `entity_type`, `entity_id`, `details` (JSON) |

### Multi-Tenant Isolation Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    BackupPilot SaaS                          │
│                                                             │
│  Control DB: "Who are my tenants and how do I reach them?"  │
│                                                             │
│         ┌─────────┬─────────┬─────────┬──────────┐         │
│         ▼         ▼         ▼         ▼          ▼         │
│    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  ...       │
│    │Tenant A│ │Tenant B│ │Tenant C│ │Tenant D│             │
│    │Aurora  │ │Aurora  │ │Aurora  │ │Aurora  │             │
│    │(Own    │ │(Own    │ │(Own    │ │(Own    │             │
│    │Account)│ │Account)│ │Account)│ │Account)│             │
│    └────────┘ └────────┘ └────────┘ └────────┘             │
│                                                             │
│  Each tenant's data is physically isolated in their own     │
│  database instance. No shared tables or database-level       │
│  co-mingling in the control plane.                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 Security Model

BackupPilot implements a **security-first architecture**. Here's how each layer works:

### 1. Cross-Account IAM AssumeRole

```typescript
// src/lib/tenant.ts — Core trust mechanism
const assumeRoleRes = await stsClient.send(
  new AssumeRoleCommand({
    RoleArn: role_arn,           // Customer's IAM Role
    RoleSessionName: `BackupPilot-Session-${userId}`,
    ExternalId: userId,          // Cognito UUID — prevents confused deputy
  })
);
```

- Credentials expire after **1 hour**
- No permanent access keys are stored in the control plane database
- Each API request generates fresh temporary credentials

### 2. Confused Deputy Prevention

The customer's IAM Role includes an `ExternalId` condition:

```yaml
# CloudFormation template — IAM trust policy
Condition:
  StringEquals:
    sts:ExternalId: !Ref BackupPilotAccountId
```

The ExternalId condition ensures that the tenant's UUID must accompany the AssumeRole call, mitigating the risk of unauthorized role assumption (Confused Deputy protection).

### 3. Secrets Manager — Dynamic Credential Retrieval

```typescript
// Password exists in memory for ~100ms, then is garbage collected
const secretRes = await secretsClient.send(
  new GetSecretValueCommand({ SecretId: secret_arn })
);
const customerDatabaseUrl = `postgresql://bpadmin:${password}@${endpoint}:5432/backuppilot`;
```

- Passwords are auto-generated by CloudFormation
- Retrieved via Secrets Manager at request time
- Held in memory only for connection initialization and not stored in the Control DB

### 4. Least Privilege IAM Policies

The `BackupPilotCustomerRole` grants only the minimum permissions needed:

| Permission | Scope | Purpose |
|-----------|-------|---------|
| `ec2:DescribeInstances`, `DescribeVolumes` | All EC2 | List backup targets |
| `ec2:CreateSnapshot`, `CreateTags` | All EC2 | Execute backups |
| `ec2:CreateVolume`, `DescribeSnapshots` | All EC2 | Execute restores |
| `secretsmanager:GetSecretValue` | Specific Secret ARN | Fetch DB password |
| `scheduler:Create/Update/DeleteSchedule` | All Scheduler | Manage cron jobs |
| `sns:Publish` | Specific Topic ARN | Send alerts |
| `lambda:InvokeFunction` | Specific Function ARNs | Trigger workers |

### 5. Customer-Owned Infrastructure

All compute, storage, and data resources reside in the customer's AWS account:

| Resource | Owner | BackupPilot Access |
|----------|-------|--------------------|
| EBS Snapshots | Customer | Orchestrate creation only |
| Aurora PostgreSQL | Customer | Read/write via temporary credentials |
| Lambda Functions | Customer | Invoke only |
| SNS Topics | Customer | Publish only |
| Secrets Manager | Customer | Read only |

> [!NOTE]
> By isolating data resources inside the customer's AWS account, the impact of a potential control-plane metadata breach is minimized. An attacker gaining access to the control database obtains connection metadata (such as Role ARNs and endpoint addresses) but does not acquire permanent credentials, database credentials, or direct snapshot access.

---

## 📈 Scalability

BackupPilot's architecture is designed to scale horizontally:

| Dimension | Strategy | Limit |
|-----------|----------|-------|
| **Customers** | Each customer is a fully isolated Data Plane. Adding a customer = deploying 1 CloudFormation stack. | Scalable by design |
| **Compute** | Backups execute via Lambda in the customer's account. | Scalable by design (subject to customer Lambda concurrency limits) |
| **Storage** | Snapshots are stored in customer EBS. BackupPilot stores only metadata pointers. | Scalable by design (subject to AWS EBS limits) |
| **Database Connections** | Prisma clients are cached per-tenant in a global map with `connection_limit=5`. | Bound by server memory resources |
| **Control Plane** | Stateless Next.js on Vercel scales with incoming request volume. | Bound by Vercel platform limits |
| **Scheduling** | EventBridge schedules run independently in each customer's account. No central scheduler bottleneck. | Subject to per-account EventBridge Scheduler limits |

### Cost Model

```
┌───────────────────────────────────────────────────────────┐
│  BackupPilot Control Plane Marginal Cost Model            │
│  (Per Customer Onboarded):                                │
│                                                           │
│  • Compute:   Offloaded (Lambda runs in customer account) │
│  • Storage:   Offloaded (Snapshots in customer account)   │
│  • Database:  Offloaded (Aurora in customer account)      │
│  • Control DB: Minimal storage footprint per connection   │
│                                                           │
│  Result: Highly cost-efficient control plane operation.   │
└───────────────────────────────────────────────────────────┘
```

---

## 🛠 Challenges Faced

During the implementation of BackupPilot, several architectural and engineering challenges were encountered and addressed:

### 1. Cross-Account Authentication & STS Role Assumption
Designing a secure cross-account workflow required establishing trust between the BackupPilot SaaS account and customer accounts without using long-term credentials. 
- **Mitigation:** Utilized AWS STS `AssumeRole` with short-lived session tokens. 
- **Confused Deputy Prevention:** Implemented unique `ExternalId` parameters mapped directly to the customer's Cognito User UUID. This ensures that even if a role ARN is leaked, unauthorized tenants cannot assume the role.

### 2. Dynamic Prisma Connection Pooling and Routing
In a traditional SaaS application, a single database connection pool is initialized at startup. For BackupPilot, database connection strings are constructed dynamically at runtime using the credentials retrieved from the customer's AWS account.
- **Challenge:** Initializing a new Prisma client on every request would exhaust system memory and database connection limits quickly.
- **Mitigation:** Implemented an in-memory client caching mechanism (`customerDbCache`) that caches initialized Prisma clients by tenant ID, configuring a strict `connection_limit=5` on each client pool to prevent RDS database connection exhaustion.

### 3. Cross-Account Credential Management
Safeguarding RDS credentials during connection onboarding and runtime execution.
- **Challenge:** The Control DB must not store plaintext RDS passwords.
- **Mitigation:** Configured the customer-side CloudFormation template to auto-generate a strong master password and store it directly in AWS Secrets Manager. BackupPilot utilizes the assumed STS credentials to retrieve the database secret in memory at runtime, keeping it exposed only for the duration of the API call.

### 4. Region Compatibility & Multi-Region SDK Routing
AWS services like EC2, EBS, and Lambda are regional resource types. Validating target instances and managing policies required the control plane to dynamically target different AWS regions.
- **Mitigation:** Instantiated regional AWS SDK clients on the fly by dynamically reading the customer's preferred target region from the connection metadata and applying the regional configuration parameters to each client instance.

### 5. Seamless Database Scaffolding (Zero-Touch Onboarding)
Ensuring the customer's remote Aurora database is correctly schema-scaffolded immediately upon onboarding without requiring them to run manual SQL scripts or developer CLI commands.
- **Mitigation:** Engineered a programmatic migration executor (`migration.ts`) that executes `npx prisma db push` via a child process. It overrides the database URL environment variables dynamically and seeds the tenant profile info, ensuring foreign key integrity in the remote database.

### 6. Isolation Boundaries and Blast Radius Control
Ensuring that database connectivity issues, high database latency, or backup worker errors in one tenant's environment do not impact the core control plane or block other tenants.
- **Mitigation:** Kept all compute execution (Lambdas) and storage (RDS instances) entirely within the boundary of each customer's AWS account, ensuring strict blast-radius isolation.

---

## 🏭 Production-Oriented Design

| Capability | Implementation |
|-----------|----------------|
| **Infrastructure as Code** | Full CloudFormation template provisions VPC, subnets, Aurora, IAM roles, Lambda functions, SNS, and Secrets Manager in a single deployment |
| **Serverless Compute** | Backup and restore operations execute via Lambda — no servers to patch or scale |
| **Stateless Frontend** | Next.js on Vercel — no session state, no sticky servers, instant horizontal scaling |
| **Connection Management** | Prisma clients are cached per-tenant with configurable `connection_limit` to prevent connection pool exhaustion |
| **Fault Isolation** | A failure in Customer A's Aurora instance has zero impact on Customer B — complete blast radius isolation |
| **Automated Onboarding** | CloudFormation deployment + automatic `prisma db push` scaffolds the customer's entire data plane without manual intervention |
| **Mock Mode** | Full `MOCK_AWS=true` mode simulates all AWS services for local development without any cloud resources |
| **Comprehensive Error Handling** | Lambda workers catch failures, update job status to `Failed`, record error messages, create failure notifications, and publish SNS alerts |
| **Terraform Support** | Additional Terraform configuration available for the Control Plane infrastructure (`terraform/main.tf`) |

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- PostgreSQL (local or remote) for the Control DB
- AWS Account with programmatic access (or use Mock Mode)
- Amazon Cognito User Pool (or use Mock Mode)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/backuppilot.git
cd backuppilot
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure:

```bash
cp .env.example .env
```

<details>
<summary><strong>Environment Variables Reference</strong></summary>

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string for the Control Plane database | ✅ |
| `MOCK_AWS` | Set to `"true"` for local development without AWS resources | ✅ |
| `AWS_REGION` | AWS region (e.g., `ap-south-1`) | ✅ |
| `AWS_ACCESS_KEY_ID` | IAM access key for the SaaS account | When `MOCK_AWS=false` |
| `AWS_SECRET_ACCESS_KEY` | IAM secret key for the SaaS account | When `MOCK_AWS=false` |
| `COGNITO_USER_POOL_ID` | Cognito User Pool ID | When `MOCK_AWS=false` |
| `COGNITO_CLIENT_ID` | Cognito App Client ID | When `MOCK_AWS=false` |
| `NEXT_PUBLIC_APP_URL` | Public URL of the app (e.g., `http://localhost:3000`) | ✅ |

</details>

### 3. Generate Prisma Clients

BackupPilot uses a **dual-schema** setup. Both clients must be generated:

```bash
# Control Plane client (SaaS database)
npx prisma generate

# Data Plane client (Customer databases)
npx prisma generate --schema=prisma/customer.prisma
```

### 4. Initialize the Control Database

```bash
# Push the schema to your Control DB
npx prisma db push

# Seed with demo data (optional)
npm run prisma:seed
```

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 6. Customer Data Plane Setup (Optional — Live AWS)

To connect a real AWS account:

1. Deploy `public/CloudFormation.yaml` in the customer's AWS Console
2. Wait for the stack to reach `CREATE_COMPLETE`
3. Navigate to the **Outputs** tab and copy the values
4. In BackupPilot, go to **Dashboard → Connect AWS Account**
5. Paste the CloudFormation outputs — BackupPilot will automatically:
   - Verify the STS AssumeRole trust
   - Fetch the Aurora password from Secrets Manager
   - Scaffold all data plane tables via `prisma db push`

---

## 📁 Project Structure

```
backuppilot/
├── prisma/
│   ├── schema.prisma           # Control Plane schema (Users, AwsConnections)
│   ├── customer.prisma         # Data Plane schema (Targets, Policies, Jobs, Snapshots, etc.)
│   └── seed.ts                 # Demo data seeder
├── lambda/
│   ├── backup-worker/          # EBS snapshot creation + retention + SNS alerts
│   └── restore-worker/         # EBS volume restoration from snapshots
├── src/
│   ├── app/
│   │   ├── api/                # Next.js Route Handlers (REST API)
│   │   │   ├── auth/           # login, signup, confirm, forgot-password, etc.
│   │   │   ├── aws/connect/    # Customer onboarding endpoint
│   │   │   ├── targets/        # Backup target CRUD
│   │   │   ├── policies/       # Backup policy CRUD + EventBridge sync
│   │   │   ├── jobs/           # Backup job listing + manual trigger
│   │   │   ├── snapshots/      # Snapshot browsing
│   │   │   ├── restore/        # Restore job creation
│   │   │   ├── reports/        # CSV + PDF report generation
│   │   │   ├── notifications/  # In-app alert management
│   │   │   ├── audit-logs/     # Audit log retrieval
│   │   │   └── dashboard/      # Summary + chart data endpoints
│   │   ├── dashboard/          # Main dashboard UI (charts, stats)
│   │   ├── targets/            # Target management page
│   │   ├── policies/           # Policy management page
│   │   ├── history/            # Backup job history page
│   │   ├── snapshots/          # Snapshot browser page
│   │   ├── restore/            # Restore operations page
│   │   ├── reports/            # Report generation page
│   │   ├── audit-logs/         # Audit log viewer page
│   │   ├── notifications/      # Notification center page
│   │   ├── settings/           # Account settings page
│   │   ├── profile/            # User profile page
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── verify/             # Email verification page
│   │   ├── forgot-password/    # Password reset request page
│   │   └── reset-password/     # Password reset confirmation page
│   ├── components/
│   │   ├── AppShell.tsx        # Main navigation shell (sidebar + topbar)
│   │   └── ToasterProvider.tsx # Toast notification wrapper
│   ├── lib/
│   │   ├── tenant.ts           # Core SaaS engine (STS AssumeRole + dynamic Prisma)
│   │   ├── cognito.ts          # Cognito SDK wrappers (signup, login, verify, etc.)
│   │   ├── aws.ts              # EC2, EventBridge, Lambda, SNS SDK helpers
│   │   ├── db.ts               # Control Plane Prisma singleton
│   │   ├── migration.ts        # Zero-touch customer DB scaffolding
│   │   └── regions.ts          # AWS region metadata
│   └── middleware.ts           # JWT verification + token refresh + route protection
├── public/
│   └── CloudFormation.yaml     # Customer Data Plane IaC template (500 lines)
├── terraform/
│   └── main.tf                 # Control Plane infrastructure (Terraform)
└── package.json
```

---

## 🔮 Future Improvements

| Priority | Improvement | Description |
|----------|-------------|-------------|
| 🔴 High | **VPC Peering / PrivateLink** | Replace public Aurora endpoint access with AWS PrivateLink for fully private connectivity between the SaaS and customer VPCs. |
| 🔴 High | **Lambda CI/CD Pipeline** | GitHub Actions workflow to package Lambda workers, upload to S3, and auto-update CloudFormation references. |
| 🟡 Medium | **Cross-Account Schema Migrations** | Automated runner to iterate through all tenant connections and apply Prisma migrations when the data plane schema evolves. |
| 🟡 Medium | **Multi-Region Support** | Allow customers to deploy Data Plane stacks across multiple AWS regions with region-aware routing. |
| 🟢 Low | **RBAC Enhancements** | Granular role-based access control (Viewer, Operator, Admin) within customer organizations. |
| 🟢 Low | **Backup Verification** | Post-backup integrity checks that verify snapshot completeness and recoverability. |

---

<div align="center">

**Built for the cloud. Architected for security. Designed to scale.**

Made with ☁️ for the AWS + Vercel Hackathon

</div>
