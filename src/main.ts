import { VersioningType, ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory, NestApplication } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';

import { MainModule } from './main.module';
import { TransformInterceptor } from './helpers';
import { SwaggerDocs } from './swagger';

const main = async () => {
  const app: NestApplication = await NestFactory.create(MainModule);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger();

  const env: string = configService.get<string>('app.env');
  process.env.NODE_ENV = env;

  const port = configService.get<number>('PORT');
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

  logger.log(`==========================================================`);
  logger.log(`NestJS app will serve on port ${port}`, 'NestApplication');
  logger.log(`==========================================================`);
  await app.listen(port);
};

main();
