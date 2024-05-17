import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompaniesHouseConfig } from '@ukef/config/companies-house.config';
import { HttpModule } from '@ukef/modules/http/http.module';
import { CompaniesHouseService } from './companies-house.service';
import { COMPANIES_HOUSE } from '@ukef/constants';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { baseUrl, maxRedirects, timeout } = configService.get<CompaniesHouseConfig>(COMPANIES_HOUSE.CONFIG.KEY);
        return {
          baseURL: baseUrl,
          maxRedirects,
          timeout,
        };
      },
    }),
  ],
  providers: [CompaniesHouseService],
  exports: [CompaniesHouseService],
})
export class CompaniesHouseModule {}
