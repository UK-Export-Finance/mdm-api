import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import appConfig from './app.config';
import { InvalidConfigException } from './invalid-config.exception';

describe('appConfig', () => {
  const valueGenerator = new RandomValueGenerator();

  let originalProcessEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalProcessEnv = process.env;
  });

  afterEach(() => {
    process.env = originalProcessEnv;
  });

  describe('parsing LOG_LEVEL', () => {
    it('throws an InvalidConfigException if LOG_LEVEL is specified but is not a valid log level', () => {
      replaceEnvironmentVariables({
        LOG_LEVEL: 'not-a-real-log-level',
      });

      const gettingTheAppConfig = () => appConfig();

      expect(gettingTheAppConfig).toThrow(InvalidConfigException);
      expect(gettingTheAppConfig).toThrow(`LOG_LEVEL must be one of fatal,error,warn,info,debug,trace,silent or not specified.`);
    });

    it('uses info as the logLevel if LOG_LEVEL is not specified', () => {
      replaceEnvironmentVariables({});

      const config = appConfig();

      expect(config.logLevel).toBe('info');
    });

    it('uses info as the logLevel if LOG_LEVEL is empty', () => {
      replaceEnvironmentVariables({
        LOG_LEVEL: '',
      });

      const config = appConfig();

      expect(config.logLevel).toBe('info');
    });

    it.each([
      {
        LOG_LEVEL: 'fatal',
      },
      {
        LOG_LEVEL: 'error',
      },
      {
        LOG_LEVEL: 'warn',
      },
      {
        LOG_LEVEL: 'info',
      },
      {
        LOG_LEVEL: 'debug',
      },
      {
        LOG_LEVEL: 'trace',
      },
      {
        LOG_LEVEL: 'silent',
      },
    ])('uses LOG_LEVEL as the logLevel if LOG_LEVEL is valid ($LOG_LEVEL)', ({ LOG_LEVEL }) => {
      replaceEnvironmentVariables({
        LOG_LEVEL,
      });

      const config = appConfig();

      expect(config.logLevel).toBe(LOG_LEVEL);
    });
  });

  describe('parsing REDACT_LOGS', () => {
    it('sets redactLogs to true if REDACT_LOGS is true', () => {
      replaceEnvironmentVariables({
        REDACT_LOGS: 'true',
      });

      const config = appConfig();

      expect(config.redactLogs).toBe(true);
    });

    it('sets redactLogs to false if REDACT_LOGS is false', () => {
      replaceEnvironmentVariables({
        REDACT_LOGS: 'false',
      });

      const config = appConfig();

      expect(config.redactLogs).toBe(false);
    });

    it('sets redactLogs to true if REDACT_LOGS is not specified', () => {
      replaceEnvironmentVariables({});

      const config = appConfig();

      expect(config.redactLogs).toBe(true);
    });

    it('sets redactLogs to true if REDACT_LOGS is the empty string', () => {
      replaceEnvironmentVariables({
        REDACT_LOGS: '',
      });

      const config = appConfig();

      expect(config.redactLogs).toBe(true);
    });

    it('sets redactLogs to true if REDACT_LOGS is any string other than true or false', () => {
      replaceEnvironmentVariables({
        REDACT_LOGS: valueGenerator.string(),
      });

      const config = appConfig();

      expect(config.redactLogs).toBe(true);
    });
  });

  describe('parsing SINGLE_LINE_LOG_FORMAT', () => {
    it('sets singleLineLogFormat to true if SINGLE_LINE_LOG_FORMAT is true', () => {
      replaceEnvironmentVariables({
        SINGLE_LINE_LOG_FORMAT: 'true',
      });

      const config = appConfig();

      expect(config.singleLineLogFormat).toBe(true);
    });

    it('sets singleLineLogFormat to false if SINGLE_LINE_LOG_FORMAT is false', () => {
      replaceEnvironmentVariables({
        SINGLE_LINE_LOG_FORMAT: 'false',
      });

      const config = appConfig();

      expect(config.singleLineLogFormat).toBe(false);
    });

    it('sets singleLineLogFormat to true if SINGLE_LINE_LOG_FORMAT is not specified', () => {
      replaceEnvironmentVariables({});

      const config = appConfig();

      expect(config.singleLineLogFormat).toBe(true);
    });

    it('sets singleLineLogFormat to true if SINGLE_LINE_LOG_FORMAT is the empty string', () => {
      replaceEnvironmentVariables({
        SINGLE_LINE_LOG_FORMAT: '',
      });

      const config = appConfig();

      expect(config.singleLineLogFormat).toBe(true);
    });

    it('sets singleLineLogFormat to true if SINGLE_LINE_LOG_FORMAT is any string other than true or false', () => {
      replaceEnvironmentVariables({
        SINGLE_LINE_LOG_FORMAT: valueGenerator.string(),
      });

      const config = appConfig();

      expect(config.singleLineLogFormat).toBe(true);
    });
  });

  const replaceEnvironmentVariables = (newEnvVariables: Record<string, string>): void => {
    process.env = newEnvVariables;
  };
});
