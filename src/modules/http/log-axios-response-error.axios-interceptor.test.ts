import { jest } from '@jest/globals';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { when } from 'jest-when';
import { PinoLogger } from 'nestjs-pino';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { INCOMING_RESPONSE_LOG_KEY } from './http.constants';
import { AxiosResponseErrorInterceptor } from './type/axios-response-error-interceptor.type';

const filterAxiosResponseForLogging = jest.fn<typeof import('./filter-axios-response-for-logging.helper').filterAxiosResponseForLogging>();
let logAxiosResponseErrorWith: typeof import('./log-axios-response-error.axios-interceptor').logAxiosResponseErrorWith;

jest.unstable_mockModule('./filter-axios-response-for-logging.helper', () => ({ filterAxiosResponseForLogging }));

beforeAll(async () => {
  ({ logAxiosResponseErrorWith } = await import('./log-axios-response-error.axios-interceptor.js'));
});

describe('logAxiosResponseError', () => {
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

  const errorWithoutResponse = new AxiosError('error without response');

  const errorWithResponse = new AxiosError('error with response', undefined, undefined, undefined, response);

  let mockLogger: PinoLogger;
  let logAxiosResponseError: AxiosResponseErrorInterceptor;

  beforeEach(() => {
    mockLogger = new PinoLogger({});
    mockLogger.warn = jest.fn<PinoLogger['warn']>();
    logAxiosResponseError = logAxiosResponseErrorWith(mockLogger);

    filterAxiosResponseForLogging.mockReset();
    when(filterAxiosResponseForLogging).calledWith(response).mockReturnValueOnce(filteredResponse);
  });

  describe('when the error does not include a response', () => {
    it('logs the full error at warn level', async () => {
      await logAxiosResponseError(errorWithoutResponse).catch(() => {});

      expect(mockLogger.warn).toHaveBeenCalledWith('%s %o', 'A HTTP server failed to respond to our request.', errorWithoutResponse);
    });

    it('rejects with the original error', async () => {
      const logAxiosResponseErrorPromise = logAxiosResponseError(errorWithoutResponse);

      await expect(logAxiosResponseErrorPromise).rejects.toBe(errorWithoutResponse);
    });
  });

  describe('when the error does include a response', () => {
    it('logs the filtered response at warn level using key INCOMING_RESPONSE_LOG_KEY', async () => {
      await logAxiosResponseError(errorWithResponse).catch(() => {});

      expect(mockLogger.warn).toHaveBeenCalledWith('%s %o', 'A HTTP server responded to our request with an error response.', {
        [INCOMING_RESPONSE_LOG_KEY]: filteredResponse,
      });
    });

    it('rejects with the original error', async () => {
      const logAxiosResponseErrorPromise = logAxiosResponseError(errorWithResponse);

      await expect(logAxiosResponseErrorPromise).rejects.toBe(errorWithResponse);
    });
  });
});
