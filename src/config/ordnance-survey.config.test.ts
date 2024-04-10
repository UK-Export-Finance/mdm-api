import { withEnvironmentVariableParsingUnitTests } from '@ukef-test/common-tests/environment-variable-parsing-unit-tests';

import ordnanceSurveyConfig, { OrdnanceSurveyConfig } from './ordnance-survey.config';

describe('ordnanceSurveyConfig', () => {
  const configDirectlyFromEnvironmentVariables: { configPropertyName: keyof OrdnanceSurveyConfig; environmentVariableName: string }[] = [
    {
      configPropertyName: 'baseUrl',
      environmentVariableName: 'ORDNANCE_SURVEY_URL',
    },
    {
      configPropertyName: 'key',
      environmentVariableName: 'ORDNANCE_SURVEY_KEY',
    },
  ];

  const configParsedAsIntFromEnvironmentVariablesWithDefault: {
    configPropertyName: keyof OrdnanceSurveyConfig;
    environmentVariableName: string;
    defaultConfigValue: number;
  }[] = [
    {
      configPropertyName: 'maxRedirects',
      environmentVariableName: 'ORDNANCE_SURVEY_MAX_REDIRECTS',
      defaultConfigValue: 5,
    },
    {
      configPropertyName: 'timeout',
      environmentVariableName: 'ORDNANCE_SURVEY_TIMEOUT',
      defaultConfigValue: 30000,
    },
  ];

  withEnvironmentVariableParsingUnitTests({
    configDirectlyFromEnvironmentVariables,
    configParsedAsIntFromEnvironmentVariablesWithDefault,
    getConfig: () => ordnanceSurveyConfig(),
  });
});
