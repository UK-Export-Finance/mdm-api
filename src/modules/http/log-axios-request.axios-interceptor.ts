import { InternalAxiosRequestConfig } from 'axios';
import { PinoLogger } from 'nestjs-pino';

import { filterAxiosRequestForLogging } from './filter-axios-request-for-logging.helper';
import { OUTGOING_REQUEST_LOG_KEY } from './http.constants';
import { AxiosRequestInterceptor } from './type/axios-request-interceptor.type';

export const logAxiosRequestWith =
  (logger: PinoLogger): AxiosRequestInterceptor =>
  (config: InternalAxiosRequestConfig) => {
    logger.debug({ [OUTGOING_REQUEST_LOG_KEY]: filterAxiosRequestForLogging(config) }, 'Sending the following HTTP request.');
    return config;
  };
