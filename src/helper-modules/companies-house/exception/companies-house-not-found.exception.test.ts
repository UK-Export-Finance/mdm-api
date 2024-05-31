import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { CompaniesHouseNotFoundException } from './companies-house-not-found.exception';

describe('CompaniesHouseNotFoundException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new CompaniesHouseNotFoundException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new CompaniesHouseNotFoundException(message);

    expect(exception.name).toBe('CompaniesHouseNotFoundException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new CompaniesHouseNotFoundException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
