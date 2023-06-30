import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { filterAxiosResponseForLogging } from './filter-axios-response-for-logging.helper';
import { BODY_LOG_KEY, HEADERS_LOG_KEY } from './http.constants';

describe('filterAxiosResponseForLogging', () => {
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

  it('returns only the data, headers, status, statusText of the response, using BODY_LOG_KEY and HEADERS_LOG_KEY', () => {
    expect(filterAxiosResponseForLogging(response)).toStrictEqual({
      [BODY_LOG_KEY]: data,
      [HEADERS_LOG_KEY]: headers,
      status,
      statusText,
    });
  });
});
