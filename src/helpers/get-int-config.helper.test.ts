import { InvalidConfigException } from '@ukef/config/invalid-config.exception';

import { getIntConfig } from './get-int-config';

describe('getIntConfig', () => {
  describe('returns a value', () => {
    // Arrange
    it.each([
      { value: undefined, defaultValue: 60, expectedResult: 60 },
      { value: '123', defaultValue: 60, expectedResult: 123 },
      { value: '123', defaultValue: undefined, expectedResult: 123 },
      { value: '-123', defaultValue: 60, expectedResult: -123 },
      { value: '0', defaultValue: 60, expectedResult: 0 },
      { value: `${Number.MAX_SAFE_INTEGER}`, defaultValue: 60, expectedResult: Number.MAX_SAFE_INTEGER },
      { value: `-${Number.MAX_SAFE_INTEGER}`, defaultValue: 60, expectedResult: -Number.MAX_SAFE_INTEGER },
    ])('if input is "$value", returns $expectedResult', ({ value, defaultValue, expectedResult }) => {
      // Act & Assert
      expect(getIntConfig(value, defaultValue)).toBe(expectedResult);
    });
  });

  describe('throws an invalid integer exception', () => {
    it.each(['abc', '12.5', '20th', '0xFF', '0b101'])(`throws InvalidConfigException for "%s" because it is not valid integer`, (value) => {
      const gettingTheConfig = () => getIntConfig(value as unknown as string);

      expect(gettingTheConfig).toThrow(InvalidConfigException);
      expect(gettingTheConfig).toThrow(`Invalid integer value "${value}" for configuration property.`);
    });
  });

  describe('throws an InvalidConfigException if environment variable type is not string', () => {
    // Arrange
    it.each([12, true, null, false, /.*/, {}, [], 0xff, 0b101])(
      'throws InvalidConfigException for "%s" because environment variable type is not string',
      (value) => {
        // Act
        const gettingTheConfig = () => getIntConfig(value as unknown as string);

        // Assert
        expect(gettingTheConfig).toThrow(InvalidConfigException);
        expect(gettingTheConfig).toThrow(`Input environment variable type for ${value} should be string.`);
      },
    );
  });

  it('throws InvalidConfigException if environment variable and default value is missing', () => {
    // Act
    const gettingTheConfig = () => getIntConfig(undefined);

    // Assert
    expect(gettingTheConfig).toThrow(InvalidConfigException);
    expect(gettingTheConfig).toThrow('Environment variable is missing and does not have default value.');
  });
});
