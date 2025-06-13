export const UKEFID = {
  // Prefix is used for 10 digit id (Deal, Facility) and 8 digit id (Party/Customer)
  MAIN_ID: {
    PREFIX: {
      DEV: '0030',
      QA: '0040',
      PROD: '0020',
    },
    TEN_DIGIT_REGEX: /^00\d{8}$/,
  },
  PARTY_ID: {
    REGEX: /^\d{8}$/,
  },
};
