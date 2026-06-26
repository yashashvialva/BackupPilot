# BackupPilot: Ultimate Project Guide & System Design Document

Welcome to the **BackupPilot** master architecture document. This guide explains the "What," "Why," and "How" of every single language, framework, and AWS service utilized in this project. It is designed to serve as the ultimate reference for hackathon judges, developers, and architects reviewing the platform.

---

## 1. Executive Summary: The Control Plane vs. Data Plane Architecture

BackupPilot is a **Multi-Tenant SaaS Backup Orchestration Platform** built for AWS. 
Instead of storing sensitive customer data and infrastructure credentials on our own servers, BackupPilot utilizes a strictly segregated **Control Plane and Data Plane** architecture.

*   **The Control Plane (BackupPilot):** Hosted on Vercel (Next.js) and AWS Cognito. It is a lightweight orchestrator. It manages the frontend UI, user authentication, and a tiny metadata database mapping users to their AWS accounts.
*   **The Data Plane (Customer's AWS Account):** All the "heavy lifting" happens here. The customer deploys a CloudFormation stack that provisions an RDS database, Lambdas, and EventBridge schedules inside *their own* AWS account. 

**Why this architecture?**
1.  **Ultimate Security:** BackupPilot never stores customer AWS Access Keys, EBS snapshot data, or database rows. If BackupPilot is hacked, the attacker cannot steal customer backup data.
2.  **Zero Compute Costs:** Because backups and restores are executed by Lambdas inside the customer's AWS account, the customer pays for the compute and storage. BackupPilot's hosting costs approach zero.

---

## 2. Coding Languages & Frameworks

### **TypeScript & Node.js**
*   **What it is:** A strictly typed superset of JavaScript running on the V8 engine.
*   **Why we use it:** To catch runtime errors at compile time. In a system interacting with 10+ AWS APIs and two different databases, TypeScript's strict interfaces prevent catastrophic data-mismatch errors.

### **Next.js 14 (App Router)**
*   **What it is:** A React framework that enables Server-Side Rendering (SSR) and API route generation.
*   **Why we use it:** It allows us to build a full-stack application in a single repository. 
*   **How it works:** 
    *   **Server Components:** UI components render on the server, keeping bundle sizes small and allowing secure, direct database access without exposing credentials.
    *   **Route Handlers (`src/app/api/`)**: Act as our backend microservices, intercepting frontend requests, assuming AWS roles, and returning JSON.

### **Tailwind CSS**
*   **What it is:** A utility-first CSS framework.
*   **Why we use it:** Allows for rapid UI prototyping with consistent design tokens (colors, spacing, shadows) directly inline with React components, eliminating the need for bulky custom CSS files.

### **Prisma ORM**
*   **What it is:** A modern Object-Relational Mapper that generates type-safe database queries.
*   **Why we use it:** BackupPilot uses a complex **Dual-Schema** setup.
*   **How we use it:** 
    1.  `@prisma/client` (Control Plane): Queries the central SaaS database to fetch the logged-in user's AWS Connection details.
    2.  `@prisma/customer-client` (Data Plane): A dynamically initialized client. At runtime, the API builds a connection string specific to the customer, instantiates this client, and queries the customer's remote database.

---

## 3. AWS Services Breakdown: What, Why, and How

BackupPilot utilizes a vast array of AWS Services to achieve its distributed architecture. Here is exactly how they fit together.

### **1. Amazon Cognito (Authentication)**
*   **What:** AWS's managed Identity and Access Management (IAM) service for web apps.
*   **Why:** To handle secure user registration, email verification (via built-in delivery), password resets, and session tokens without writing custom cryptographic auth logic.
*   **How:** The Next.js frontend sends credentials to Cognito. Cognito returns a JWT (JSON Web Token). The Next.js `middleware.ts` intercepts all API requests, verifies the JWT signature, and extracts the user's `sub` (Cognito User ID) to identify the tenant.

### **2. AWS CloudFormation (Infrastructure as Code)**
*   **What:** A service to model and set up AWS resources using a YAML/JSON template.
*   **Why:** To seamlessly onboard customers. Instead of asking customers to manually create 15 different AWS resources, we give them a 1-click template.
*   **How:** The customer deploys `public/CloudFormation.yaml` in their AWS account. It automatically provisions the RDS Database, IAM Roles, Secrets Manager, and Lambdas in exactly the right configuration.

### **3. AWS STS (Security Token Service) & IAM Roles**
*   **What:** A web service for requesting temporary, limited-privilege credentials.
*   **Why:** This is the core of the SaaS architecture. We cannot ask customers for permanent Access Keys (that is a security risk).
*   **How:** 
    *   The CloudFormation template creates a `BackupPilotCustomerRole` in the customer's account. It explicitly trusts the BackupPilot SaaS AWS Account to assume it.
    *   In `src/lib/tenant.ts`, the Next.js API uses `AssumeRoleCommand`.
    *   **Security feature:** It passes an `ExternalId` (the user's Cognito ID). This prevents the "Confused Deputy Problem," ensuring that even if someone guesses the Role ARN, they cannot assume it without matching the exact Cognito user ID assigned to it in the template.

### **4. AWS Secrets Manager**
*   **What:** A service to securely store, rotate, and retrieve database credentials.
*   **Why:** Hardcoding database passwords in CloudFormation or sending them to the SaaS is a massive security flaw.
*   **How:** CloudFormation dynamically generates a secure random password and stores it in Secrets Manager. When BackupPilot assumes the customer's IAM role via STS, it queries Secrets Manager, retrieves the password into memory for a fraction of a second, and connects to the database.

### **5. Amazon RDS Aurora Serverless v2 (PostgreSQL)**
*   **What:** AWS's auto-scaling relational database built for the cloud.
*   **Why:** Each customer needs a database to store their backup policies, job history, and audit logs. Serverless v2 scales down to near-zero when the customer isn't running backups, saving them money.
*   **How:** BackupPilot connects to this database via the dynamic Prisma Client to inject backup targets and read historical logs.

### **6. Amazon EventBridge Scheduler**
*   **What:** A serverless scheduler that triggers tasks based on cron expressions or rates.
*   **Why:** Backups need to happen automatically at 3 AM every night without the Next.js server staying awake to trigger them.
*   **How:** When a user creates a Backup Policy in the UI, BackupPilot uses STS to tell the customer's EventBridge to create a new cron schedule. When the clock hits the target time, EventBridge fires and invokes the customer's Backup Lambda.

### **7. AWS Lambda (Serverless Compute Workers)**
*   **What:** A serverless compute service that runs code in response to events.
*   **Why:** Creating EBS snapshots and orchestrating restore jobs requires executing AWS SDK code inside the customer's network.
*   **How:** 
    *   `backup-worker`: Triggered by EventBridge. It loops through assigned EC2 volumes, calls the EC2 `CreateSnapshot` API, applies retention logic (deleting snapshots older than X days), and logs the success/failure into the customer's RDS database.
    *   `restore-worker`: Triggered by BackupPilot API. It calls the EC2 `CreateVolume` API using a historical snapshot ID to recover data.

### **8. Amazon EC2 & EBS (The Targets)**
*   **What:** Elastic Compute Cloud (servers) and Elastic Block Store (hard drives).
*   **Why:** These are the resources BackupPilot is designed to protect.
*   **How:** BackupPilot queries the EC2 API (using `DescribeInstances` and `DescribeVolumes`) to list available resources in the UI.

### **9. Amazon SNS (Simple Notification Service)**
*   **What:** A fully managed pub/sub messaging service.
*   **Why:** To send email alerts to customers when a backup succeeds or fails.
*   **How:** The Backup Lambda worker publishes a JSON message to an SNS topic upon job completion, which routes an email directly to the customer's inbox.

---

## 4. Deep-Dive: The Multi-Tenant Request Flow

When a user logs into BackupPilot and clicks "View Backup Jobs", here is the exact sequence of events:

1.  **The Request:** The browser sends a `GET /api/jobs` request.
2.  **The Middleware:** `middleware.ts` grabs the Cognito JWT cookie, cryptographically verifies it, extracts the `sub` (User ID), and forwards the request.
3.  **The Tenant Context:** `getTenantContext()` in `src/lib/tenant.ts` fires:
    *   It looks up the user's `AwsConnection` mapping in the SaaS DB.
    *   It uses AWS STS to `AssumeRole` into the customer's AWS account.
    *   It uses the temporary STS keys to read the database password from Secrets Manager.
    *   It constructs a dynamic Postgres URL: `postgresql://postgres:${password}@${aurora_endpoint}:5432/backuppilot_customer`.
4.  **The Query:** The dynamic `@prisma/customer-client` uses the URL to connect to the customer's Aurora database, runs a `SELECT * FROM BackupJob`, and returns the data.
5.  **The Response:** The Next.js API formats the data and returns it to the React frontend.

---

## 5. File Structure Master Map

```text
├── prisma/
│   ├── schema.prisma          # Control plane schema (SaaS Users)
│   ├── customer.prisma        # Data plane schema (Customer Jobs/Policies)
│   └── seed.ts                # Mock data seeder
├── lambda/
│   ├── backup-worker/         # Deployed to customer AWS; executes snapshots
│   └── restore-worker/        # Deployed to customer AWS; executes volume recovery
├── src/
│   ├── app/
│   │   ├── api/               # Next.js Serverless Route Handlers
│   │   ├── dashboard/         # React Frontend UI Components
│   ├── lib/
│   │   ├── tenant.ts          # Core SaaS Engine (STS AssumeRole logic)
│   │   ├── cognito.ts         # Authentication SDK wrappers
│   │   ├── aws.ts             # AWS EC2/EventBridge SDK helpers
│   └── middleware.ts          # JWT Authentication gatekeeper
├── public/
│   └── CloudFormation.yaml    # The IaC template customers deploy
├── .env                       # Environment configs (Cognito IDs, SaaS DB URL)
└── README.md                  # High-level overview
```

---

## 6. Future Scalability & Production Readiness

While fully functional, transitioning this MVP to an enterprise-grade production environment requires:
1.  **VPC Peering / PrivateLink:** Currently, the customer's RDS database must allow public ingress from the Vercel IPs. In production, an AWS Transit Gateway or AWS PrivateLink should be used to securely route traffic from the SaaS to the customer VPC without touching the public internet.
2.  **Lambda CI/CD:** Implement a GitHub Actions pipeline that packages the Node.js lambda workers into ZIP files, uploads them to an S3 bucket, and automatically references that bucket in the CloudFormation template.
3.  **Cross-Account Database Migrations:** Establish an automated runner that loops through all registered customer RDS connections and applies Prisma SQL migrations programmatically whenever the data plane schema changes.
