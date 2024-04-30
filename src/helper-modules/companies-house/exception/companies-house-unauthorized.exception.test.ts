import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { CompaniesHouseUnauthorizedException } from './companies-house-unauthorized.exception';

describe('CompaniesHouseUnauthorizedException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new CompaniesHouseUnauthorizedException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new CompaniesHouseUnauthorizedException(message);

    expect(exception.name).toBe('CompaniesHouseUnauthorizedException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new CompaniesHouseUnauthorizedException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
