// This helper function is used to convert the regex pattern to a string so that it can be used in the swagger documentation.
export const regexToString = (regex: RegExp): string => {
  return regex.toString().replace(/^\/|\/$/g, '');
};
