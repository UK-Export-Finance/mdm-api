import { InternalAxiosRequestConfig } from 'axios';

export type AxiosRequestInterceptor = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
