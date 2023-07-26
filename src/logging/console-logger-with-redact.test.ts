import { ConsoleLogger } from '@nestjs/common';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { ConsoleLoggerWithRedact } from './console-logger-with-redact';

const mockedSuperError = jest.spyOn(ConsoleLogger.prototype, 'error');

describe('ConsoleLoggerWithRedact', () => {
  const valueGenerator = new RandomValueGenerator();
  const domain = valueGenerator.httpsUrl();
  const otherSensitiveField = valueGenerator.word();
  const message = `ConnectionError: Failed to connect to ${domain}, ${otherSensitiveField}`;
  const redactedMessage = `ConnectionError: Failed to connect to [RedactedDomain], [Redacted]`;
  const redactStrings = [
    { searchValue: domain, replaceValue: '[RedactedDomain]' },
    { searchValue: otherSensitiveField, replaceValue: '[Redacted]' },
  ];
  const logger = new ConsoleLoggerWithRedact(redactStrings);

  beforeEach(() => {
    mockedSuperError.mockClear();
  });

  it('redacts sensitive data in `message`', () => {
    logger.error(message);

    expect(mockedSuperError).toHaveBeenCalledWith(redactedMessage, undefined, undefined);
  });

  it('redacts sensitive data in `message` and second parameter `stack`', () => {
    logger.error(message, message);

    expect(mockedSuperError).toHaveBeenCalledWith(redactedMessage, redactedMessage, undefined);
  });

  it('redacts sensitive data in `message` and second parameter `stack`, also passes context', () => {
    const context = valueGenerator.word();
    logger.error(message, message, context);

    expect(mockedSuperError).toHaveBeenCalledWith(redactedMessage, redactedMessage, context);
  });
});
