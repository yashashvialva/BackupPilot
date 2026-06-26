const { SESClient, ListIdentitiesCommand, GetIdentityVerificationAttributesCommand } = require("@aws-sdk/client-ses");
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

const sesClient = new SESClient(awsConfig);
const cognitoClient = new CognitoIdentityProviderClient(awsConfig);

async function run() {
  try {
    console.log("Checking SES Identities...");
    const identities = await sesClient.send(new ListIdentitiesCommand({ IdentityType: "EmailAddress" }));
    if (!identities.Identities || identities.Identities.length === 0) {
      console.error("No SES identities found in this region. Did you verify it in the correct region?");
      return;
    }

    const verificationAttrs = await sesClient.send(new GetIdentityVerificationAttributesCommand({ Identities: identities.Identities }));
    
    let verifiedEmail = null;
    for (const email of identities.Identities) {
      if (verificationAttrs.VerificationAttributes[email]?.VerificationStatus === "Success") {
        verifiedEmail = email;
        break;
      }
    }

    if (!verifiedEmail) {
      console.error("No verified SES email found. Have you clicked the verification link in your inbox?");
      return;
    }

    console.log("Found verified email:", verifiedEmail);
    // Get account ID to construct ARN
    const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts");
    const stsClient = new STSClient(awsConfig);
    const callerId = await stsClient.send(new GetCallerIdentityCommand({}));
    const accountId = callerId.Account;
    
    const sourceArn = `arn:aws:ses:${process.env.AWS_REGION}:${accountId}:identity/${verifiedEmail}`;
    console.log("SES Identity ARN:", sourceArn);

    // Fetch existing user pool to retain other settings
    const describeRes = await cognitoClient.send(new DescribeUserPoolCommand({ UserPoolId: process.env.COGNITO_USER_POOL_ID }));
    const pool = describeRes.UserPool;

    console.log("Updating Cognito User Pool Email Configuration...");
    
    // Update the User Pool
    await cognitoClient.send(new UpdateUserPoolCommand({
      UserPoolId: pool.Id,
      Policies: pool.Policies,
      DeletionProtection: pool.DeletionProtection,
      AutoVerifiedAttributes: pool.AutoVerifiedAttributes,
      VerificationMessageTemplate: pool.VerificationMessageTemplate,
      EmailConfiguration: {
        EmailSendingAccount: "DEVELOPER",
        SourceArn: sourceArn,
        From: `BackupPilot Support <${verifiedEmail}>`,
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

    console.log("Successfully updated Cognito to use Amazon SES!");
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
