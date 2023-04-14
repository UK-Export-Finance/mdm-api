import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

import { AUTH } from './constants';

export const SwaggerDocs = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const logger = new Logger();

  const docName: string = configService.get<string>('doc.name');
  const docDesc: string = configService.get<string>('doc.description');
  const docVersion: string = configService.get<string>('doc.version');
  const docPrefix: string = configService.get<string>('doc.prefix');

  const securityName = 'ApiKeyHeader';

  const documentBuild = new DocumentBuilder()
    .setTitle(docName)
    .setDescription(docDesc)
    .setVersion(docVersion)
    .addSecurity(securityName, {
      type: 'apiKey',
      in: 'header',
      name: AUTH.STRATEGY,
    })
    .addSecurityRequirements(securityName)
    .build();

  app.use(
    ['/docs', '/docs-json', '/docs-yaml'],
    basicAuth({
      challenge: true,
      users: {
        [configService.get<string>('SWAGGER_USER')]: configService.get<string>('SWAGGER_PASSWORD'),
      },
    }),
  );

  const options = {
    jsonDocumentUrl: 'openapi/json',
    explorer: true,
    customSiteTitle: docName,
  };

  const document = SwaggerModule.createDocument(app, documentBuild);
  SwaggerModule.setup(docPrefix, app, document, options);

  logger.log(`==========================================================`);
  logger.log(`Docs will serve on ${docPrefix}`, 'MainDocs');
  logger.log(`==========================================================`);
};
