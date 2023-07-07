import { AxiosResponse } from 'axios';

import { BODY_LOG_KEY, HEADERS_LOG_KEY } from './http.constants';

export const filterAxiosResponseForLogging = (response: AxiosResponse): Pick<AxiosResponse, 'data' | 'headers' | 'status' | 'statusText'> => {
  const { data, headers, status, statusText } = response;
  return {
    [BODY_LOG_KEY]: data,
    [HEADERS_LOG_KEY]: headers,
    status,
    statusText,
  };
};
