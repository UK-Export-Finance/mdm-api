import { APPLICATION } from '@ukef/constants';
import { withEnvironmentVariableParsingUnitTests } from '@ukef-test/common-tests/environment-variable-parsing-unit-tests';

import appConfig, { AppConfig } from './app.config';
import { InvalidConfigException } from './invalid-config.exception';

const { VERSION_PREFIX } = APPLICATION;

describe('appConfig', () => {
  let originalProcessEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalProcessEnv = process.env;
  });

  afterEach(() => {
    process.env = originalProcessEnv;
  });

  describe('logLevel', () => {
    describe('when LOG_LEVEL is specified, but is not a valid log level', () => {
      it('should throw an InvalidConfigException', () => {
        replaceEnvironmentVariables({
          LOG_LEVEL: 'not-a-real-log-level',
        });

        const gettingTheAppConfig = () => appConfig();

        expect(gettingTheAppConfig).toThrow(InvalidConfigException);

        expect(gettingTheAppConfig).toThrow(`LOG_LEVEL must be one of fatal,error,warn,info,debug,trace,silent or not specified.`);
      });
    });

    describe('when LOG_LEVEL is not specified', () => {
      it('should return `logLevel` as `info`', () => {
        replaceEnvironmentVariables({
          LOG_LEVEL: undefined,
        });

        const config = appConfig();

        expect(config.logLevel).toBe('info');
      });
    });

    describe('when LOG_LEVEL is empty', () => {
      it('should return `logLevel` as `info`', () => {
        replaceEnvironmentVariables({
          LOG_LEVEL: '',
        });

        const config = appConfig();

        expect(config.logLevel).toBe('info');
      });
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

  describe('versioning', () => {
    it('should return an object with default properties', () => {
      const mockHttpVersion = undefined;

      replaceEnvironmentVariables({
        HTTP_VERSIONING_ENABLE: undefined,
        HTTP_VERSION: mockHttpVersion,
      });

      const config = appConfig();

      const expected = {
        enable: false,
        prefix: VERSION_PREFIX,
        prefixAndVersion: `${VERSION_PREFIX}1`,
        version: '1',
      };

      expect(config.versioning).toEqual(expected);
    });

    describe('when HTTP_VERSIONING_ENABLE is specified', () => {
      it('should return `enable` as true', () => {
        replaceEnvironmentVariables({
          HTTP_VERSIONING_ENABLE: 'true',
        });

        const config = appConfig();

        expect(config.versioning.enable).toBe(true);
      });
    });

    describe('when HTTP_VERSION is specified', () => {
      const mockHttpVersion = '100200';

      it('should return `version` with the provided HTTP_VERSION', () => {
        replaceEnvironmentVariables({
          HTTP_VERSION: mockHttpVersion,
        });

        const config = appConfig();

        expect(config.versioning.version).toBe(mockHttpVersion);
      });

      it('should return `prefixAndVersion` with the provided HTTP_VERSION', () => {
        replaceEnvironmentVariables({
          HTTP_VERSION: mockHttpVersion,
        });

        const config = appConfig();

        const expected = `${VERSION_PREFIX}${mockHttpVersion}`;

        expect(config.versioning.prefixAndVersion).toBe(expected);
      });
    });
  });

  describe('odsVersioning', () => {
    it('should return an object', () => {
      const mockHttpVersion = '100200';

      replaceEnvironmentVariables({
        ODS_HTTP_VERSION: mockHttpVersion,
      });

      const config = appConfig();

      const expected = {
        enable: false,
        prefix: VERSION_PREFIX,
        prefixAndVersion: `${VERSION_PREFIX}${mockHttpVersion}`,
        version: mockHttpVersion,
      };

      expect(config.odsVersioning).toEqual(expected);
    });
  });

  const replaceEnvironmentVariables = (newEnvVariables: Record<string, string>): void => {
    process.env = newEnvVariables;
  };

  const configParsedBooleanFromEnvironmentVariablesWithDefault: {
    configPropertyName: keyof AppConfig;
    environmentVariableName: string;
    defaultConfigValue: boolean;
  }[] = [
    {
      configPropertyName: 'singleLineLogFormat',
      environmentVariableName: 'SINGLE_LINE_LOG_FORMAT',
      defaultConfigValue: true,
    },
    {
      configPropertyName: 'redactLogs',
      environmentVariableName: 'REDACT_LOGS',
      defaultConfigValue: true,
    },
  ];

  const configParsedAsIntFromEnvironmentVariablesWithDefault: {
    configPropertyName: keyof AppConfig;
    environmentVariableName: string;
    defaultConfigValue: number;
  }[] = [
    {
      configPropertyName: 'port',
      environmentVariableName: 'HTTP_PORT',
      defaultConfigValue: 3003,
    },
  ];

  withEnvironmentVariableParsingUnitTests({
    configParsedBooleanFromEnvironmentVariablesWithDefault,
    configParsedAsIntFromEnvironmentVariablesWithDefault,
    getConfig: () => appConfig(),
  });
});
