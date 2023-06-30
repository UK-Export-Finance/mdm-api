import { AxiosError } from 'axios';

export type AxiosResponseErrorInterceptor = (error: AxiosError) => Promise<void>;
