import { registerAs } from '@nestjs/config';
import { getIntConfig } from '@ukef/helpers/get-int-config';

const KEY = 'ordnanceSurvey';

export { KEY as ORDNANCE_SURVEY_CONFIG_KEY };

export type OrdnanceSurveyConfigType = {
  baseUrl: string;
  key: string;
  maxRedirects: number;
  timeout: number;
};

export const OrdnanceSurveyConfig = registerAs(KEY, (): OrdnanceSurveyConfigType => ({
  baseUrl: process.env.ORDNANCE_SURVEY_URL,
  key: process.env.ORDNANCE_SURVEY_KEY,
  maxRedirects: getIntConfig(process.env.ORDNANCE_SURVEY_MAX_REDIRECTS, 5),
  timeout: getIntConfig(process.env.ORDNANCE_SURVEY_TIMEOUT, 30000), // in milliseconds
}));
