import { REDACT_STRING_PATHS } from '@ukef/constants';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { redactStringsInLogArgs } from './redact-strings-in-log-args.helper';

describe('Redact errors helper', () => {
  const valueGenerator = new RandomValueGenerator();

  describe('redactStringsInLogArgs', () => {
    const domain = valueGenerator.httpsUrl();
    const otherSensitiveField = valueGenerator.word();
    const message = `ConnectionError: Failed to connect to ${domain}, ${otherSensitiveField}`;
    const redactedMessage = `ConnectionError: Failed to connect to [RedactedDomain], [Redacted]`;
    const redactStrings = [
      { searchValue: domain, replaceValue: '[RedactedDomain]' },
      { searchValue: otherSensitiveField, replaceValue: '[Redacted]' },
    ];
    const args = [
      {
        message: message,
        stack: message,
        originalError: {
          message: message,
          stack: message,
          safe: 'Nothing sensitive',
        },
        driverError: {
          message: message,
          stack: message,
          originalError: {
            message: message,
            stack: message,
            safe: 'Nothing sensitive',
          },
        },
      },
    ];
    const expectedResult = [
      {
        message: redactedMessage,
        stack: redactedMessage,
        originalError: {
          message: redactedMessage,
          stack: redactedMessage,
          safe: 'Nothing sensitive',
        },
        driverError: {
          message: redactedMessage,
          stack: redactedMessage,
          originalError: {
            message: redactedMessage,
            stack: redactedMessage,
            safe: 'Nothing sensitive',
          },
        },
      },
    ];

    it('replaces sensitive data in input object', () => {
      const redacted = redactStringsInLogArgs(true, REDACT_STRING_PATHS, redactStrings, args);

      expect(redacted).toStrictEqual(expectedResult);
    });

    it('returns original input if redactLogs is set to false', () => {
      const redacted = redactStringsInLogArgs(false, REDACT_STRING_PATHS, redactStrings, args);

      expect(redacted).toStrictEqual(args);
    });

    it('replaces sensitive data in input object using regex', () => {
      const redactStrings = [{ searchValue: /(Login failed for user ').*(')/g, replaceValue: '$1[Redacted]$2' }];
      const otherSensitiveValue = valueGenerator.word();
      const messageforRegex = `Connection error: Login failed for user '${otherSensitiveValue}'`;
      const redactedMessage = `Connection error: Login failed for user '[Redacted]'`;
      const args = [
        {
          message: messageforRegex,
          stack: messageforRegex,
          originalError: {
            message: messageforRegex,
          },
        },
      ];
      const expectedResult = [
        {
          message: redactedMessage,
          stack: redactedMessage,
          originalError: {
            message: redactedMessage,
          },
        },
      ];

      const redacted = redactStringsInLogArgs(true, REDACT_STRING_PATHS, redactStrings, args);

      expect(redacted).toStrictEqual(expectedResult);
    });

    it('replaces sensitive data in different input object', () => {
      const args = [
        {
          field1: message,
          field2: {
            field3: message,
            safe: 'Nothing sensitive',
          },
        },
      ];
      const expectedResult = [
        {
          field1: redactedMessage,
          field2: {
            field3: redactedMessage,
            safe: 'Nothing sensitive',
          },
        },
      ];
      const redactPaths = ['field1', 'field2.field3'];
      const redacted = redactStringsInLogArgs(true, redactPaths, redactStrings, args);

      expect(redacted).toStrictEqual(expectedResult);
    });
  });
});
