import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosRequestConfig } from 'axios';

import { filterAxiosRequestForLogging } from './filter-axios-request-for-logging.helper';
import { BODY_LOG_KEY, HEADERS_LOG_KEY } from './http.constants';

describe('filterAxiosRequestForLogging', () => {
  const valueGenerator = new RandomValueGenerator();
  const timeout = valueGenerator.nonnegativeInteger();
  const headers = { Accept: 'application/json' };
  const maxRedirects = valueGenerator.nonnegativeInteger();
  const baseURL = valueGenerator.httpsUrl();
  const url = '/some-url';
  const method = 'post';
  const data = {
    someNumber: valueGenerator.nonnegativeFloat(),
  };

  const request: AxiosRequestConfig = {
    timeout,
    headers,
    maxRedirects,
    baseURL,
    url,
    method,
    data,
    transformRequest: jest.fn(),
    transformResponse: jest.fn(),
  };

  it('returns only the timeout, headers, maxRedirects, baseURL, url, method, and data of the request, using BODY_LOG_KEY and HEADERS_LOG_KEY', () => {
    expect(filterAxiosRequestForLogging(request)).toStrictEqual({
      timeout,
      [HEADERS_LOG_KEY]: headers,
      maxRedirects,
      baseURL,
      url,
      method,
      [BODY_LOG_KEY]: data,
    });
  });
});
