import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DunAndBradstreetConfig } from '@ukef/config/dun-and-bradstreet.config';
import { DUN_AND_BRADSTREET } from '@ukef/constants';
import { HttpModule } from '@ukef/modules/http/http.module';

import { DunAndBradstreetService } from './dun-and-bradstreet.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { baseUrl, maxRedirects, timeout } = configService.get<DunAndBradstreetConfig>(DUN_AND_BRADSTREET.CONFIG.KEY);
        return {
          baseURL: baseUrl,
          maxRedirects,
          timeout,
        };
      },
    }),
  ],
  providers: [DunAndBradstreetService],
  exports: [DunAndBradstreetService],
})
export class DunAndBradstreetModule {}
