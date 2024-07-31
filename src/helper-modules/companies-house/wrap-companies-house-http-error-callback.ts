import { AxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { CompaniesHouseException } from './exception/companies-house.exception';
import { KnownErrors } from './known-errors';

type CompaniesHouseHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapCompaniesHouseHttpGetErrorCallback =
  ({ messageForUnknownError, knownErrors }: { messageForUnknownError: string; knownErrors: KnownErrors }): CompaniesHouseHttpErrorCallback =>
  (error: Error) => {
    if (error instanceof AxiosError && error?.response) {
      knownErrors.forEach(({ checkHasError, throwError }) => checkHasError(error) && throwError(error));
    }

    return throwError(() => new CompaniesHouseException(messageForUnknownError, error));
  };
