import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ORDNANCE_SURVEY_CONFIG_KEY, OrdnanceSurveyConfigType } from '@ukef/config/ordnance-survey.config';
import { HttpModule } from '@ukef/modules/http/http.module';

import { OrdnanceSurveyService } from './ordnance-survey.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { baseUrl: baseURL, maxRedirects, timeout } = configService.get<OrdnanceSurveyConfigType>(ORDNANCE_SURVEY_CONFIG_KEY);
        return {
          baseURL,
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
