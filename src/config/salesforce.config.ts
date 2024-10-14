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
    baseUrl: process.env.SF_INSTANCE_URL,
    clientId: process.env.SF_CLIENT_ID,
    clientSecret: process.env.SF_CLIENT_SECRET,
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD,
    accessUrl: process.env.SF_ACCESS_URL,
    maxRedirects: getIntConfig(process.env.SF_MAX_REDIRECTS, 5),
    timeout: getIntConfig(process.env.SF_TIMEOUT, 30000), // in milliseconds
  }),
);
