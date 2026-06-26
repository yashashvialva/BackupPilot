const { STSClient, AssumeRoleCommand } = require("@aws-sdk/client-sts");
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// 1. Load .env file variables into process.env
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  }
}

async function run() {
  const roleArn = process.argv[2];
  const secretArn = process.argv[3];
  const endpoint = process.argv[4];
  const region = process.argv[5] || "ap-south-1";

  if (!roleArn || !secretArn || !endpoint) {
    console.error("Usage: node initialize_rds.js <roleArn> <secretArn> <endpoint> [region]");
    process.exit(1);
  }

  console.log("Configuring AWS SDK with Control Plane access keys...");
  const awsConfig = {
    region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  };

  console.log(`Assuming Customer IAM Role: ${roleArn}...`);
  const sts = new STSClient(awsConfig);
  const assumeRoleRes = await sts.send(
    new AssumeRoleCommand({
      RoleArn: roleArn,
      RoleSessionName: "BackupPilot-Initialization-Session",
      ExternalId: "c0ca1010-0000-0000-0000-000000000000", // Dummy external ID for bootstrap
    })
  );

  const tempCreds = {
    accessKeyId: assumeRoleRes.Credentials.AccessKeyId,
    secretAccessKey: assumeRoleRes.Credentials.SecretAccessKey,
    sessionToken: assumeRoleRes.Credentials.SessionToken,
  };

  console.log(`Fetching Database Password from Secrets Manager: ${secretArn}...`);
  const secrets = new SecretsManagerClient({ region, credentials: tempCreds });
  const secretRes = await secrets.send(
    new GetSecretValueCommand({ SecretId: secretArn })
  );

  let dbPassword = secretRes.SecretString;
  try {
    const parsed = JSON.parse(secretRes.SecretString);
    if (parsed.password) dbPassword = parsed.password;
  } catch (e) {
    // Raw password string
  }

  const dbUrl = `postgresql://bpadmin:${encodeURIComponent(dbPassword)}@${endpoint}:5432/backuppilot?connection_limit=5`;
  console.log(`Constructed connection URL: postgresql://bpadmin:****@${endpoint}:5432/backuppilot`);

  console.log("Applying Prisma customer schema to remote RDS Database...");
  // Temporarily invoke prisma db push with custom CUSTOMER_DATABASE_URL
  execSync(`npx prisma db push --schema=prisma/customer.prisma`, {
    env: {
      ...process.env,
      CUSTOMER_DATABASE_URL: dbUrl,
    },
    stdio: "inherit"
  });

  console.log("\nDatabase successfully initialized with the required tables!");
}

run().catch(err => {
  console.error("Initialization Failed:", err);
  process.exit(1);
});
