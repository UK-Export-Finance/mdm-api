import { after } from 'lodash';
import { isDevelopment } from './is-development.helper';

describe('isDevelopment function', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach = () => {
    process.env.NODE_ENV = originalEnv;
  };

  it('should return true if NODE_ENV is set to "development"', () => {
    process.env.NODE_ENV = 'development';

    expect(isDevelopment()).toBe(true);
  });

  it('should return false if NODE_ENV is not set to "development"', () => {
    process.env.NODE_ENV = 'production';

    expect(isDevelopment()).toBe(false);
  });
});
