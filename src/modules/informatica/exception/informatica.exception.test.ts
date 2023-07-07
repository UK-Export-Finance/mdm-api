import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { InformaticaException } from './informatica.exception';

describe('InformaticaException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new InformaticaException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new InformaticaException(message);

    expect(exception.name).toBe('InformaticaException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new InformaticaException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
