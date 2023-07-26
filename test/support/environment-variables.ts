import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

const valueGenerator = new RandomValueGenerator();

export const ENVIRONMENT_VARIABLES = Object.freeze({
  NODE_ENV: 'test',
  LOG_LEVEL: 'debug',
  REDACT_LOGS: false,
  SINGLE_LINE_LOG_FORMAT: true,

  SWAGGER_USER: valueGenerator.string(),
  SWAGGER_PASSWORD: valueGenerator.string(),

  APIM_INFORMATICA_URL: valueGenerator.httpsUrl(),
  APIM_INFORMATICA_USERNAME: valueGenerator.word(),
  APIM_INFORMATICA_PASSWORD: valueGenerator.word(),
  APIM_INFORMATICA_MAX_REDIRECTS: 0,
  APIM_INFORMATICA_TIMEOUT: 1000,

  API_KEY: valueGenerator.string(),
});

export const getEnvironmentVariablesForProcessEnv = (): NodeJS.ProcessEnv => ({
  ...ENVIRONMENT_VARIABLES,
  REDACT_LOGS: ENVIRONMENT_VARIABLES.REDACT_LOGS.toString(),
  SINGLE_LINE_LOG_FORMAT: ENVIRONMENT_VARIABLES.SINGLE_LINE_LOG_FORMAT.toString(),
  APIM_INFORMATICA_MAX_REDIRECTS: ENVIRONMENT_VARIABLES.APIM_INFORMATICA_MAX_REDIRECTS.toString(),
  APIM_INFORMATICA_TIMEOUT: ENVIRONMENT_VARIABLES.APIM_INFORMATICA_TIMEOUT.toString(),
});

export const TIME_EXCEEDING_INFORMATICA_TIMEOUT = ENVIRONMENT_VARIABLES.APIM_INFORMATICA_TIMEOUT + 500;
