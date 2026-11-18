import { isAxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { InformaticaException } from './exception/informatica.exception';
import { KnownErrors } from './known-errors';

type InformaticaHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapInformaticaHttpGetErrorCallback =
  ({ messageForUnknownError, knownErrors }: { messageForUnknownError: string; knownErrors: KnownErrors }): InformaticaHttpErrorCallback =>
  (error: Error) => {
    let errorString;

    /**
     * Use the isAxiosError type guard rather than `instanceof AxiosError`: @nestjs/axios is ESM and loads its own
     * copy of axios, so an error it throws is not an `instanceof` the AxiosError class imported here via CJS.
     */
    if (isAxiosError(error) && error.response) {
      if (typeof error.response.data === 'object') {
        errorString = JSON.stringify(error.response.data);
      }

      if (typeof error.response.data === 'string') {
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

    return throwError(() => new InformaticaException(messageForUnknownError, error));
  };
