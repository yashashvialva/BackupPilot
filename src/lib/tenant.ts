import { PrismaClient as CustomerPrismaClient } from "../../prisma/generated/customer-client";
import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { EC2Client } from "@aws-sdk/client-ec2";
import { SchedulerClient } from "@aws-sdk/client-scheduler";
import { SNSClient } from "@aws-sdk/client-sns";
import { LambdaClient } from "@aws-sdk/client-lambda";
import { prisma } from "./db";

const globalForTenantCache = global as unknown as { customerDbCache: Record<string, CustomerPrismaClient> };

const customerDbCache: Record<string, CustomerPrismaClient> = globalForTenantCache.customerDbCache || {};

if (process.env.NODE_ENV !== "production") {
  globalForTenantCache.customerDbCache = customerDbCache;
}

export async function getTenantCredentialsAndDbUrl(userId: string) {
  const connection = await prisma.awsConnection.findUnique({
    where: { user_id: userId },
  });

  if (!connection) {
    throw new Error("AWS Connection not found. Please connect your AWS account.");
  }

  const { role_arn, region, aurora_endpoint, secret_arn } = connection;

  const stsClient = new STSClient({ region: process.env.AWS_REGION as string });
  
  const assumeRoleRes = await stsClient.send(
    new AssumeRoleCommand({
      RoleArn: role_arn,
      RoleSessionName: `BackupPilot-Session-${userId}`,
      ExternalId: userId,
    })
  );

  const credentials = {
    accessKeyId: assumeRoleRes.Credentials!.AccessKeyId!,
    secretAccessKey: assumeRoleRes.Credentials!.SecretAccessKey!,
    sessionToken: assumeRoleRes.Credentials!.SessionToken!,
  };

  const secretsClient = new SecretsManagerClient({ region, credentials });
  const secretRes = await secretsClient.send(
    new GetSecretValueCommand({ SecretId: secret_arn })
  );
  
  if (!secretRes.SecretString) {
    throw new Error("Failed to retrieve database credentials from Secrets Manager.");
  }
  
  let dbPassword = secretRes.SecretString;
  try {
    const parsed = JSON.parse(secretRes.SecretString);
    if (parsed.password) dbPassword = parsed.password;
  } catch (e) {
  }

  const customerDatabaseUrl = `postgresql://bpadmin:${encodeURIComponent(dbPassword)}@${aurora_endpoint}:5432/backuppilot?connection_limit=5`;

  return { customerDatabaseUrl, region, credentials, secretsClient, connection };
}

export async function getTenantContext(request: Request) {
  // 1. Identify user from headers (injected by middleware)
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    throw new Error("Unauthorized: Missing user ID in tenant context");
  }

  const { customerDatabaseUrl, region, credentials, secretsClient, connection } = await getTenantCredentialsAndDbUrl(userId);

  // 6. Create or reuse dynamic Prisma client
  let customerDb = customerDbCache[userId];
  if (!customerDb) {
    customerDb = new CustomerPrismaClient({
      datasourceUrl: customerDatabaseUrl,
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
    customerDbCache[userId] = customerDb;
  }

  // 7. Build AWS SDK clients
  const awsConfig = { region, credentials };
  const awsClients = {
    ec2: new EC2Client(awsConfig),
    scheduler: new SchedulerClient(awsConfig),
    sns: new SNSClient(awsConfig),
    lambda: new LambdaClient(awsConfig),
    secretsManager: secretsClient, // already instantiated
  };

  return { customerDb, awsClients, connection };
}
