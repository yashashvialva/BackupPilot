const { CognitoIdentityProviderClient, DescribeUserPoolCommand } = require("@aws-sdk/client-cognito-identity-provider");
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

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function run() {
  try {
    const command = new DescribeUserPoolCommand({ UserPoolId: process.env.COGNITO_USER_POOL_ID });
    const response = await client.send(command);
    const pool = response.UserPool;
    
    console.log("AutoVerifiedAttributes:", pool.AutoVerifiedAttributes);
    console.log("EmailConfiguration:", pool.EmailConfiguration);
    console.log("VerificationMessageTemplate:", pool.VerificationMessageTemplate);
  } catch (error) {
    console.error("Error fetching User Pool:", error);
  }
}

run();
