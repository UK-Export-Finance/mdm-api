import { AxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { CompaniesHouseException } from './exception/companies-house.exception';
import { KnownErrors } from './known-errors';

type CompaniesHouseHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapCompaniesHouseHttpGetErrorCallback =
  ({ messageForUnknownError, knownErrors }: { messageForUnknownError: string; knownErrors: KnownErrors }): CompaniesHouseHttpErrorCallback =>
  (error: Error) => {
    if (error instanceof AxiosError) {
      let message: string;
      const status: number = error?.response?.status;

      if (typeof error?.response?.data?.error === 'string') {
        message = error.response.data.error;
      } else if (error?.response?.data?.errors[0] && typeof error?.response?.data?.errors[0]?.error === 'string') {
        message = error.response.data.errors[0].error;
      }

      /**
       * CH API will throw empty response body with `404`
       * upon sending a valid non-existent 8 digit CRN.
       *
       * Otherwise `404` with an expected response body.
       */
      if (message || status) {
        knownErrors.forEach(({ checkHasError, throwError }) => {
          if (checkHasError(error)) {
            return throwError(error);
          }
        });
      }
    }

    return throwError(() => new CompaniesHouseException(messageForUnknownError, error));
  };
