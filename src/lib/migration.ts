import { exec } from "child_process";
import { promisify } from "util";
import { getTenantCredentialsAndDbUrl } from "./tenant";
import { prisma as controlPlaneDb } from "./db";
import { PrismaClient as CustomerPrismaClient } from "@prisma/customer-client";

const execAsync = promisify(exec);

export async function pushCustomerSchema(userId: string) {
  try {
    const { customerDatabaseUrl } = await getTenantCredentialsAndDbUrl(userId);
    
    // Execute prisma db push safely with the customer's database URL overriding the environment
    await execAsync("npx prisma db push --schema=prisma/customer.prisma --accept-data-loss", {
      env: {
        ...process.env,
        CUSTOMER_DATABASE_URL: customerDatabaseUrl,
      },
    });

    // Seed the user profile into the newly created data plane database
    // This resolves foreign key constraints for BackupTargets and other resources
    const user = await controlPlaneDb.user.findUnique({ where: { id: userId } });
    if (user) {
      const customerDb = new CustomerPrismaClient({ datasourceUrl: customerDatabaseUrl });
      await customerDb.user.upsert({
        where: { id: userId },
        update: { email: user.email, name: user.name },
        create: { id: userId, email: user.email, name: user.name },
      });
      await customerDb.$disconnect();
    }

  } catch (error) {
    console.error(`Failed to push customer schema for user ${userId}:`, error);
    throw new Error("Failed to scaffold customer database schema.");
  }
}
