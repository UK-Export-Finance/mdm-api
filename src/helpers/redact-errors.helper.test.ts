import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { redactError } from './redact-errors.helper';
import { regexToString } from './regex.helper';
import { REDACT_STRING_PATHS } from '@ukef/constants';

describe('Redact errors helper', () => {
  const valueGenerator = new RandomValueGenerator();

  describe('redactError', () => {
    const domain = valueGenerator.httpsUrl();
    const otherSensitivefield = valueGenerator.word();
    const message = `ConnectionError: Failed to connect to ${domain}, ${otherSensitivefield}`;
    const redactedMessage = `ConnectionError: Failed to connect to [RedactedDomain], [Redacted]`;
    const redactStrings = [
      {searchValue: domain, replaceValue: '[RedactedDomain]'},
      {searchValue: otherSensitivefield, replaceValue: '[Redacted]'},
    ];
    const error = {
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
        }
      },
    };
    const expectedError = {
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
        }
      },
    };

    it('replaces sensitive data in input object', () => {
      const redacted = redactError(true, REDACT_STRING_PATHS, redactStrings, error);
      expect(redacted).toStrictEqual(expectedError);
    });

    it('returns original input if redactLogs is set to false', () => {
      const redacted = redactError(false, REDACT_STRING_PATHS, redactStrings, error);
      expect(redacted).toStrictEqual(error);
    });

    it('replaces sensitive data in different input object', () => {
      const error = {
        field1: message,
        field2: {
          field3: message,
          safe: 'Nothing sensitive',
        },
      };
      const expectedError = {
        field1: redactedMessage,
        field2: {
          field3: redactedMessage,
          safe: 'Nothing sensitive',
        },
      };
      const redactPaths = [
        'field1',
        'field2.field3',
      ];
      const redacted = redactError(true, redactPaths, redactStrings, error);
      expect(redacted).toStrictEqual(expectedError);
    });
  });
});
