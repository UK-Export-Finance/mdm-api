import { NestApplication, NestFactory } from '@nestjs/core';
import { MainModule } from '@ukef/main.module';

import { App } from './app';
import { ConsoleLoggerWithRedact } from './logging/console-logger-with-redact';
import { REDACT_STRINGS } from './constants';

const main = async () => {
  const logger = new ConsoleLoggerWithRedact( REDACT_STRINGS );
  const nestApp: NestApplication = await NestFactory.create(MainModule, { logger, bufferLogs: false });
  const app = new App(nestApp);

  logger.log(`==========================================================`);
  logger.log(`Main app will serve on PORT ${app.port}`, 'MainApplication');
  logger.log(`==========================================================`);
  return app.listen();
};

main();
