export const GEOSPATIAL = {
  DEFAULT: {
    RESULT_LANGUAGE: 'EN',
    DATASET: 'DPA',
  },
  REGEX: {
    // UK postcode regex is from DTFS project and slightly optimised by lint.
    // https://github.com/UK-Export-Finance/dtfs2/blob/main/portal-api/src/constants/regex.js
    UK_POSTCODE: /^[A-Za-z]{1,2}[\dRr][\dA-Za-z]?\s?\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/,
  },
};
