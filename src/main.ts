import { NestApplication, NestFactory } from '@nestjs/core';
import { MainModule } from '@ukef/main.module';

import { App } from './app';
import { REDACT_STRINGS } from './constants';
import { ConsoleLoggerWithRedact } from './logging/console-logger-with-redact';

const main = async () => {
  // ConsoleLoggerWithRedact is used just if NestFactory.create is fails completely.
  // Buffered logs are passed to PinoLogger if NestFactory.create is successfull, ConsoleLoggerWithRedact is not used.
  const logger = new ConsoleLoggerWithRedact(REDACT_STRINGS);
  const nestApp: NestApplication = await NestFactory.create(MainModule, { logger, bufferLogs: true });
  const app = new App(nestApp);

  logger.log(`==========================================================`);
  logger.log(`Main app will serve on PORT ${app.port}`, 'MainApplication');
  logger.log(`==========================================================`);
  return app.listen();
};

main();
