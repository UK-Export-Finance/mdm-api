import { get, set } from 'lodash';

// This helper function is used to redact sensitive data in Error object strings.
export const redactStringsInLogArgs = (
  redactLogs: boolean,
  redactPaths: string[],
  redactStrings: { searchValue: string | RegExp; replaceValue: string }[],
  args: any[],
): any => {
  if (!redactLogs) {
    return args;
  }
  args.forEach((arg, index) => {
    redactPaths.forEach((path) => {
      const value: string = get(arg, path);
      if (value) {
        const safeValue = redactString(redactStrings, value);
        set(args[index], path, safeValue);
      }
    });
  });
  return args;
};

const redactString = (redactStrings: { searchValue: string | RegExp; replaceValue: string }[], string: string): string => {
  let safeString: string = string;
  redactStrings.forEach((redact) => {
    safeString = safeString.replaceAll(redact.searchValue, redact.replaceValue);
  });
  return safeString;
};
