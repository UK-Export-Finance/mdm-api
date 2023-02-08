import { VersioningType, ValidationPipe, Logger as NestLogger } from '@nestjs/common';
import { NestFactory, NestApplication } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { MainModule } from './main.module';
import { TransformInterceptor } from './helpers';
import { SwaggerDocs } from './swagger';

const main = async () => {
  const app: NestApplication = await NestFactory.create(MainModule, { bufferLogs: true });
  const configService = app.get<ConfigService>(ConfigService);

  const env: string = configService.get<string>('app.env');
  process.env.NODE_ENV = env;

  const port = configService.get<number>('app.port');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const version: string = configService.get<string>('app.versioning.version');
  const versioningPrefix: string = configService.get<string>('app.versioning.prefix');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: version,
    prefix: versioningPrefix,
  });

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger docs
  SwaggerDocs(app);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useLogger(app.get(Logger));

  app.use(
    compression({
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          // don't compress responses with this request header
          return false;
        }

        // fallback to standard filter function
        return compression.filter(req, res);
      },
    }),
  );

  const logger = new NestLogger();
  logger.log(`==========================================================`);
  logger.log(`Main app will serve on PORT ${port}`, 'MainApplication');
  logger.log(`==========================================================`);
  await app.listen(port);
};

main();
