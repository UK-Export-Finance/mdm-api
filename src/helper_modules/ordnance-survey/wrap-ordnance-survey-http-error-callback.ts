import { AxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { OrdnanceSurveyException } from './exception/ordnance-survey.exception';
import { KnownErrors } from './known-errors';

type AcbsHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapOrdnanceSurveyHttpGetErrorCallback =
  ({ messageForUnknownError, knownErrors }: { messageForUnknownError: string; knownErrors: KnownErrors }): AcbsHttpErrorCallback =>
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

        knownErrors.forEach(({ caseInsensitiveSubstringToFind, throwError }) => {
          if (errorStringInLowerCase.includes(caseInsensitiveSubstringToFind.toLowerCase())) {
            return throwError(error);
          }
        });
      }
    }

    return throwError(() => new OrdnanceSurveyException(messageForUnknownError, error));
  };
