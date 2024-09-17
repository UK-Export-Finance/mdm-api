import { AxiosError } from 'axios';
import { ObservableInput, throwError } from 'rxjs';

import { SalesforceException } from './exception/salesforce.exception';

type SalesforceHttpErrorCallback = (error: Error) => ObservableInput<never>;

export const createWrapSalesforceHttpGetErrorCallback =
  ({ messageForUnknownError }: { messageForUnknownError: string; }): SalesforceHttpErrorCallback =>
  (error: Error) => {
    let errorString;
    if (error instanceof AxiosError && error.response) {
      if (typeof error.response.data === 'object') {
        errorString = JSON.stringify(error.response.data);
      }
      if (typeof error.response.data === 'string') {
        errorString = error.response.data;
      }
    }

    return throwError(() => new SalesforceException(messageForUnknownError, error));
  };
