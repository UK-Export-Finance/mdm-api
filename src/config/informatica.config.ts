import { registerAs } from '@nestjs/config';
import { getIntConfig } from '@ukef/helpers/get-int-config';

export const KEY = 'informatica';

export interface InformaticaConfig {
  baseUrl: string;
  username: string;
  password: string;
  maxRedirects: number;
  timeout: number;
}

export default registerAs(
  KEY,
  (): InformaticaConfig => ({
    baseUrl: process.env.APIM_INFORMATICA_URL,
    username: process.env.APIM_INFORMATICA_USERNAME,
    password: process.env.APIM_INFORMATICA_PASSWORD,
    maxRedirects: getIntConfig(process.env.APIM_INFORMATICA_MAX_REDIRECTS, 5),
    timeout: getIntConfig(process.env.APIM_INFORMATICA_TIMEOUT, 30000),
  }),
);
