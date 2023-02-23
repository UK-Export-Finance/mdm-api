import { JestConfigWithTsJest } from 'ts-jest';

const defaultSettings = {
  rootDir: 'test',
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '@mdm/config/(.*)': '<rootDir>/../src/config/$1',
    '@mdm/helpers/(.*)': '<rootDir>/../src/helpers/$1',
    '@mdm/module/(.*)': '<rootDir>/../src/modules/$1',
    '@mdm/(.*)': '<rootDir>/../src/$1',
  },
};

const config: JestConfigWithTsJest = {
  projects: [
    {
      displayName: 'Unit',
      testMatch: ['**/*.test.ts'],
      transform: { '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }] },
      ...defaultSettings,
    },
    {
      displayName: 'API',
      testMatch: ['**/*.api-test.ts'],
      transform: { '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }] },
      ...defaultSettings,
    },
  ],
};

export default config;
