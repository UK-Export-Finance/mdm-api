import { HttpException } from '@nestjs/common';
import { isAxiosError } from 'axios';

/**
 * Builds a safe-to-log representation of an error thrown while calling a third-party integration (for example
 * Companies House or Dun and Bradstreet) over HTTP.
 *
 * Axios errors carry the outgoing request `config` (and, via `request`, the raw HTTP request line) which include
 * the `Authorization` header and other credentials used to authenticate with the integration. These must never be
 * logged verbatim, so this strips them out while keeping the fields useful for debugging (message, status, response
 * body). Any wrapped `innerError`/`cause` is sanitized recursively, so nested integration exceptions are covered too.
 *
 * @param {unknown} error - The error to sanitize.
 * @returns {unknown} A plain object safe to pass to a logger, or the original value if it is not an object.
 */
export const sanitizeErrorForLogging = (error: unknown): unknown => {
  if (typeof error !== 'object' || error === null) {
    return error;
  }

  const { name, message, stack } = error as Error;
  const sanitized: Record<string, unknown> = { name, message, stack };

  if (error instanceof HttpException) {
    sanitized.status = error.getStatus();
  }

  if (isAxiosError(error)) {
    sanitized.code = error.code;

    if (error.response) {
      const { status, statusText, data } = error.response;
      sanitized.response = { status, statusText, data };
    }
  }

  const { innerError, cause } = error as { innerError?: unknown; cause?: unknown };

  if (innerError) {
    sanitized.innerError = sanitizeErrorForLogging(innerError);
  }

  if (cause) {
    sanitized.cause = sanitizeErrorForLogging(cause);
  }

  return sanitized;
};
