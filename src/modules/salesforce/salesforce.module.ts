import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SALESFORCE_CONFIG_KEY, SalesforceConfigType } from '@ukef/config/salesforce.config';
import { HttpModule } from '@ukef/modules/http/http.module';

import { SalesforceService } from './salesforce.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { baseUrl, clientId, clientSecret, username, password, accessUrl, maxRedirects, timeout } =
          configService.get<SalesforceConfigType>(SALESFORCE_CONFIG_KEY);
        return {
          baseURL: baseUrl,
          clientId,
          clientSecret,
          username,
          password,
          accessURL: accessUrl,
          maxRedirects,
          timeout,
        };
      },
    }),
  ],
  providers: [SalesforceService],
  exports: [SalesforceService],
})
export class SalesforceModule {}
