import { HttpStatus } from '@nestjs/common';
import { isAxiosError } from 'axios';

/**
 * This function validate the error response against the specified status code
 * @param Object Comprising of an error object and status to be validated against with
 * @returns Boolean
 */
export const statusCheck = ({ error, status }: { error: Error; status: HttpStatus }): boolean => isAxiosError(error) && error.response?.status === status;

/**
 * This function validates the error response against the specified search string
 * @param Object Comprising of an error object and search string
 * @returns Boolean
 */
export const messageCheck = ({ error, search }: { error: Error; search: string }): boolean => {
  if (!isAxiosError(error) || !error?.response?.data) {
    return false;
  }

  let message: string;

  if (typeof error?.response?.data?.error === 'string') {
    message = error.response.data.error;
  } else if (error?.response?.data?.errors[0] && typeof error?.response?.data?.errors[0]?.error === 'string') {
    message = error.response.data.errors[0].error;
  }

  if (message) {
    return message.toLowerCase().includes(search.toLowerCase());
  }
};
