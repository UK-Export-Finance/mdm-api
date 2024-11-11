import https from 'https';
import crypto from 'crypto';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SalesforceConfig, KEY as SALESFORCE_CONFIG_KEY } from '@ukef/config/salesforce.config';
import { HttpModule } from '@ukef/modules/http/http.module';

import { SalesforceService } from './salesforce.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { baseUrl, clientId, clientSecret, username, password, accessUrl, maxRedirects, timeout } = configService.get<SalesforceConfig>(SALESFORCE_CONFIG_KEY);
        return {
          baseURL: baseUrl,
          clientId,
          clientSecret,
          username,
          password,
          accessURL: accessUrl,
          maxRedirects,
          timeout,
          // TODO: APIM-471 - cleanup rejectUnauthorized when Informatica SSL issue is resolved
          // "rejectUnauthorized: false" is just for local DEV laptop environment, not for DEV/PROD.
          // to ignore https issues, enable agent and rejectUnauthorized:false bellow.
          httpsAgent: new https.Agent({
            // Allow self signed negotiations
            // rejectUnauthorized: false,
          }),
        };
      },
    }),
  ],
  providers: [SalesforceService],
  exports: [SalesforceService],
})
export class SalesforceModule {}
