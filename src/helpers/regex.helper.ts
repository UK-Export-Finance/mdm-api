// This helper function is used to convert the regex pattern to a string so that it can be used in the swagger documentation.
export const regexToSting = (regex: RegExp): string => {
    return regex.toString().replace(/^\/|\/$/g, '');
  };
  