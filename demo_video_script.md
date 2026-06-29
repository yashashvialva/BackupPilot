# BackupPilot: Hackathon Demo Video Script
**Target Duration:** 2 minutes, 45 seconds (Strict Limit: 3 minutes)

This script is designed to impress AWS Solutions Architects and hackathon judges by focusing on **design aesthetics, architecture separation, security, and the integration of Vercel and Amazon Aurora.**

---

## ⏱️ Video Breakdown

| Segment | Timing | Topic | Visual Focus |
|:---|:---|:---|:---|
| **1** | 0:00 - 0:30 | Pitch & Stack Overview | Dashboard UI & Architecture Diagram |
| **2** | 0:30 - 1:15 | Onboarding & Security | Connecting Account & CloudFormation console |
| **3** | 1:15 - 1:55 | Targets & EventBridge Policies | Dashboard Policies & EventBridge Scheduler Console |
| **4** | 1:55 - 2:30 | Dynamic Database & Restore | Restore Flow & Logs / Database Query |
| **5** | 2:30 - 2:45 | Outro & Key Benefits | Vercel Deployment & Ending Slide |

---

## 🎙️ Script Walkthrough

### 🎬 Segment 1: Pitch & Stack Overview (0:00 - 0:30)
* **Visuals:**
  * Start with a high-resolution recording of the BackupPilot dashboard. Hover over the Recharts charts (success rate, storage growth trends).
  * Show the architecture diagram (from the README) as you transition.
* **Voiceover:**
  > *"Hi everyone, this is Yashashvi, and I'm presenting BackupPilot, a production-oriented multi-tenant backup orchestration platform for EC2 and EBS workloads.
  >
  > Deployed on Vercel and built with Next.js 14 and TypeScript, BackupPilot separates the control plane from the data plane. The management UI runs on Vercel, while all compute execution and backup storage remain isolated inside the customer's AWS account. 
  >
  > For our database backend, we leverage Amazon Aurora PostgreSQL Serverless v2, giving each tenant physical database isolation."*

---

### 🔐 Segment 2: Seamless Onboarding & Trust Boundaries (0:30 - 1:15)
* **Visuals:**
  * Click on "Connect AWS Account" in the sidebar.
  * Show the CloudFormation setup link. Transition to the AWS Console showing the CloudFormation stack creation.
  * Return to the BackupPilot wizard, paste the CloudFormation output values (Role ARN, Secrets Manager ARN, Aurora Endpoint), and click "Verify & Onboard".
  * Show the success message and transition to the code showing the dynamic database schema migration.
* **Voiceover:**
  > *"Onboarding a new tenant is entirely automated. The user deploys a CloudFormation template in their account which provisions an isolated VPC, an Aurora PostgreSQL instance, AWS Secrets Manager, and scoped Lambda workers.
  >
  > Security is central to our design. We do not store permanent IAM keys. BackupPilot calls AWS STS to assume a temporary cross-account role. To mitigate the Confused Deputy problem, we pass the customer's unique Cognito user UUID as the STS ExternalId.
  >
  > Once verified, our Vercel backend programmatically runs a dynamic Prisma migration (`prisma db push`), scaffolding all database tables directly into the customer's Aurora instance."*

---

### ⚡ Segment 3: Target Discovery & EventBridge Automation (1:15 - 1:55)
* **Visuals:**
  * Click on the "Backup Targets" page. Show listed EC2 instances and EBS volumes loaded dynamically.
  * Navigate to the "Backup Policies" tab, click "Create Policy", fill out the details (hourly/daily scheduling, retention length), and click save.
  * Transition to the customer's AWS Console showing the new EventBridge Scheduler rule.
* **Voiceover:**
  > *"Because our Vercel backend communicates through assumed STS sessions, we retrieve available EC2 and EBS backup targets in real-time.
  >
  > When a customer configures a Backup Policy, BackupPilot registers a scheduled EventBridge Scheduler rule directly in their AWS account. 
  >
  > When the schedule triggers, EventBridge invokes a customer-owned Lambda function that snapshots the volume and cleans up expired snapshots according to the retention window. The control plane doesn't need to run a central cron engine."*

---

### 🔄 Segment 4: Dynamic Connections & EBS Restoration (1:55 - 2:30)
* **Visuals:**
  * Go to "Snapshots" or "Restore History".
  * Click "Restore" on a snapshot. Show the loading state and the resulting new volume creation.
  * (Optional) Show a quick snippet of code or explanation showing the in-memory Secrets Manager lookup.
* **Voiceover:**
  > *"To retrieve job metadata or trigger a volume restore, the Vercel backend dynamically queries the customer's Aurora instance. 
  >
  > During the API request, we query Secrets Manager to retrieve the Aurora password, instantiate a tenant-scoped Prisma client in memory, execute the query, and disconnect. The database password is never persisted in our control plane database.
  >
  > Clicking Restore triggers a Lambda execution that restores the volume from the snapshot directly inside the customer's VPC, providing full data custody to the user."*

---

### 🚀 Segment 5: Outro & Summary (2:30 - 2:45)
* **Visuals:**
  * Switch back to the beautiful landing/dashboard screen.
  * Show the active Vercel domain URL `backuppilot.vercel.app`.
* **Voiceover:**
  > *"BackupPilot combines Vercel's edge rendering speed with AWS’s robust security and databases, delivering a highly secure backup workflow.
  >
  > Thank you for watching our submission for Hack the Zero Stack!"*

---

## 💡 Pro-Tips for Recording the Demo

1. **Clean Environment:** Close other browser tabs, disable notifications, and use a high-resolution display (e.g., 1080p) to keep the recording crisp.
2. **Audio Quality:** Use a decent external microphone in a quiet room. If you make a mistake speaking, don't stop; pause for 2 seconds and repeat the sentence—you can easily edit it out later.
3. **Speed Up Transitions:** Cut out loading/waiting times (e.g., waiting for CloudFormation to create, or waiting for a page refresh) in your video editor. Judges value fast, dense pacing.
4. **AWS Credential Masking:** Ensure your AWS Account ID and any private keys are not exposed during the video recording.
5. **No Background Music:** The hackathon rules state the video *"must not include copyrighted music or other material unless permission is granted."* It is safest to use pure voiceover with no music at all.
