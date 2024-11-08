import { AxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { DunAndBradstreetException } from './exception/dun-and-bradstreet.exception';
import { KnownErrors } from './known-errors';

type DunAndBradstreetHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapDunAndBradstreetHttpGetErrorCallback =
  ({ messageForUnknownError, knownErrors }: { messageForUnknownError: string; knownErrors: KnownErrors }): DunAndBradstreetHttpErrorCallback =>
  (error: Error) => {
    if (error instanceof AxiosError && error?.response) {
      knownErrors.forEach(({ checkHasError, throwError }) => checkHasError(error) && throwError(error));
    }

    return throwError(() => new DunAndBradstreetException(messageForUnknownError, error));
  };
