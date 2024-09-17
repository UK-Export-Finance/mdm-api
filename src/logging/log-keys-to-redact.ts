import { buildKeyToRedact } from './build-key-to-redact';

export interface LogKeysToRedactOptions {
  redactLogs: boolean;
  clientRequest: {
    logKey: string;
    headersLogKey: string;
    bodyLogKey: string;
  };
  outgoingRequest: {
    logKey: string;
    headersLogKey: string;
    bodyLogKey: string;
  };
  incomingResponse: {
    logKey: string;
    bodyLogKey: string;
  };

  error: {
    logKey: string;
    sensitiveChildKeys: string[];
  };
  dbError: {
    logKey: string;
    sensitiveChildKeys: string[];
  };
}

export const logKeysToRedact = ({ redactLogs, clientRequest, outgoingRequest, incomingResponse, error, dbError }: LogKeysToRedactOptions): string[] => {
  if (!redactLogs) {
    return [];
  }
  const keys = [
    ...getClientRequestLogKeysToRedact(clientRequest),
    ...getOutgoingRequestLogKeysToRedact(outgoingRequest),
    ...getIncomingResponseLogKeysToRedact(incomingResponse),
    ...getErrorLogKeysToRedact(error),
    ...getDbErrorLogKeysToRedact(dbError),
  ];

  return keys;
};

const getClientRequestLogKeysToRedact = ({ logKey, headersLogKey, bodyLogKey }: LogKeysToRedactOptions['clientRequest']): string[] => [
  // We redact the client request headers as they contain the secret API key that the client uses to authenticate with our API.
  buildKeyToRedact([logKey, headersLogKey]),
];

const getIncomingResponseLogKeysToRedact = ({ logKey, bodyLogKey }: LogKeysToRedactOptions['incomingResponse']): string[] => [
  // We redact the client request body as they contain the Dun and Bradstreet and Salesforce access tokens
  buildKeyToRedact([logKey, bodyLogKey]),
];

const getOutgoingRequestLogKeysToRedact = ({ logKey, headersLogKey, bodyLogKey }: LogKeysToRedactOptions['outgoingRequest']): string[] => {
  return [
    // We redact the outgoing request headers as they contain:
    //  - our Basic auth details for Informatica
    // We redact the outgoing request body as it contains:
    //  - our Client auth details for Dun and Bradstreet and Salesforce
    buildKeyToRedact([logKey, headersLogKey]),
    buildKeyToRedact([logKey, bodyLogKey]),
  ];
};

const getErrorLogKeysToRedact = ({ logKey, sensitiveChildKeys }: LogKeysToRedactOptions['error']): string[] => {
  const innerErrorKey = 'innerError';
  const causeNestedErrorKey = ['options', 'cause'];
  return sensitiveChildKeys.flatMap((childKey) => [
    buildKeyToRedact([logKey, childKey]),
    // Some errors are wrapped in a new error and logged as the `innerError` field on the new error.
    // Some errors also contain a `cause` field containing a wrapped error.
    // We need to make sure the sensitive child keys are still redacted in these cases.
    buildKeyToRedact([logKey, innerErrorKey, childKey]),
    buildKeyToRedact([logKey, ...causeNestedErrorKey, childKey]),
    buildKeyToRedact([logKey, ...causeNestedErrorKey, innerErrorKey, childKey]),
  ]);
};

const getDbErrorLogKeysToRedact = ({ logKey, sensitiveChildKeys }: LogKeysToRedactOptions['dbError']): string[] => {
  const innerErrorKey = ['originalError', 'info'];
  const driverNestedErrorKey = ['driverError'];
  return sensitiveChildKeys.flatMap((childKey) => [
    // Some errors are wrapped in a new error and logged as the `originalError` field on the new error.
    // Some errors also contain a `driverError` field containing a wrapped error.
    // We need to make sure the sensitive child keys are still redacted in these cases.
    buildKeyToRedact([logKey, childKey]),
    buildKeyToRedact([logKey, ...driverNestedErrorKey, childKey]),
    buildKeyToRedact([logKey, ...innerErrorKey, childKey]),
    buildKeyToRedact([logKey, ...driverNestedErrorKey, ...innerErrorKey, childKey]),
  ]);
};
