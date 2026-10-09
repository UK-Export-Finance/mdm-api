import { registerAs } from '@nestjs/config';
import { DUN_AND_BRADSTREET } from '@ukef/constants';
import { getIntConfig } from '@ukef/helpers/get-int-config';

export type DunAndBradstreetConfigType = {
  baseUrl: string;
  key: string;
  maxRedirects: number;
  timeout: number;
};

export const DunAndBradstreetConfig = registerAs(
  DUN_AND_BRADSTREET.CONFIG.KEY,
  (): DunAndBradstreetConfigType => ({
    baseUrl: process.env.DUN_AND_BRADSTREET_URL,
    key: process.env.DUN_AND_BRADSTREET_KEY,
    maxRedirects: getIntConfig(process.env.DUN_AND_BRADSTREET_MAX_REDIRECTS, 5),
    timeout: getIntConfig(process.env.DUN_AND_BRADSTREET_TIMEOUT, 30000),
  }),
);
