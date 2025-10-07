import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { when } from 'jest-when';
import { PinoLogger } from 'nestjs-pino';

import { filterAxiosRequestForLogging } from './filter-axios-request-for-logging.helper';
import { OUTGOING_REQUEST_LOG_KEY } from './http.constants';
import { logAxiosRequestWith } from './log-axios-request.axios-interceptor';
import { AxiosRequestInterceptor } from './type/axios-request-interceptor.type';

jest.mock('./filter-axios-request-for-logging.helper');

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

  let logger: PinoLogger;
  let logAxiosRequest: AxiosRequestInterceptor;

  beforeEach(() => {
    logger = new PinoLogger({});
    logger.debug = jest.fn();
    logAxiosRequest = logAxiosRequestWith(logger);

    (filterAxiosRequestForLogging as jest.Mock).mockReset();
    when(filterAxiosRequestForLogging).calledWith(request).mockReturnValueOnce(filteredRequest);
  });

  it('logs the filtered request at debug level using key OUTGOING_REQUEST_LOG_KEY', () => {
    logAxiosRequest(request);

    expect(logger.debug).toHaveBeenCalledWith({ [OUTGOING_REQUEST_LOG_KEY]: filteredRequest }, 'Sending the following HTTP request.');
  });

  it('returns the original request', () => {
    expect(logAxiosRequest(request)).toBe(request);
  });
});
