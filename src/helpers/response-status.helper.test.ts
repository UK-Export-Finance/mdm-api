import { HttpStatus } from '@nestjs/common';
import { isAxiosError } from 'axios';

import { messageCheck, statusCheck } from './response-status.helper';

jest.mock('axios', () => ({
  isAxiosError: jest.fn(),
}));

describe('statusCheck', () => {
  beforeEach(() => {
    (isAxiosError as unknown as jest.Mock).mockReturnValue(true);
  });

  it('should return true when isAxiosError is true and status matches', () => {
    const error = {
      response: {
        status: HttpStatus.BAD_REQUEST,
      },
      name: 'Bad request',
      message: 'Bad request',
    } as Error;

    const result = statusCheck({ error, status: HttpStatus.BAD_REQUEST });

    expect(result).toBe(true);
  });

  it('should return false when isAxiosError is true but status does not match', () => {
    const error = {
      response: {
        status: HttpStatus.BAD_REQUEST,
      },
      name: 'Bad request',
      message: 'Bad request',
    } as Error;

    const result = statusCheck({ error, status: HttpStatus.NOT_FOUND });

    expect(result).toBe(false);
  });

  it('should return false when isAxiosError is false', () => {
    const error = {
      response: {
        status: HttpStatus.BAD_REQUEST,
      },
      name: 'Bad request',
      message: 'Bad request',
    } as Error;

    (isAxiosError as unknown as jest.Mock).mockReturnValue(false);

    const result = statusCheck({ error, status: HttpStatus.BAD_REQUEST });

    expect(result).toBe(false);
  });

  it('should return false when error does not have a response', () => {
    const error = {} as Error;

    const result = statusCheck({ error, status: HttpStatus.BAD_REQUEST });

    expect(result).toBe(false);
  });
});

describe('messageCheck', () => {
  beforeEach(() => {
    (isAxiosError as unknown as jest.Mock).mockReturnValue(true);
  });

  it('should return true when isAxiosError is true and message contains search string', () => {
    const error = {
      response: {
        data: {
          error: 'Invalid Authorization',
          type: 'ch:service',
        },
      },
      status: 401,
      statusText: 'Unauthorized',
      name: 'Error',
      message: 'Error',
    } as Error;

    const result = messageCheck({ error, search: 'Invalid Authorization' });

    expect(result).toBe(true);
  });

  it('should return true when isAxiosError is true and message contains similar search string', () => {
    const error = {
      response: {
        data: {
          error: 'Invalid Authorization header',
          type: 'ch:service',
        },
      },
      status: 400,
      statusText: 'Bad Request',
      name: 'Error',
      message: 'Error',
    } as Error;

    const result = messageCheck({ error, search: 'Invalid Authorization header' });

    expect(result).toBe(true);
  });

  it('should return false when isAxiosError is true but message does not contain search string', () => {
    const error = {
      response: {
        data: {
          error: 'Invalid Authorization',
          type: 'ch:service',
        },
      },
      status: 401,
      statusText: 'Unauthorized',
      name: 'Error',
      message: 'Error',
    } as Error;

    const result = messageCheck({ error, search: 'Not found' });

    expect(result).toBe(false);
  });

  it('should return false when isAxiosError is false', () => {
    const error = {
      response: {
        data: {
          error: 'Invalid Authorization',
          type: 'ch:service',
        },
      },
      status: 401,
      statusText: 'Unauthorized',
      name: 'Error',
      message: 'Error',
    } as Error;

    (isAxiosError as unknown as jest.Mock).mockReturnValue(false);

    const result = messageCheck({ error, search: 'Invalid Authorization header' });

    expect(result).toBe(false);
  });

  it('should return false when error does not have a response', () => {
    const error = {} as Error;

    const result = messageCheck({ error, search: 'Invalid Authorization header' });

    expect(result).toBe(false);
  });

  it('should return false when error response does not contain data', () => {
    const error = {
      response: {
        data: undefined,
      },
      status: 404,
      statusText: 'Not Found',
      name: 'Error',
      message: 'Invalid Authorization header',
    } as Error;

    const result = messageCheck({ error, search: 'Invalid Authorization header' });

    expect(result).toBe(false);
  });
});
