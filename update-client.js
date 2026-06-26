const { CognitoIdentityProviderClient, DescribeUserPoolClientCommand, UpdateUserPoolClientCommand } = require("@aws-sdk/client-cognito-identity-provider");
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
    const clientId = process.env.COGNITO_CLIENT_ID;
    
    console.log(`Fetching App Client ${clientId}...`);
    const describeRes = await cognitoClient.send(new DescribeUserPoolClientCommand({
      UserPoolId: userPoolId,
      ClientId: clientId
    }));
    
    const client = describeRes.UserPoolClient;
    const currentFlows = client.ExplicitAuthFlows || [];
    
    // Add USER_PASSWORD_AUTH if missing
    const newFlows = new Set([...currentFlows, "ALLOW_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH"]);
    
    console.log("Updating App Client to allow USER_PASSWORD_AUTH...");
    
    await cognitoClient.send(new UpdateUserPoolClientCommand({
      UserPoolId: userPoolId,
      ClientId: clientId,
      ClientName: client.ClientName,
      ExplicitAuthFlows: Array.from(newFlows),
      RefreshTokenValidity: client.RefreshTokenValidity,
      AccessTokenValidity: client.AccessTokenValidity,
      IdTokenValidity: client.IdTokenValidity,
      TokenValidityUnits: client.TokenValidityUnits,
      ReadAttributes: client.ReadAttributes,
      WriteAttributes: client.WriteAttributes,
      PreventUserExistenceErrors: client.PreventUserExistenceErrors,
      SupportedIdentityProviders: client.SupportedIdentityProviders,
      CallbackURLs: client.CallbackURLs,
      LogoutURLs: client.LogoutURLs,
      DefaultRedirectURI: client.DefaultRedirectURI,
      AllowedOAuthFlows: client.AllowedOAuthFlows,
      AllowedOAuthScopes: client.AllowedOAuthScopes,
      AllowedOAuthFlowsUserPoolClient: client.AllowedOAuthFlowsUserPoolClient,
      AnalyticsConfiguration: client.AnalyticsConfiguration,
      PreventUserExistenceErrors: client.PreventUserExistenceErrors,
      EnableTokenRevocation: client.EnableTokenRevocation,
      EnablePropagateAdditionalUserContextData: client.EnablePropagateAdditionalUserContextData,
      AuthSessionValidity: client.AuthSessionValidity
    }));

    console.log("Successfully enabled USER_PASSWORD_AUTH on your App Client!");
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
