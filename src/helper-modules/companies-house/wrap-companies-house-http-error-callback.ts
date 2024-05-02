import { AxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { CompaniesHouseException } from './exception/companies-house.exception';
import { KnownErrors } from './known-errors';

type CompaniesHouseHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapCompaniesHouseHttpGetErrorCallback =
  ({ messageForUnknownError, knownErrors }: { messageForUnknownError: string; knownErrors: KnownErrors }): CompaniesHouseHttpErrorCallback =>
  (error: Error) => {
    if (error instanceof AxiosError && error.response && typeof error.response.data === 'object') {
      const errorResponseData = error.response.data;
      let errorMessage: string;

      if (typeof errorResponseData.error === 'string') {
        errorMessage = errorResponseData.error;
      } else if (errorResponseData.errors && errorResponseData.errors[0] && typeof errorResponseData.errors[0].error === 'string') {
        errorMessage = errorResponseData.errors[0].error;
      }

      if (errorMessage) {
        const errorMessageInLowerCase = errorMessage.toLowerCase();

        knownErrors.forEach(({ caseInsensitiveSubstringToFind, throwError }) => {
          if (errorMessageInLowerCase.includes(caseInsensitiveSubstringToFind.toLowerCase())) {
            return throwError(error);
          }
        });
      }
    }

    return throwError(() => new CompaniesHouseException(messageForUnknownError, error));
  };
