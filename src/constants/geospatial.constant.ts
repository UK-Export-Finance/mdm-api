export const GEOSPATIAL = {
  DEFAULT: {
    RESULT_LANGUAGE: 'EN',
    DATASET: 'DPA',
  },
  EXAMPLES: {
    POSTCODE: 'SW1A 2AQ',
    ORGANISATION_NAME: 'CHURCHILL MUSEUM & CABINET WAR ROOMS',
    ADDRESS_LINE_1: 'CLIVE STEPS KING CHARLES STREET',
    LOCALITY: 'LONDON',
  },
  REGEX: {
    // UK postcode regex is from DTFS project and slightly optimised by lint.
    UK_POSTCODE: /^[A-Za-z]{1,2}[\dRr][\dA-Za-z]?\s?\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/,
  },
};
