import { AxiosError } from 'axios';
import { PinoLogger } from 'nestjs-pino';

import { filterAxiosResponseForLogging } from './filter-axios-response-for-logging.helper';
import { INCOMING_RESPONSE_LOG_KEY } from './http.constants';
import { AxiosResponseErrorInterceptor } from './type/axios-response-error-interceptor.type';

export const logAxiosResponseErrorWith =
  (logger: PinoLogger): AxiosResponseErrorInterceptor =>
  (error: AxiosError) => {
    const logInput = buildAxiosResponseLogInput(error);
    logger.warn(logInput.object, logInput.message);
    return Promise.reject(error);
  };

const buildAxiosResponseLogInput = (error: AxiosError): { object: unknown; message: string } => {
  const responseFromServer = error.response;
  const receivedResponseFromServer = !!responseFromServer;
  return receivedResponseFromServer
    ? {
        object: { [INCOMING_RESPONSE_LOG_KEY]: filterAxiosResponseForLogging(responseFromServer) },
        message: 'A HTTP server responded to our request with an error response.',
      }
    : { object: error, message: 'A HTTP server failed to respond to our request.' };
};
