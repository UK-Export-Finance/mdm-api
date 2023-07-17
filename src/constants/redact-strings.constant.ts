export const REDACT_STRINGS = [
  {searchValue: /(Login failed for user ').*(')/g, replaceValue: '$1[Redacted]$2'},
  {searchValue: process.env.DATABASE_USERNAME, replaceValue: '[RedactedDomain]'},
  {searchValue: process.env.DATABASE_PASSWORD, replaceValue: '[RedactedDomain]'},
  {searchValue: process.env.DATABASE_MDM_HOST, replaceValue: '[RedactedDomain]'},
  {searchValue: process.env.DATABASE_CEDAR_HOST, replaceValue: '[RedactedDomain]'},
  {searchValue: process.env.DATABASE_NUMBER_GENERATOR_HOST, replaceValue: '[RedactedDomain]'},
  {searchValue: process.env.DATABASE_CIS_HOST, replaceValue: '[RedactedDomain]'},
];
