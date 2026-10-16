import { withEnvironmentVariableParsingUnitTests } from '@ukef-test/common-tests/environment-variable-parsing-unit-tests';

import { CompaniesHouseConfig, CompaniesHouseConfigType } from './companies-house.config';

describe('companiesHouseConfig', () => {
  const configDirectlyFromEnvironmentVariables: { configPropertyName: keyof CompaniesHouseConfigType; environmentVariableName: string }[] = [
    {
      configPropertyName: 'baseUrl',
      environmentVariableName: 'COMPANIES_HOUSE_URL',
    },
    {
      configPropertyName: 'key',
      environmentVariableName: 'COMPANIES_HOUSE_KEY',
    },
  ];

  const configParsedAsIntFromEnvironmentVariablesWithDefault: {
    configPropertyName: keyof CompaniesHouseConfigType;
    environmentVariableName: string;
    defaultConfigValue: number;
  }[] = [
    {
      configPropertyName: 'maxRedirects',
      environmentVariableName: 'COMPANIES_HOUSE_MAX_REDIRECTS',
      defaultConfigValue: 5,
    },
    {
      configPropertyName: 'timeout',
      environmentVariableName: 'COMPANIES_HOUSE_TIMEOUT',
      defaultConfigValue: 30000,
    },
  ];

  withEnvironmentVariableParsingUnitTests({
    configDirectlyFromEnvironmentVariables,
    configParsedAsIntFromEnvironmentVariablesWithDefault,
    getConfig: () => CompaniesHouseConfig(),
  });
});
