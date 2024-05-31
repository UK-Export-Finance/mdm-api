import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { CompaniesHouseInvalidAuthorizationException } from './companies-house-invalid-authorization.exception';

describe('CompaniesHouseInvalidAuthorizationException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new CompaniesHouseInvalidAuthorizationException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new CompaniesHouseInvalidAuthorizationException(message);

    expect(exception.name).toBe('CompaniesHouseInvalidAuthorizationException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new CompaniesHouseInvalidAuthorizationException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
