import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdnanceSurveyConfig, KEY as ORDNANCE_SURVEY_CONFIG_KEY } from '@ukef/config/ordnance-survey.config';
import { HttpModule } from '@ukef/modules/http/http.module';

import { OrdnanceSurveyService } from './ordnance-survey.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { baseUrl, maxRedirects, timeout } = configService.get<OrdnanceSurveyConfig>(ORDNANCE_SURVEY_CONFIG_KEY);
        return {
          baseURL: baseUrl,
          maxRedirects,
          timeout,
        };
      },
    }),
  ],
  providers: [OrdnanceSurveyService],
  exports: [OrdnanceSurveyService],
})
export class OrdnanceSurveyModule {}
