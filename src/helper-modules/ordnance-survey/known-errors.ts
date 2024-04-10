import { NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';

export type KnownErrors = KnownError[];

type KnownError = { caseInsensitiveSubstringToFind: string; throwError: (error: AxiosError) => never };

export const getCustomersNotFoundKnownOrdnanceSurveyError = (): KnownError => ({
  caseInsensitiveSubstringToFind: 'Company registration not found',
  throwError: (error) => {
    throw new NotFoundException('Customer not found.', error);
  },
});
