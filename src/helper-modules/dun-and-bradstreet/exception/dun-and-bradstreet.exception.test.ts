import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { DunAndBradstreetException } from './dun-and-bradstreet.exception';

describe('DunAndBradstreetException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new DunAndBradstreetException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new DunAndBradstreetException(message);

    expect(exception.name).toBe('DunAndBradstreetException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new DunAndBradstreetException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
