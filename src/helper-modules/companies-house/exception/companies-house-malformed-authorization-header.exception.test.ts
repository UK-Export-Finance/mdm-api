import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { CompaniesHouseMalformedAuthorizationHeaderException } from './companies-house-malformed-authorization-header.exception';

describe('CompaniesHouseMalformedAuthorizationHeaderException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new CompaniesHouseMalformedAuthorizationHeaderException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new CompaniesHouseMalformedAuthorizationHeaderException(message);

    expect(exception.name).toBe('CompaniesHouseMalformedAuthorizationHeaderException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new CompaniesHouseMalformedAuthorizationHeaderException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
