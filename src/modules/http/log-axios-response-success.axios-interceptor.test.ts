import { jest } from '@jest/globals';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { when } from 'jest-when';
import { PinoLogger } from 'nestjs-pino';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { INCOMING_RESPONSE_LOG_KEY } from './http.constants';
import { AxiosResponseSuccessInterceptor } from './type/axios-response-success-interceptor.type';

const filterAxiosResponseForLogging = jest.fn<typeof import('./filter-axios-response-for-logging.helper').filterAxiosResponseForLogging>();
let logAxiosResponseSuccessWith: typeof import('./log-axios-response-success.axios-interceptor').logAxiosResponseSuccessWith;

jest.unstable_mockModule('./filter-axios-response-for-logging.helper', () => ({ filterAxiosResponseForLogging }));

beforeAll(async () => {
  ({ logAxiosResponseSuccessWith } = await import('./log-axios-response-success.axios-interceptor.js'));
});

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

  let mockLogger: PinoLogger;
  let logAxiosResponseSuccess: AxiosResponseSuccessInterceptor;

  beforeEach(() => {
    mockLogger = new PinoLogger({});
    mockLogger.debug = jest.fn<PinoLogger['debug']>();
    logAxiosResponseSuccess = logAxiosResponseSuccessWith(mockLogger);

    filterAxiosResponseForLogging.mockReset();
    when(filterAxiosResponseForLogging).calledWith(response).mockReturnValueOnce(filteredResponse);
  });

  it('logs the filtered response at debug level using key INCOMING_RESPONSE_LOG_KEY', () => {
    logAxiosResponseSuccess(response);

    expect(mockLogger.debug).toHaveBeenCalledWith({ [INCOMING_RESPONSE_LOG_KEY]: filteredResponse }, 'Received successful HTTP response.');
  });

  it('returns the original response', () => {
    expect(logAxiosResponseSuccess(response)).toBe(response);
  });
});
