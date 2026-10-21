import { jest } from '@jest/globals';
import { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { when } from 'jest-when';
import { PinoLogger } from 'nestjs-pino';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { OUTGOING_REQUEST_LOG_KEY } from './http.constants';
import { AxiosRequestInterceptor } from './type/axios-request-interceptor.type';

const filterAxiosRequestForLogging = jest.fn<typeof import('./filter-axios-request-for-logging.helper').filterAxiosRequestForLogging>();
let logAxiosRequestWith: typeof import('./log-axios-request.axios-interceptor').logAxiosRequestWith;

jest.unstable_mockModule('./filter-axios-request-for-logging.helper', () => ({ filterAxiosRequestForLogging }));

beforeAll(async () => {
  ({ logAxiosRequestWith } = await import('./log-axios-request.axios-interceptor.js'));
});

describe('logAxiosRequest', () => {
  const valueGenerator = new RandomValueGenerator();

  const timeout = valueGenerator.nonnegativeInteger();
  const baseURL = valueGenerator.httpsUrl();
  const data = {
    someNumber: valueGenerator.nonnegativeFloat(),
  };

  const request: InternalAxiosRequestConfig = {
    timeout,
    baseURL,
    headers: new AxiosHeaders(),
    data,
  };

  const filteredRequest = {
    data,
  };

  let mockLogger: PinoLogger;
  let logAxiosRequest: AxiosRequestInterceptor;

  beforeEach(() => {
    mockLogger = new PinoLogger({});
    mockLogger.debug = jest.fn<PinoLogger['debug']>();
    logAxiosRequest = logAxiosRequestWith(mockLogger);

    filterAxiosRequestForLogging.mockReset();
    when(filterAxiosRequestForLogging).calledWith(request).mockReturnValueOnce(filteredRequest);
  });

  it('logs the filtered request at debug level using key OUTGOING_REQUEST_LOG_KEY', () => {
    logAxiosRequest(request);

    expect(mockLogger.debug).toHaveBeenCalledWith({ [OUTGOING_REQUEST_LOG_KEY]: filteredRequest }, 'Sending the following HTTP request.');
  });

  it('returns the original request', () => {
    expect(logAxiosRequest(request)).toBe(request);
  });
});
