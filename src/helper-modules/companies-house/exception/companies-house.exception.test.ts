import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { CompaniesHouseException } from './companies-house.exception';

describe('CompaniesHouseException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new CompaniesHouseException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new CompaniesHouseException(message);

    expect(exception.name).toBe('CompaniesHouseException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new CompaniesHouseException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
