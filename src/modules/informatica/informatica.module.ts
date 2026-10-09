import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InformaticaConfigType, INFORMATICA_KEY } from '@ukef/config/informatica.config';
import { HttpModule } from '@ukef/modules/http/http.module';

import { InformaticaService } from './informatica.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { baseUrl, username, password, maxRedirects, timeout } = configService.get<InformaticaConfigType>(INFORMATICA_KEY);
        return {
          baseURL: baseUrl,
          maxRedirects,
          timeout,
          auth: {
            username,
            password,
          },
        };
      },
    }),
  ],
  providers: [InformaticaService],
  exports: [InformaticaService],
})
export class InformaticaModule {}
