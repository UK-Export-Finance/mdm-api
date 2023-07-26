import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import config from '@ukef/config';
import { HEADERS_LOG_KEY, OUTGOING_REQUEST_LOG_KEY } from '@ukef/modules/http/http.constants';
import { MdmModule } from '@ukef/modules/mdm.module';
import { LoggerModule } from 'nestjs-pino';

import { REDACT_STRING_PATHS, REDACT_STRINGS } from './constants';
import { redactStringsInLogArgs } from './helpers/redact-strings-in-log-args.helper';
import { logKeysToRedact } from './logging/log-keys-to-redact';
import { LoggingInterceptor } from './logging/logging-interceptor.helper';

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
          hooks: {
            logMethod(inputArgs: any[], method) {
              return method.apply(this, redactStringsInLogArgs(config.get<boolean>('app.redactLogs'), REDACT_STRING_PATHS, REDACT_STRINGS, inputArgs));
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
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class MainModule {}
