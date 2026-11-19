import { isAxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { CompaniesHouseException } from './exception/companies-house.exception';
import { KnownErrors } from './known-errors';

type CompaniesHouseHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapCompaniesHouseHttpGetErrorCallback =
  ({ messageForUnknownError, knownErrors }: { messageForUnknownError: string; knownErrors: KnownErrors }): CompaniesHouseHttpErrorCallback =>
  (error: Error) => {
    /**
     * Use the isAxiosError type guard rather than `instanceof AxiosError`: @nestjs/axios is ESM and loads its own
     * copy of axios, so an error it throws is not an `instanceof` the AxiosError class imported here via CJS.
     */
    if (isAxiosError(error) && error?.response) {
      knownErrors.forEach(({ checkHasError, throwError: throwKnownError }) => checkHasError(error) && throwKnownError(error));
    }

    return throwError(() => new CompaniesHouseException(messageForUnknownError, error));
  };
