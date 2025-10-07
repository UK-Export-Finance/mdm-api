export const UKEFID = {
  // Prefix is used for 8 digit id (Party/Customer)
  MAIN_ID: {
    PREFIX: {
      DEV: '0030',
      QA: '0040',
      PROD: '0020',
    },
  },
  PARTY_ID: {
    REGEX: /^\d{8}$/,
  },
};
