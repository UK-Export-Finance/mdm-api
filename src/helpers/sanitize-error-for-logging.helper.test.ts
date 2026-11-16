import { jest } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';

const isAxiosError = jest.fn<typeof import('axios').isAxiosError>();
let sanitizeErrorForLogging: typeof import('./sanitize-error-for-logging.helper').sanitizeErrorForLogging;

jest.unstable_mockModule('axios', () => ({ isAxiosError }));

beforeAll(async () => {
  ({ sanitizeErrorForLogging } = await import('./sanitize-error-for-logging.helper.js'));
});

describe('sanitizeErrorForLogging', () => {
  beforeEach(() => {
    isAxiosError.mockReturnValue(false);
  });

  it('returns non-object values unchanged', () => {
    expect(sanitizeErrorForLogging('a string')).toBe('a string');
    expect(sanitizeErrorForLogging(undefined)).toBe(undefined);
    expect(sanitizeErrorForLogging(null)).toBe(null);
  });

  it('keeps the name, message and stack of a plain error', () => {
    const error = new Error('Something went wrong');

    const result = sanitizeErrorForLogging(error);

    expect(result).toStrictEqual({
      name: 'Error',
      message: 'Something went wrong',
      stack: error.stack,
    });
  });

  it('includes the HTTP status of a NestJS HttpException', () => {
    const error = new NotFoundException('Not found');

    const result = sanitizeErrorForLogging(error);

    expect(result).toMatchObject({ status: 404 });
  });

  it('removes the Axios request config and request (which carry the Authorization header and credentials)', () => {
    const axiosError = {
      name: 'AxiosError',
      message: 'Request failed with status code 404',
      stack: 'AxiosError: Request failed with status code 404',
      code: 'ERR_BAD_REQUEST',
      config: {
        headers: { Authorization: 'Basic c2abcdV0LdAbcdQ==' },
        baseURL: 'https://api.companieshouse.gov.uk',
        url: '/company/00000001',
      },
      request: {
        _header: 'GET /company/00000001 HTTP/1.1\r\nAuthorization: Basic c2abcdV0LdAbcdQ==\r\n\r\n',
      },
      response: {
        status: 404,
        statusText: 'Not Found',
        data: { message: 'Resource not found' },
        config: {
          headers: { Authorization: 'Basic c2abcdV0LdAbcdQ==' },
        },
      },
    };

    isAxiosError.mockReturnValue(true);

    const result = sanitizeErrorForLogging(axiosError);

    expect(result).toStrictEqual({
      name: 'AxiosError',
      message: 'Request failed with status code 404',
      stack: 'AxiosError: Request failed with status code 404',
      code: 'ERR_BAD_REQUEST',
      response: {
        status: 404,
        statusText: 'Not Found',
        data: { message: 'Resource not found' },
      },
    });
    expect(result).not.toHaveProperty('config');
    expect(result).not.toHaveProperty('request');
    expect(JSON.stringify(result)).not.toContain('Authorization');
    expect(JSON.stringify(result)).not.toContain('c2abcdV0LdAbcdQ==');
  });

  it('sanitizes a wrapped innerError recursively', () => {
    const innerAxiosError = {
      name: 'AxiosError',
      message: 'Request failed with status code 401',
      config: {
        headers: { Authorization: 'Basic c2abcdV0LdAbcdQ==' },
      },
    };

    isAxiosError.mockReturnValue(true);

    const wrappingError = new (class extends Error {
      innerError = innerAxiosError;
    })('Failed to get response from the API');

    const result = sanitizeErrorForLogging(wrappingError) as { innerError: unknown };

    expect(result.innerError).toStrictEqual({
      name: 'AxiosError',
      message: 'Request failed with status code 401',
      stack: undefined,
      code: undefined,
    });
    expect(JSON.stringify(result)).not.toContain('Authorization');
  });

  it('sanitizes a wrapped cause recursively', () => {
    const cause = new Error('Underlying cause');
    const error = new Error('Wrapping error', { cause });

    const result = sanitizeErrorForLogging(error) as { cause: unknown };

    expect(result.cause).toStrictEqual({
      name: 'Error',
      message: 'Underlying cause',
      stack: cause.stack,
    });
  });
});
