import { AxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { DunAndBradstreetException } from './exception/dun-and-bradstreet.exception';
import { KnownErrors } from './known-errors';

type DunAndBradstreetHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapDunAndBradstreetHttpGetErrorCallback =
  ({ messageForUnknownError, knownErrors }: { messageForUnknownError: string; knownErrors: KnownErrors }): DunAndBradstreetHttpErrorCallback =>
  (error: Error) => {
    let errorString;

    if (error instanceof AxiosError && error.response) {
      if (typeof error.response?.data === 'object') {
        errorString = JSON.stringify(error.response.data);
      }

      if (typeof error.response?.data === 'string') {
        errorString = error.response.data;
      }

      if (errorString) {
        const errorStringInLowerCase = errorString.toLowerCase();

        knownErrors.forEach(({ caseInsensitiveSubstringToFind, throwError: throwKnownError }) => {
          if (errorStringInLowerCase.includes(caseInsensitiveSubstringToFind.toLowerCase())) {
            throwKnownError(error);
          }
        });
      }
    }

    return throwError(() => new DunAndBradstreetException(messageForUnknownError, error));
  };
