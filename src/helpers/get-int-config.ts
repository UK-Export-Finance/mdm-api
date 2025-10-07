import { InvalidConfigException } from '@ukef/config/invalid-config.exception';

// This helper function is used to get integer from configuration.
export const getIntConfig = (environmentVariable: string, defaultValue?: number): number => {
  if (typeof environmentVariable === 'undefined') {
    if (typeof defaultValue === 'undefined') {
      throw new InvalidConfigException(`Environment variable is missing and doesn't have default value.`);
    }
    return defaultValue;
  }
  if (typeof environmentVariable !== 'string') {
    throw new InvalidConfigException(`Input environment variable type for ${environmentVariable} should be string.`);
  }

  const integer = parseInt(environmentVariable, 10);
  // Check if parseInt is number, decimal base integer and input didn't have anything non-numeric.
  if (isNaN(integer) || integer.toString() !== environmentVariable) {
    throw new InvalidConfigException(`Invalid integer value "${environmentVariable}" for configuration property.`);
  }
  return integer;
};
