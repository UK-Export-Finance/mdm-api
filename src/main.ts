import { Logger as NestLogger } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { MainModule } from '@ukef/main.module';

import { App } from './app';

const main = async () => {
  const nestApp: NestApplication = await NestFactory.create(MainModule, { bufferLogs: true });
  const app = new App(nestApp);

  const logger = new NestLogger();
  logger.log(`==========================================================`);
  logger.log(`Main app will serve on PORT ${app.port}`, 'MainApplication');
  logger.log(`==========================================================`);
  return app.listen();
};

main();
