import { InvalidConfigException } from '@ukef/config/invalid-config.exception';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

interface Options<ConfigUnderTest> {
  configDirectlyFromEnvironmentVariables?: {
    configPropertyName: keyof ConfigUnderTest;
    environmentVariableName: string;
  }[];
  configParsedBooleanFromEnvironmentVariablesWithDefault?: {
    configPropertyName: keyof ConfigUnderTest;
    environmentVariableName: string;
    defaultConfigValue: boolean;
  }[];
  configParsedAsIntFromEnvironmentVariablesWithDefault?: {
    configPropertyName: keyof ConfigUnderTest;
    environmentVariableName: string;
    defaultConfigValue: number;
  }[];
  getConfig: () => ConfigUnderTest;
}

export const withEnvironmentVariableParsingUnitTests = <ConfigUnderTest>({
  configDirectlyFromEnvironmentVariables,
  configParsedBooleanFromEnvironmentVariablesWithDefault,
  configParsedAsIntFromEnvironmentVariablesWithDefault,
  getConfig,
}: Options<ConfigUnderTest>): void => {
  const valueGenerator = new RandomValueGenerator();

  let originalProcessEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalProcessEnv = process.env;
  });

  afterEach(() => {
    process.env = originalProcessEnv;
  });

  if (configDirectlyFromEnvironmentVariables) {
    describe.each(configDirectlyFromEnvironmentVariables)('$configPropertyName', ({ configPropertyName, environmentVariableName }) => {
      it(`is the env variable ${environmentVariableName}`, () => {
        const environmentVariableValue = valueGenerator.string();
        process.env = {
          [environmentVariableName]: environmentVariableValue,
        };

        const { [configPropertyName]: configPropertyValue } = getConfig();

        expect(configPropertyValue).toBe(environmentVariableValue);
      });
    });
  }

  if (configParsedBooleanFromEnvironmentVariablesWithDefault) {
    describe.each(configParsedBooleanFromEnvironmentVariablesWithDefault)(
      '$configPropertyName',
      ({ configPropertyName, environmentVariableName, defaultConfigValue }) => {
        it(`is true if environment variable ${environmentVariableName} is true`, () => {
          const expectedConfigValue = true;
          const environmentVariableValue = expectedConfigValue.toString();
          process.env = {
            [environmentVariableName]: environmentVariableValue,
          };

          const { [configPropertyName]: configPropertyValue } = getConfig();

          expect(configPropertyValue).toBe(expectedConfigValue);
        });

        it(`is false if environment variable ${environmentVariableName} is false`, () => {
          const expectedConfigValue = false;
          const environmentVariableValue = expectedConfigValue.toString();
          process.env = {
            [environmentVariableName]: environmentVariableValue,
          };

          const { [configPropertyName]: configPropertyValue } = getConfig();

          expect(configPropertyValue).toBe(expectedConfigValue);
        });

        it(`is the default value if ${environmentVariableName} is any string other than true or false`, () => {
          process.env = {
            [environmentVariableName]: valueGenerator.string(),
          };

          const { [configPropertyName]: configPropertyValue } = getConfig();

          expect(configPropertyValue).toBe(defaultConfigValue);
        });

        it(`is the default value if ${environmentVariableName} is not specified`, () => {
          process.env = {};

          const { [configPropertyName]: configPropertyValue } = getConfig();

          expect(configPropertyValue).toBe(defaultConfigValue);
        });

        it(`is the default value if ${environmentVariableName} is empty string`, () => {
          process.env = {
            [environmentVariableName]: '',
          };

          const { [configPropertyName]: configPropertyValue } = getConfig();

          expect(configPropertyValue).toBe(defaultConfigValue);
        });
      },
    );
  }

  describe.each(configParsedAsIntFromEnvironmentVariablesWithDefault)(
    '$configPropertyName',
    ({ configPropertyName, environmentVariableName, defaultConfigValue }) => {
      it(`is the env variable ${environmentVariableName} parsed as a number if ${environmentVariableName} is specified`, () => {
        const expectedConfigValue = valueGenerator.nonnegativeInteger();
        const environmentVariableValue = expectedConfigValue.toString();
        process.env = {
          [environmentVariableName]: environmentVariableValue,
        };

        const { [configPropertyName]: configPropertyValue } = getConfig();

        expect(configPropertyValue).toBe(expectedConfigValue);
      });

      it(`is the default value ${defaultConfigValue} if ${environmentVariableName} is not specified`, () => {
        process.env = {};

        const { [configPropertyName]: configPropertyValue } = getConfig();

        expect(configPropertyValue).toBe(defaultConfigValue);
      });

      it(`throws InvalidConfigException if ${environmentVariableName} is not parseable as an integer`, () => {
        const environmentVariableValue = 'abc';
        process.env = {
          [environmentVariableName]: environmentVariableValue,
        };

        const gettingTheConfig = () => getConfig();

        expect(gettingTheConfig).toThrow(InvalidConfigException);
        expect(gettingTheConfig).toThrow(`Invalid integer value "${environmentVariableValue}" for configuration property.`);
      });

      it(`throws InvalidConfigException if ${environmentVariableName} is float number`, () => {
        const environmentVariableValue = valueGenerator.nonnegativeFloat().toString();
        process.env = {
          [environmentVariableName]: environmentVariableValue,
        };

        const gettingTheConfig = () => getConfig();

        expect(gettingTheConfig).toThrow(InvalidConfigException);
        expect(gettingTheConfig).toThrow(`Invalid integer value "${environmentVariableValue}" for configuration property.`);
      });

      it(`throws InvalidConfigException if ${environmentVariableName} is hex number`, () => {
        const environmentVariableValue = '0xFF';
        process.env = {
          [environmentVariableName]: environmentVariableValue,
        };

        const gettingTheConfig = () => getConfig();

        expect(gettingTheConfig).toThrow(InvalidConfigException);
        expect(gettingTheConfig).toThrow(`Invalid integer value "${environmentVariableValue}" for configuration property.`);
      });

      it(`throws InvalidConfigException if ${environmentVariableName} is binary number`, () => {
        const environmentVariableValue = '0b101';
        process.env = {
          [environmentVariableName]: environmentVariableValue,
        };

        const gettingTheConfig = () => getConfig();

        expect(gettingTheConfig).toThrow(InvalidConfigException);
        expect(gettingTheConfig).toThrow(`Invalid integer value "${environmentVariableValue}" for configuration property.`);
      });
    },
  );
};
