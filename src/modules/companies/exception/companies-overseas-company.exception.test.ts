import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { CompaniesOverseasCompanyException } from './companies-overseas-company-exception.exception';

describe('CompaniesOverseasCompanyException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new CompaniesOverseasCompanyException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new CompaniesOverseasCompanyException(message);

    expect(exception.name).toBe('CompaniesOverseasCompanyException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new CompaniesOverseasCompanyException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
