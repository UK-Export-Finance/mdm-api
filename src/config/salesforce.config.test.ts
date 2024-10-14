import { withEnvironmentVariableParsingUnitTests } from '@ukef-test/common-tests/environment-variable-parsing-unit-tests';

import salesforceConfig, { SalesforceConfig } from './salesforce.config';

describe('salesforceConfig', () => {
  const configDirectlyFromEnvironmentVariables: { configPropertyName: keyof SalesforceConfig; environmentVariableName: string }[] = [
    {
      configPropertyName: 'baseUrl',
      environmentVariableName: 'SF_INSTANCE_URL',
    },
    {
      configPropertyName: 'clientId',
      environmentVariableName: 'SF_CLIENT_ID',
    },

    {
      configPropertyName: 'clientSecret',
      environmentVariableName: 'SF_CLIENT_SECRET',
    },
    {
      configPropertyName: 'username',
      environmentVariableName: 'SF_USERNAME',
    },
    {
      configPropertyName: 'password',
      environmentVariableName: 'SF_PASSWORD',
    },
    {
      configPropertyName: 'accessUrl',
      environmentVariableName: 'SF_ACCESS_URL',
    },
  ];

  const configParsedAsIntFromEnvironmentVariablesWithDefault: {
    configPropertyName: keyof SalesforceConfig;
    environmentVariableName: string;
    defaultConfigValue: number;
  }[] = [
    {
      configPropertyName: 'maxRedirects',
      environmentVariableName: 'SF_MAX_REDIRECTS',
      defaultConfigValue: 5,
    },
    {
      configPropertyName: 'timeout',
      environmentVariableName: 'SF_TIMEOUT',
      defaultConfigValue: 30000, // in milliseconds
    },
  ];

  withEnvironmentVariableParsingUnitTests({
    configDirectlyFromEnvironmentVariables,
    configParsedAsIntFromEnvironmentVariablesWithDefault,
    getConfig: () => salesforceConfig(),
  });
});
