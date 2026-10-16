import { AxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { InformaticaException } from './exception/informatica.exception';
import { KnownErrors } from './known-errors';

type InformaticaHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapInformaticaHttpGetErrorCallback =
  ({ messageForUnknownError, knownErrors }: { messageForUnknownError: string; knownErrors: KnownErrors }): InformaticaHttpErrorCallback =>
  (error: Error) => {
    let errorString;

    if (error instanceof AxiosError && error.response) {
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
