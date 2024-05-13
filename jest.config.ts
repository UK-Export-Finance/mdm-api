import { JestConfigWithTsJest } from 'ts-jest';

const defaultSettings = {
  rootDir: 'test',
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '@ukef-test/(.*)': '<rootDir>/../test/$1',
    '@ukef/constants/(.*)': '<rootDir>/../src/constants/$1',
    '@ukef/config/(.*)': '<rootDir>/../src/config/$1',
    '@ukef/database/(.*)': '<rootDir>/../src/modules/database/$1',
    '@ukef/helpers/(.*)': '<rootDir>/../src/helpers/$1',
    '@ukef/helper-modules/(.*)': '<rootDir>/../src/helper-modules/$1',
    '@ukef/modules/(.*)': '<rootDir>/../src/modules/$1',
    '@ukef/auth/(.*)': '<rootDir>/../src/modules/auth/$1',
    '@ukef/(.*)': '<rootDir>/../src/$1',
  },
};

const config: JestConfigWithTsJest = {
  projects: [
    {
      displayName: 'Unit',
      testMatch: ['**/*.test.ts'],
      transform: { '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }] },
      ...defaultSettings,
      rootDir: 'src',
    },
    {
      displayName: 'API',
      setupFilesAfterEnv: ['./setup/override-environment-variables.ts'],
      testMatch: ['**/*.api-test.ts'],
      transform: { '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }] },
      ...defaultSettings,
    },
  ],
  reporters: [['default', { summaryThreshold: 1 }]],
};

export default config;
