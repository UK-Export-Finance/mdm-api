import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@ukef/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MdmModule } from '@ukef/modules/mdm.module';
import { LoggerModule } from 'nestjs-pino';

import { logKeysToRedact } from './logging/log-keys-to-redact';
import { LoggingInterceptor } from './logging/logging-interceptor.helper';
import { HEADERS_LOG_KEY, OUTGOING_REQUEST_LOG_KEY } from '@ukef/modules/http/http.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          customProps: () => ({
            context: 'HTTP',
          }),
          level: config.get<string>('app.logLevel'),
          transport: {
            target: 'pino-pretty',
            options: {
              singleLine: true,
            },
          },
          redact: logKeysToRedact({
            redactLogs: config.get<boolean>('app.redactLogs'),
            clientRequest: {
              logKey: 'req',
              headersLogKey: 'headers',
            },
            outgoingRequest: {
              logKey: OUTGOING_REQUEST_LOG_KEY,
              headersLogKey: HEADERS_LOG_KEY,
            },
            error: {
              logKey: 'err',
              sensitiveChildKeys: [
                // The `config` has basic authentication details for Informatica.
                'config',
              ],
            },
            dbError: {
              logKey: 'err',
              sensitiveChildKeys: [
                // The `serverName` has db server address.
                'serverName',
              ],
            },
          }),
        },
      }),
    }),
    MdmModule,
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class MainModule {}
