import { getEnvironmentVariablesForProcessEnv } from '@ukef-test/support/environment-variables';

let originalProcessEnv: NodeJS.ProcessEnv;

beforeAll(() => {
  originalProcessEnv = process.env;
  // Override some environment variables.
  process.env = { ...process.env, ...getEnvironmentVariablesForProcessEnv() };
});

afterAll(() => {
  process.env = originalProcessEnv;
});
