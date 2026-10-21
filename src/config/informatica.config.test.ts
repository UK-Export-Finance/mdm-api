import { withEnvironmentVariableParsingUnitTests } from '@ukef-test/common-tests/environment-variable-parsing-unit-tests';

import { InformaticaConfig, InformaticaConfigType } from './informatica.config';

describe('informaticaConfig', () => {
  const configDirectlyFromEnvironmentVariables: { configPropertyName: keyof InformaticaConfigType; environmentVariableName: string }[] = [
    {
      configPropertyName: 'baseUrl',
      environmentVariableName: 'APIM_INFORMATICA_URL',
    },
    {
      configPropertyName: 'username',
      environmentVariableName: 'APIM_INFORMATICA_USERNAME',
    },
    {
      configPropertyName: 'password',
      environmentVariableName: 'APIM_INFORMATICA_PASSWORD',
    },
  ];

  const configParsedAsIntFromEnvironmentVariablesWithDefault: {
    configPropertyName: keyof InformaticaConfigType;
    environmentVariableName: string;
    defaultConfigValue: number;
  }[] = [
    {
      configPropertyName: 'maxRedirects',
      environmentVariableName: 'APIM_INFORMATICA_MAX_REDIRECTS',
      defaultConfigValue: 5,
    },
    {
      configPropertyName: 'timeout',
      environmentVariableName: 'APIM_INFORMATICA_TIMEOUT',
      defaultConfigValue: 30000, // in milliseconds
    },
  ];

  withEnvironmentVariableParsingUnitTests({
    configDirectlyFromEnvironmentVariables,
    configParsedAsIntFromEnvironmentVariablesWithDefault,
    getConfig: () => InformaticaConfig(),
  });
});
