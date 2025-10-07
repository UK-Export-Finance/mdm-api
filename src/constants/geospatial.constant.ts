export const GEOSPATIAL = {
  DEFAULT: {
    RESULT_LANGUAGE: 'EN',
    DATASET: 'DPA',
  },
  EXAMPLES: {
    ENGLISH_POSTCODE: 'SW1A 2AQ',
    NORTHERN_IRELAND_POSTCODE: 'BT7 3GG',
    WALES_POSTCODE: 'SY23 3AR',
    SCOTLAND_POSTCODE: 'EH1 1JF',
    ORGANISATION_NAME: 'CHURCHILL MUSEUM & CABINET WAR ROOMS',
    ADDRESS_LINE_1: 'CLIVE STEPS KING CHARLES STREET',
    LOCALITY: 'LONDON',
  },
  REGEX: {
    // UK postcode regex is from DTFS project and slightly optimised by lint.
    // https://github.com/UK-Export-Finance/dtfs2/blob/main/portal-api/src/constants/regex.js
    UK_POSTCODE: /^[A-Za-z]{1,2}[\dRr][\dA-Za-z]?\s?\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/,
  },
};
