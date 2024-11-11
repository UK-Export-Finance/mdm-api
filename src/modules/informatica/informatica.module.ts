import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InformaticaConfig, KEY as INFORMATICA_CONFIG_KEY } from '@ukef/config/informatica.config';
import { HttpModule } from '@ukef/modules/http/http.module';

import { InformaticaService } from './informatica.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { baseUrl, username, password, maxRedirects, timeout } = configService.get<InformaticaConfig>(INFORMATICA_CONFIG_KEY);
        return {
          baseURL: baseUrl,
          maxRedirects,
          timeout,
          auth: {
            username,
            password,
          },
          // TODO: APIM-471 - cleanup rejectUnauthorized when Informatica SSL issue is resolved
          // "rejectUnauthorized: false" is just for local DEV laptop environment, not for DEV/PROD.
          // to ignore https issues, enable agent and rejectUnauthorized:false below.
          // import https from 'https';
          // import crypto from 'crypto';
          // httpsAgent: new https.Agent({
          //   // Allow self signed negotiations
          //   rejectUnauthorized: false,

          //   // Allow legacy server
          //   secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
          // }),
        };
      },
    }),
  ],
  providers: [InformaticaService],
  exports: [InformaticaService],
})
export class InformaticaModule {}
