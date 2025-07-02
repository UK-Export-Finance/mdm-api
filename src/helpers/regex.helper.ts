/**
 * Convert a a regex pattern into a string
 * @param {RegExp} Regular expression
 * @returns {String}
 */
export const regexToString = (regex: RegExp): string => {
  return regex.source;
};
