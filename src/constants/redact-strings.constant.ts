export const REDACT_STRINGS = [
  { searchValue: /(Login failed for user ').*(')/g, replaceValue: '$1[Redacted]$2' },
  { searchValue: process.env.DATABASE_USERNAME, replaceValue: '[Redacted]' },
  { searchValue: process.env.DATABASE_PASSWORD, replaceValue: '[Redacted]' },
  { searchValue: process.env.DATABASE_HOST, replaceValue: '[RedactedDomain]' },
];
