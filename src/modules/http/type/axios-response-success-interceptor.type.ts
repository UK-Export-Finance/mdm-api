import { AxiosResponse } from 'axios';

export type AxiosResponseSuccessInterceptor = (response: AxiosResponse) => AxiosResponse;
