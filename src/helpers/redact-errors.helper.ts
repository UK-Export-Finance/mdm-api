import { REDACT_STRINGS, REDACT_STRING_PATHS } from "@ukef/constants";

import {get, set}  from "lodash";

// This helper function is used to redact sensitive data in Error object strings.
export const redactError = (redactLogs: boolean, redactPaths: string[], redactStrings: {searchValue: string | RegExp, replaceValue: string}[], err: any): any => {
  if (!redactLogs) {
    return err;
  }
  redactPaths.forEach((path) => {
  //REDACT_STRING_PATHS.forEach((path) => {
    let value: string = get(err, path);
    if (value) {
      const safeValue = redactString(redactStrings, value);
      set(err, path, safeValue);
    }
  })
  return err;
};

const redactString = (redactStrings: {searchValue: string | RegExp, replaceValue: string}[], string: string): string => {
  let safeSTring: string = string;
  redactStrings.forEach( (redact) => {
    safeSTring = safeSTring.replaceAll(redact.searchValue, redact.replaceValue);
  });
  return safeSTring;
}
