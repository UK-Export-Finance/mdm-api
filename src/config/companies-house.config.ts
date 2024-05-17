import { registerAs } from '@nestjs/config';
import { COMPANIES_HOUSE } from '@ukef/constants';
import { getIntConfig } from '@ukef/helpers/get-int-config';

export interface CompaniesHouseConfig {
  baseUrl: string;
  key: string;
  maxRedirects: number;
  timeout: number;
}

export default registerAs(
  COMPANIES_HOUSE.CONFIG.KEY,
  (): CompaniesHouseConfig => ({
    baseUrl: process.env.COMPANIES_HOUSE_URL,
    key: process.env.COMPANIES_HOUSE_KEY,
    maxRedirects: getIntConfig(process.env.COMPANIES_HOUSE_MAX_REDIRECTS, 5),
    timeout: getIntConfig(process.env.COMPANIES_HOUSE_TIMEOUT, 30000),
  }),
);
