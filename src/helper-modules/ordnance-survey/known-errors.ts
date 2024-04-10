import { NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';

export type KnownErrors = KnownError[];

type KnownError = { caseInsensitiveSubstringToFind: string; throwError: (error: AxiosError) => never };

export const getAddressNotFoundKnownOrdnanceSurveyError = (): KnownError => ({
  caseInsensitiveSubstringToFind: 'Address not found',
  throwError: (error) => {
    throw new NotFoundException('Address not found.', error);
  },
});
