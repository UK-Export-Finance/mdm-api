import { HttpStatus } from '@nestjs/common';
import { isAxiosError } from 'axios';

import { statusCheck } from './response-status.helper';

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
