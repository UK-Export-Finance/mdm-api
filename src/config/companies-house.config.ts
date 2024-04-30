import { registerAs } from '@nestjs/config';
import { getIntConfig } from '@ukef/helpers/get-int-config';

export const KEY = 'companiesHouse';

export interface CompaniesHouseConfig {
  baseUrl: string;
  key: string;
  maxRedirects: number;
  timeout: number;
}

export default registerAs(
  KEY,
  (): CompaniesHouseConfig => ({
    baseUrl: process.env.COMPANIES_HOUSE_URL,
    key: process.env.COMPANIES_HOUSE_KEY,
    maxRedirects: getIntConfig(process.env.COMPANIES_HOUSE_MAX_REDIRECTS, 5),
    timeout: getIntConfig(process.env.COMPANIES_HOUSE_TIMEOUT, 30000),
  }),
);
