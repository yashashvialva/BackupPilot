const { CognitoIdentityProviderClient, UpdateUserPoolCommand, DescribeUserPoolCommand } = require("@aws-sdk/client-cognito-identity-provider");
const fs = require("fs");
const path = require("path");

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

const awsConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

const cognitoClient = new CognitoIdentityProviderClient(awsConfig);

async function run() {
  try {
    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    console.log(`Fetching User Pool: ${userPoolId}...`);
    
    const describeRes = await cognitoClient.send(new DescribeUserPoolCommand({ UserPoolId: userPoolId }));
    const pool = describeRes.UserPool;

    console.log("Reverting Cognito to use its Built-in Email Delivery (COGNITO_DEFAULT)...");
    
    await cognitoClient.send(new UpdateUserPoolCommand({
      UserPoolId: pool.Id,
      Policies: pool.Policies,
      DeletionProtection: pool.DeletionProtection,
      AutoVerifiedAttributes: pool.AutoVerifiedAttributes,
      VerificationMessageTemplate: pool.VerificationMessageTemplate,
      EmailConfiguration: {
        EmailSendingAccount: "COGNITO_DEFAULT",
      },
      SmsConfiguration: pool.SmsConfiguration,
      MfaConfiguration: pool.MfaConfiguration,
      DeviceConfiguration: pool.DeviceConfiguration,
      EmailVerificationMessage: pool.EmailVerificationMessage,
      EmailVerificationSubject: pool.EmailVerificationSubject,
      SmsVerificationMessage: pool.SmsVerificationMessage,
      SmsAuthenticationMessage: pool.SmsAuthenticationMessage,
      UserPoolAddOns: pool.UserPoolAddOns,
      AdminCreateUserConfig: pool.AdminCreateUserConfig,
      UserPoolTags: pool.UserPoolTags,
      AccountRecoverySetting: pool.AccountRecoverySetting,
      UserAttributeUpdateSettings: pool.UserAttributeUpdateSettings,
    }));

    console.log("Successfully switched back to COGNITO_DEFAULT!");
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
