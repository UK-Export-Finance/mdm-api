import { HttpModule as AxiosHttpModule, HttpService } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { HttpModuleOptions } from './http-module-options.interface';
import { logAxiosRequestWith } from './log-axios-request.axios-interceptor';
import { logAxiosResponseErrorWith } from './log-axios-response-error.axios-interceptor';
import { logAxiosResponseSuccessWith } from './log-axios-response-success.axios-interceptor';
export { HttpService } from '@nestjs/axios';

@Module({})
export class HttpModule {
  static registerAsync(options: HttpModuleOptions): DynamicModule {
    return {
      module: HttpModule,
      imports: [
        AxiosHttpModule.registerAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: options.useFactory,
        }),
      ],
      exports: [AxiosHttpModule],
    };
  }

  constructor(httpService: HttpService, logger: PinoLogger) {
    httpService.axiosRef.interceptors.request.use(logAxiosRequestWith(logger));
    httpService.axiosRef.interceptors.response.use(logAxiosResponseSuccessWith(logger), logAxiosResponseErrorWith(logger));
  }
}
