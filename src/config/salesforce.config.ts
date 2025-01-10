import { registerAs } from '@nestjs/config';
import { getIntConfig } from '@ukef/helpers/get-int-config';

export const KEY = 'salesforce';

export interface SalesforceConfig {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
  accessUrl: string;
  maxRedirects: number;
  timeout: number;
}

export default registerAs(
  KEY,
  (): SalesforceConfig => ({
    baseUrl: process.env.SALESFORCE_INSTANCE_URL,
    clientId: process.env.SALESFORCE_CLIENT_ID,
    clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
    username: process.env.SALESFORCE_USERNAME,
    password: process.env.SALESFORCE_PASSWORD,
    accessUrl: process.env.SALESFORCE_ACCESS_URL,
    maxRedirects: getIntConfig(process.env.SALESFORCE_MAX_REDIRECTS, 5),
    timeout: getIntConfig(process.env.SALESFORCE_TIMEOUT, 30000), // in milliseconds
  }),
);
