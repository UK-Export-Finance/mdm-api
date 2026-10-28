import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { AUTH } from '@ukef/constants';

export const SwaggerDocs = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const logger = new Logger();

  const docName: string = configService.getOrThrow<string>('doc.name');
  const docDesc: string = configService.getOrThrow<string>('doc.description');
  const docVersion: string = configService.getOrThrow<string>('doc.version');
  const docPrefix: string = configService.getOrThrow<string>('doc.prefix');

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
    ['/docs'],
    basicAuth({
      challenge: true,
      users: {
        [configService.getOrThrow<string>('SWAGGER_USER')]: configService.getOrThrow<string>('SWAGGER_PASSWORD'),
      },
    }),
  );

  const options = {
    jsonDocumentUrl: 'openapi/json',
    yamlDocumentUrl: 'openapi/yaml',
    explorer: true,
    customSiteTitle: docName,
  };

  const document = SwaggerModule.createDocument(app, documentBuild);
  SwaggerModule.setup(docPrefix, app, document, options);

  logger.log(`==========================================================`);
  logger.log(`Docs will serve on ${docPrefix}`, 'MainDocs');
  logger.log(`==========================================================`);
};
