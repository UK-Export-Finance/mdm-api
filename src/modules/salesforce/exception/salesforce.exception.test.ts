import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { SalesforceException } from './salesforce.exception';

describe('SalesforceException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new SalesforceException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new SalesforceException(message);

    expect(exception.name).toBe('SalesforceException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new SalesforceException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
