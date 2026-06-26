const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts");
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

console.log("AWS_REGION length:", process.env.AWS_REGION?.length);
console.log("AWS_ACCESS_KEY_ID length:", process.env.AWS_ACCESS_KEY_ID?.length);
console.log("AWS_SECRET_ACCESS_KEY length:", process.env.AWS_SECRET_ACCESS_KEY?.length);

const client = new STSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

client.send(new GetCallerIdentityCommand({}))
  .then((data) => console.log("Success:", data.Arn))
  .catch((err) => console.error("Error:", err.message));
