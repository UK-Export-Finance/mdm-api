import { get, set } from 'lodash';

type RedactStringsParams = {
  searchValue: string | RegExp;
  replaceValue: string;
};

/**
 * Redacts sensitive information from a string based on the provided search and replace values.
 * @param {RedactStringsParams} redactStrings - An array of objects containing search and replace values for redaction.
 * @param {string} string - The string to be redacted.
 * @returns {string} The redacted string.
 */
const redactString = (redactStrings: RedactStringsParams[], string: string): string => {
  let safeString: string = string;

  /**
   * Longest literal values first, so a shorter secret that is a substring of a longer one (e.g. a username within a
   * password) does not get redacted before the longer rule has a chance to match the still-intact longer secret.
   */
  const prioritisedRedactStrings = [...redactStrings].sort((a, b) => {
    const lengthOf = (searchValue: string | RegExp): number => (typeof searchValue === 'string' ? searchValue.length : 0);

    return lengthOf(b.searchValue) - lengthOf(a.searchValue);
  });

  prioritisedRedactStrings.forEach((redact) => {
    safeString = safeString.replaceAll(redact.searchValue, redact.replaceValue);
  });

  return safeString;
};

/**
 * Redacts sensitive information from the provided log arguments based on the specified paths and redaction rules.
 * @param {boolean} redactLogs - Indicates whether redaction should be applied to the log arguments.
 * @param {string[]} redactPaths - An array of paths within the log arguments that should be redacted.
 * @param {RedactStringsParams[]} redactStrings - An array of objects containing search and replace values for redaction.
 * @param {any[]} args - The log arguments to be redacted.
 * @returns {any[]} The redacted log arguments.
 */
export const redactStringsInLogArgs = (redactLogs: boolean, redactPaths: string[], redactStrings: RedactStringsParams[], args: any[]): any => {
  if (!redactLogs) {
    return args;
  }

  args.forEach((arg, index) => {
    redactPaths.forEach((path) => {
      const value: string = get(arg, path);

      if (value) {
        const safeValue = redactString(redactStrings, value);
        set(args[`${index}`], path, safeValue);
      }
    });
  });
  return args;
};
