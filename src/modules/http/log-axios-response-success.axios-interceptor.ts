import { AxiosResponse } from 'axios';
import { PinoLogger } from 'nestjs-pino';

import { filterAxiosResponseForLogging } from './filter-axios-response-for-logging.helper';
import { INCOMING_RESPONSE_LOG_KEY } from './http.constants';
import { AxiosResponseSuccessInterceptor } from './type/axios-response-success-interceptor.type';

export const logAxiosResponseSuccessWith =
  (logger: PinoLogger): AxiosResponseSuccessInterceptor =>
  (response: AxiosResponse) => {
    logger.debug({ [INCOMING_RESPONSE_LOG_KEY]: filterAxiosResponseForLogging(response) }, 'Received successful HTTP response.');
    return response;
  };
