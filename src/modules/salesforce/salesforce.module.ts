import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KEY as SALESFORCE_CONFIG_KEY, SalesforceConfig } from '@ukef/config/salesforce.config';
import { HttpModule } from '@ukef/modules/http/http.module';
import { isDevelopment } from '@ukef/helpers/https-agent.helper';

import { SalesforceService } from './salesforce.service';
import https from 'https';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { baseUrl, clientId, clientSecret, username, password, accessUrl, maxRedirects, timeout } =
          configService.get<SalesforceConfig>(SALESFORCE_CONFIG_KEY);
        return {
          baseURL: baseUrl,
          clientId,
          clientSecret,
          username,
          password,
          accessURL: accessUrl,
          maxRedirects,
          timeout,
          // TODO: cleanup rejectUnauthorized when Salesforce SSL issue is resolved
          // "rejectUnauthorized: false" is just for local DEV laptop environment, not for DEV/PROD.
          // There's a helpdesk ticket pending to whitelist this domain
          httpsAgent: new https.Agent({
            // Allow self signed negotiations
            rejectUnauthorized: !isDevelopment(),
          }),
        };
      },
    }),
  ],
  providers: [SalesforceService],
  exports: [SalesforceService],
})
export class SalesforceModule {}
