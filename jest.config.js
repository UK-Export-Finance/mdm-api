module.exports = {
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: 'generated_reports/api-test',
  testMatch: ['**/*.spec.ts'],
  rootDir: 'src',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
