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
    // Arrange
    const error = {
      response: {
        status: HttpStatus.BAD_REQUEST,
      },
      name: 'Bad request',
      message: 'Bad request',
    } as Error;

    // Act
    const result = statusCheck({ error, status: HttpStatus.BAD_REQUEST });

    // Assert
    expect(result).toBe(true);
  });

  it('should return false when isAxiosError is true but status does not match', () => {
    // Arrange
    const error = {
      response: {
        status: HttpStatus.BAD_REQUEST,
      },
      name: 'Bad request',
      message: 'Bad request',
    } as Error;

    // Act
    const result = statusCheck({ error, status: HttpStatus.NOT_FOUND });

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when isAxiosError is false', () => {
    // Arrange
    const error = {
      response: {
        status: HttpStatus.BAD_REQUEST,
      },
      name: 'Bad request',
      message: 'Bad request',
    } as Error;

    (isAxiosError as unknown as jest.Mock).mockReturnValue(false);

    // Act
    const result = statusCheck({ error, status: HttpStatus.BAD_REQUEST });

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when error does not have a response', () => {
    const error = {} as Error;

    // Act
    const result = statusCheck({ error, status: HttpStatus.BAD_REQUEST });

    // Assert
    expect(result).toBe(false);
  });
});

describe('messageCheck', () => {
  beforeEach(() => {
    (isAxiosError as unknown as jest.Mock).mockReturnValue(true);
  });

  it('should return true when isAxiosError is true and message contains search string', () => {
    // Arrange
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

    // Act
    const result = messageCheck({ error, search: 'Invalid Authorization' });

    // Assert
    expect(result).toBe(true);
  });

  it('should return true when isAxiosError is true and message contains similar search string', () => {
    // Arrange
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

    // Act
    const result = messageCheck({ error, search: 'Invalid Authorization header' });

    // Assert
    expect(result).toBe(true);
  });

  it('should return false when isAxiosError is true but message does not contain search string', () => {
    // Arrange
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

    // Act
    const result = messageCheck({ error, search: 'Not found' });

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when isAxiosError is false', () => {
    // Arrange
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

    // Act
    const result = messageCheck({ error, search: 'Invalid Authorization header' });

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when error does not have a response', () => {
    // Arrange
    const error = {} as Error;

    // Act
    const result = messageCheck({ error, search: 'Invalid Authorization header' });

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when error response does not contain data', () => {
    // Arrange
    const error = {
      response: {
        data: undefined,
      },
      status: 404,
      statusText: 'Not Found',
      name: 'Error',
      message: 'Invalid Authorization header',
    } as Error;

    // Act
    const result = messageCheck({ error, search: 'Invalid Authorization header' });

    // Assert
    expect(result).toBe(false);
  });
});
