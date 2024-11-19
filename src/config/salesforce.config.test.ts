import { withEnvironmentVariableParsingUnitTests } from '@ukef-test/common-tests/environment-variable-parsing-unit-tests';

import salesforceConfig, { SalesforceConfig } from './salesforce.config';

describe('salesforceConfig', () => {
  const configDirectlyFromEnvironmentVariables: { configPropertyName: keyof SalesforceConfig; environmentVariableName: string }[] = [
    {
      configPropertyName: 'baseUrl',
      environmentVariableName: 'SALESFORCE_INSTANCE_URL',
    },
    {
      configPropertyName: 'clientId',
      environmentVariableName: 'SALESFORCE_CLIENT_ID',
    },

    {
      configPropertyName: 'clientSecret',
      environmentVariableName: 'SALESFORCE_CLIENT_SECRET',
    },
    {
      configPropertyName: 'username',
      environmentVariableName: 'SALESFORCE_USERNAME',
    },
    {
      configPropertyName: 'password',
      environmentVariableName: 'SALESFORCE_PASSWORD',
    },
    {
      configPropertyName: 'accessUrl',
      environmentVariableName: 'SALESFORCE_ACCESS_URL',
    },
  ];

  const configParsedAsIntFromEnvironmentVariablesWithDefault: {
    configPropertyName: keyof SalesforceConfig;
    environmentVariableName: string;
    defaultConfigValue: number;
  }[] = [
      {
        configPropertyName: 'maxRedirects',
        environmentVariableName: 'SALESFORCE_MAX_REDIRECTS',
        defaultConfigValue: 5,
      },
      {
        configPropertyName: 'timeout',
        environmentVariableName: 'SALESFORCE_TIMEOUT',
        defaultConfigValue: 30000, // in milliseconds
      },
    ];

  withEnvironmentVariableParsingUnitTests({
    configDirectlyFromEnvironmentVariables,
    configParsedAsIntFromEnvironmentVariablesWithDefault,
    getConfig: () => salesforceConfig(),
  });
});
