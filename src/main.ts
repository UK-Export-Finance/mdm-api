import { Logger as NestLogger } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { MainModule } from '@ukef/main.module';

import { App } from './app';
import { REDACT_STRINGS } from './constants';
import { ConsoleLoggerWithRedact } from './logging/console-logger-with-redact';

const main = async () => {
  // If REDACT_LOGS is true use ConsoleLoggerWithRedact. ConsoleLoggerWithRedact is used just if `NestFactory.create` fails completely.
  // If `NestFactory.create` doesn't fail completely, then buffered logs are passed to PinoLogger. NestLogger and ConsoleLoggerWithRedact are not used.
  const logger = process.env.REDACT_LOGS !== 'false' ? new ConsoleLoggerWithRedact(REDACT_STRINGS) : new NestLogger();
  const nestApp: NestApplication = await NestFactory.create(MainModule, { logger, bufferLogs: true });
  const app = new App(nestApp);

  logger.log(`==========================================================`);
  logger.log(`Main app will serve on PORT ${app.port}`, 'MainApplication');
  logger.log(`==========================================================`);
  return app.listen();
};

main();
