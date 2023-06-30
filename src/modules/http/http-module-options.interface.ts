import { HttpModuleAsyncOptions as AxiosHttpModuleOptions } from '@nestjs/axios';

export type HttpModuleOptions = Pick<AxiosHttpModuleOptions, 'imports' | 'inject' | 'useFactory'>;
