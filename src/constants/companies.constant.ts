export const COMPANIES = {
  ENDPOINT_BASE_URL: '/api/v1/companies?registrationNumber=',
  REGEX: {
    // This Companies House registration number regex was copied from the DTFS codebase.
    COMPANIES_HOUSE_REGISTRATION_NUMBER: /^(([A-Z]{2}|[A-Z]\d|\d{2})(\d{6}|\d{5}[A-Z]))$/,
  },
  STATUS: {
    ACTIVE: 'active',
  },
};
