import { NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';

export type KnownErrors = KnownError[];

type KnownError = { caseInsensitiveSubstringToFind: string; throwError: (error: AxiosError) => never };

export const getDunAndBradstreetNumberByRegistrationNumberNotFoundError = (): KnownError => ({
  caseInsensitiveSubstringToFind: 'No Match found for the given input criteria',
  throwError: (error) => {
    throw new NotFoundException('Company registration number not found.', error);
  },
});
