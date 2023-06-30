import { AxiosRequestConfig } from 'axios';

import { BODY_LOG_KEY, HEADERS_LOG_KEY } from './http.constants';

export const filterAxiosRequestForLogging = (
  config: AxiosRequestConfig,
): Pick<AxiosRequestConfig, 'timeout' | 'headers' | 'maxRedirects' | 'baseURL' | 'url' | 'method' | 'data'> => {
  const { timeout, headers, maxRedirects, baseURL, url, method, data } = config;
  return {
    timeout,
    [HEADERS_LOG_KEY]: headers,
    maxRedirects,
    baseURL,
    url,
    method,
    [BODY_LOG_KEY]: data,
  };
};
