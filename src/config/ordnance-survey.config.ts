import { registerAs } from '@nestjs/config';
import { getIntConfig } from '@ukef/helpers/get-int-config';

export const KEY = 'ordnanceSurvey';

export interface OrdnanceSurveyConfig {
  baseUrl: string;
  key: string;
  maxRedirects: number;
  timeout: number;
}

export default registerAs(
  KEY,
  (): OrdnanceSurveyConfig => ({
    baseUrl: process.env.ORDNANCE_SURVEY_URL,
    key: process.env.ORDNANCE_SURVEY_KEY,
    maxRedirects: getIntConfig(process.env.ORDNANCE_SURVEY_MAX_REDIRECTS, 5),
    timeout: getIntConfig(process.env.ORDNANCE_SURVEY_TIMEOUT, 30000),
  }),
);
