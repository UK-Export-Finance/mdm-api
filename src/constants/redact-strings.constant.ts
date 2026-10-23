import * as dotenv from 'dotenv';

/**
 * Load `.env` before reading `process.env` below. `src/config/index.ts` imports `app.config.ts` first, which pulls
 * in the full `@ukef/constants` barrel (including this file) before `database.config.ts`/`doc.config.ts` get a
 * chance to call `dotenv.config()`. Without this call here too, credentials supplied only via `.env` (rather than
 * already present in the process environment) would be read as `undefined` and silently never redacted.
 */
dotenv.config();

export const REDACT_STRINGS = [
  { searchValue: /(Login failed for user ').*(')/g, replaceValue: '$1[Redacted]$2' },
  { searchValue: process.env.DATABASE_USERNAME, replaceValue: '[Redacted]' },
  { searchValue: process.env.DATABASE_PASSWORD, replaceValue: '[Redacted]' },
  { searchValue: process.env.DATABASE_HOST, replaceValue: '[RedactedDomain]' },
  { searchValue: process.env.APIM_INFORMATICA_USERNAME, replaceValue: '[Redacted]' },
  { searchValue: process.env.APIM_INFORMATICA_PASSWORD, replaceValue: '[Redacted]' },
  { searchValue: process.env.SALESFORCE_USERNAME, replaceValue: '[Redacted]' },
  { searchValue: process.env.SALESFORCE_PASSWORD, replaceValue: '[Redacted]' },
  { searchValue: process.env.SALESFORCE_CLIENT_ID, replaceValue: '[Redacted]' },
  { searchValue: process.env.SALESFORCE_CLIENT_SECRET, replaceValue: '[Redacted]' },
  { searchValue: process.env.ORDNANCE_SURVEY_KEY, replaceValue: '[Redacted]' },
  { searchValue: process.env.COMPANIES_HOUSE_KEY, replaceValue: '[Redacted]' },
  { searchValue: process.env.DUN_AND_BRADSTREET_KEY, replaceValue: '[Redacted]' },
];
