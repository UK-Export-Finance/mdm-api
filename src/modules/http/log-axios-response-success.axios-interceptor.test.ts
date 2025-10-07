import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { when } from 'jest-when';
import { PinoLogger } from 'nestjs-pino';

import { filterAxiosResponseForLogging } from './filter-axios-response-for-logging.helper';
import { INCOMING_RESPONSE_LOG_KEY } from './http.constants';
import { logAxiosResponseSuccessWith } from './log-axios-response-success.axios-interceptor';
import { AxiosResponseSuccessInterceptor } from './type/axios-response-success-interceptor.type';

jest.mock('./filter-axios-response-for-logging.helper');

describe('logAxiosResponseSuccess', () => {
  const valueGenerator = new RandomValueGenerator();

  const data = {
    someNumber: valueGenerator.nonnegativeFloat(),
  };
  const headers = { Accept: 'application/json' };
  const status = 200;
  const statusText = 'ok';

  const response: AxiosResponse = {
    data,
    headers,
    status,
    statusText,
    config: {} as InternalAxiosRequestConfig,
    request: {},
  };

  const filteredResponse = {
    data,
    headers,
    status,
    statusText,
  };

  let logger: PinoLogger;
  let logAxiosResponseSuccess: AxiosResponseSuccessInterceptor;

  beforeEach(() => {
    logger = new PinoLogger({});
    logger.debug = jest.fn();
    logAxiosResponseSuccess = logAxiosResponseSuccessWith(logger);

    (filterAxiosResponseForLogging as jest.Mock).mockReset();
    when(filterAxiosResponseForLogging).calledWith(response).mockReturnValueOnce(filteredResponse);
  });

  it('logs the filtered response at debug level using key INCOMING_RESPONSE_LOG_KEY', () => {
    logAxiosResponseSuccess(response);

    expect(logger.debug).toHaveBeenCalledWith({ [INCOMING_RESPONSE_LOG_KEY]: filteredResponse }, 'Received successful HTTP response.');
  });

  it('returns the original response', () => {
    expect(logAxiosResponseSuccess(response)).toBe(response);
  });
});
