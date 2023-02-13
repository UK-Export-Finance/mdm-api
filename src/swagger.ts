import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { SwaggerTheme } from 'swagger-themes';

export const SwaggerDocs = (app: NestApplication) => {
  const configService = app.get(ConfigService);
  const logger = new Logger();
  const theme = new SwaggerTheme('v3');

  const docName: string = configService.get<string>('doc.name');
  const docDesc: string = configService.get<string>('doc.description');
  const docVersion: string = configService.get<string>('doc.version');
  const docPrefix: string = configService.get<string>('doc.prefix');

  const documentBuild = new DocumentBuilder().setTitle(docName).setDescription(docDesc).setVersion(docVersion).build();

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
    explorer: true,
    customCss: theme.getBuffer('dark'),
    customSiteTitle: docName,
  };

  const document = SwaggerModule.createDocument(app, documentBuild);
  SwaggerModule.setup(docPrefix, app, document, options);

  logger.log(`==========================================================`);
  logger.log(`Docs will serve on ${docPrefix}`, 'MainDocs');
  logger.log(`==========================================================`);
};
