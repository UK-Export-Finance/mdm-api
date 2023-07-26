import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { buildKeyToRedact } from './build-key-to-redact';
import { logKeysToRedact, LogKeysToRedactOptions } from './log-keys-to-redact';

describe('logKeysToRedact', () => {
  const valueGenerator = new RandomValueGenerator();
  const options: Omit<LogKeysToRedactOptions, 'redactLogs'> = {
    clientRequest: {
      logKey: valueGenerator.string(),
      headersLogKey: valueGenerator.string(),
    },
    outgoingRequest: {
      logKey: valueGenerator.string(),
      headersLogKey: valueGenerator.string(),
    },
    error: {
      logKey: valueGenerator.string(),
      sensitiveChildKeys: [valueGenerator.string(), valueGenerator.string()],
    },
    dbError: {
      logKey: valueGenerator.string(),
      sensitiveChildKeys: [valueGenerator.string(), valueGenerator.string()],
    },
  };

  describe('when redactLogs is false', () => {
    it('returns an empty array', () => {
      expect(logKeysToRedact({ redactLogs: false, ...options })).toStrictEqual([]);
    });
  });

  describe('when redactLogs is true', () => {
    let result: string[];

    beforeEach(() => {
      result = logKeysToRedact({ redactLogs: true, ...options });
    });

    it('includes the headers of a client request', () => {
      const { logKey, headersLogKey } = options.clientRequest;

      expect(result).toContain(buildKeyToRedact([logKey, headersLogKey]));
    });

    it('includes the headers of an outgoing request', () => {
      const { logKey, headersLogKey } = options.outgoingRequest;

      expect(result).toContain(buildKeyToRedact([logKey, headersLogKey]));
    });

    it('includes all sensitive child keys of an error', () => {
      const { logKey, sensitiveChildKeys } = options.error;

      expect(result).toContain(buildKeyToRedact([logKey, sensitiveChildKeys[0]]));
      expect(result).toContain(buildKeyToRedact([logKey, sensitiveChildKeys[1]]));
    });

    it('includes all sensitive child keys of an inner error', () => {
      const { logKey, sensitiveChildKeys } = options.error;

      expect(result).toContain(buildKeyToRedact([logKey, 'innerError', sensitiveChildKeys[0]]));
      expect(result).toContain(buildKeyToRedact([logKey, 'innerError', sensitiveChildKeys[1]]));
    });

    it('includes all sensitive child keys of an error cause', () => {
      const { logKey, sensitiveChildKeys } = options.error;

      expect(result).toContain(buildKeyToRedact([logKey, 'options', 'cause', sensitiveChildKeys[0]]));
      expect(result).toContain(buildKeyToRedact([logKey, 'options', 'cause', sensitiveChildKeys[1]]));
    });

    it(`includes all sensitive child keys of an error cause's inner error`, () => {
      const { logKey, sensitiveChildKeys } = options.error;

      expect(result).toContain(buildKeyToRedact([logKey, 'options', 'cause', 'innerError', sensitiveChildKeys[0]]));
      expect(result).toContain(buildKeyToRedact([logKey, 'options', 'cause', 'innerError', sensitiveChildKeys[1]]));
    });

    it('includes all sensitive child keys of an dbError', () => {
      const { logKey, sensitiveChildKeys } = options.dbError;

      expect(result).toContain(buildKeyToRedact([logKey, sensitiveChildKeys[0]]));
      expect(result).toContain(buildKeyToRedact([logKey, sensitiveChildKeys[1]]));
    });

    it('includes all sensitive child keys of an original dbError', () => {
      const { logKey, sensitiveChildKeys } = options.dbError;

      expect(result).toContain(buildKeyToRedact([logKey, 'originalError', 'info', sensitiveChildKeys[0]]));
      expect(result).toContain(buildKeyToRedact([logKey, 'originalError', 'info', sensitiveChildKeys[1]]));
    });

    it('includes all sensitive child keys of an dbError driverError', () => {
      const { logKey, sensitiveChildKeys } = options.dbError;

      expect(result).toContain(buildKeyToRedact([logKey, 'driverError', sensitiveChildKeys[0]]));
      expect(result).toContain(buildKeyToRedact([logKey, 'driverError', sensitiveChildKeys[1]]));
    });

    it(`includes all sensitive child keys of an dbError driverError's original error`, () => {
      const { logKey, sensitiveChildKeys } = options.dbError;

      expect(result).toContain(buildKeyToRedact([logKey, 'driverError', 'originalError', 'info', sensitiveChildKeys[0]]));
      expect(result).toContain(buildKeyToRedact([logKey, 'driverError', 'originalError', 'info', sensitiveChildKeys[1]]));
    });
  });
});
