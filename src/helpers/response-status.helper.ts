import { HttpStatus } from '@nestjs/common';
import { isAxiosError } from 'axios';

/**
 * Checks if the error object is an AxiosError and has a response status matching the specified status.
 * @param options - An object containing the error and status.
 * @param options.error - The error object to check.
 * @param options.status - The status to compare against.
 * @returns - Returns true if the error is an AxiosError and has a matching response status, otherwise false.
 */
export const statusCheck = ({ error, status }: { error: Error; status: HttpStatus }): boolean => isAxiosError(error) && error.response?.status === status;

/**
 * Validates the error response against the specified search string.
 * @param options - An object containing the error and search string.
 * @param options.error - The error object to validate.
 * @param options.search - The search string to compare against the error message.
 * @returns - Returns true if the error response contains the search string, otherwise false.
 */
export const messageCheck = ({ error, search }: { error: Error; search: string }): boolean => {
  if (!isAxiosError(error) || !error?.response?.data) {
    return false;
  }

  let message: string;

  if (typeof error?.response?.data?.error === 'string') {
    message = error.response.data.error;
  } else if (error?.response?.data?.errors?.[0] && typeof error?.response?.data?.errors?.[0]?.error === 'string') {
    message = error.response.data.errors[0].error;
  }

  return message.toLowerCase().includes(search.toLowerCase()) ?? false;
};
