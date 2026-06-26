export interface AwsRegion {
  code: string;
  name: string;
}

export const SUPPORTED_REGIONS: AwsRegion[] = [
  { code: "us-east-1", name: "US East (N. Virginia)" },
  { code: "us-east-2", name: "US East (Ohio)" },
  { code: "us-west-1", name: "US West (N. California)" },
  { code: "us-west-2", name: "US West (Oregon)" },
  { code: "af-south-1", name: "Africa (Cape Town)" },
  { code: "ap-east-1", name: "Asia Pacific (Hong Kong)" },
  { code: "ap-south-1", name: "Asia Pacific (Mumbai)" },
  { code: "ap-northeast-3", name: "Asia Pacific (Osaka)" },
  { code: "ap-northeast-2", name: "Asia Pacific (Seoul)" },
  { code: "ap-southeast-1", name: "Asia Pacific (Singapore)" },
  { code: "ap-southeast-2", name: "Asia Pacific (Sydney)" },
  { code: "ap-northeast-1", name: "Asia Pacific (Tokyo)" },
  { code: "ca-central-1", name: "Canada (Central)" },
  { code: "eu-central-1", name: "Europe (Frankfurt)" },
  { code: "eu-west-1", name: "Europe (Ireland)" },
  { code: "eu-west-2", name: "Europe (London)" },
  { code: "eu-south-1", name: "Europe (Milan)" },
  { code: "eu-west-3", name: "Europe (Paris)" },
  { code: "eu-north-1", name: "Europe (Stockholm)" },
  { code: "me-south-1", name: "Middle East (Bahrain)" },
  { code: "sa-east-1", name: "South America (São Paulo)" }
];

export const isValidRegion = (code: string) => SUPPORTED_REGIONS.some(r => r.code === code);
export const getRegionName = (code: string) => SUPPORTED_REGIONS.find(r => r.code === code)?.name || code;
