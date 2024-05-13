import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { OrdnanceSurveyException } from './ordnance-survey.exception';

describe('OrdnanceSurveyException', () => {
  const valueGenerator = new RandomValueGenerator();
  const message = valueGenerator.string();

  it('exposes the message it was created with', () => {
    const exception = new OrdnanceSurveyException(message);

    expect(exception.message).toBe(message);
  });

  it('exposes the name of the exception', () => {
    const exception = new OrdnanceSurveyException(message);

    expect(exception.name).toBe('OrdnanceSurveyException');
  });

  it('exposes the inner error it was created with', () => {
    const innerError = new Error();

    const exception = new OrdnanceSurveyException(message, innerError);

    expect(exception.innerError).toBe(innerError);
  });
});
