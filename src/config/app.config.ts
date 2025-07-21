import { registerAs } from '@nestjs/config';
import { APPLICATION } from '@ukef/constants';
import { getIntConfig } from '@ukef/helpers/get-int-config';

import { InvalidConfigException } from './invalid-config.exception';

const { NODE_ENV } = process.env;

const { NAME, VERSION_PREFIX } = APPLICATION;

const validLogLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'];

export interface AppConfig {
  apiKey: string;
  env: string;
  name: string;
  globalPrefix: string;
  logLevel: string;
  port: number;
  redactLogs: boolean;
  singleLineLogFormat: boolean;
  versioning: {
    enable: boolean;
    prefix: string;
    version: string;
  };
}

export default registerAs('app', (): Record<string, any> => {
  const logLevel = process.env.LOG_LEVEL || 'info';

  if (!validLogLevels.includes(logLevel)) {
    throw new InvalidConfigException(`LOG_LEVEL must be one of ${validLogLevels} or not specified.`);
  }

  const mdmVersioning = {
    enable: process.env.HTTP_VERSIONING_ENABLE === 'true',
    prefix: VERSION_PREFIX,
    version: process.env.HTTP_VERSION || '1',
  };

  return {
    apiKey: process.env.API_KEY,
    env: NODE_ENV || 'development',
    globalPrefix: '/api',
    logLevel: process.env.LOG_LEVEL || 'info',
    name: NAME,
    port: getIntConfig(process.env.HTTP_PORT, 3003),
    redactLogs: process.env.REDACT_LOGS !== 'false',
    singleLineLogFormat: process.env.SINGLE_LINE_LOG_FORMAT !== 'false',
    usePinoPrettyLogFormatter: process.env.USE_PINO_PRETTY_LOG_FORMATER === 'true',
    versioning: mdmVersioning,
  };
});
