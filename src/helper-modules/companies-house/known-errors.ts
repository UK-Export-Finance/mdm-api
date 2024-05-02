import { AxiosError } from 'axios';

import { CompaniesHouseNotFoundException } from './exception/companies-house-not-found.exception';

export type KnownErrors = KnownError[];

type KnownError = { caseInsensitiveSubstringToFind: string; throwError: (error: AxiosError) => never };

export const getCompanyNotFoundKnownCompaniesHouseError = (registrationNumber: string): KnownError => ({
  caseInsensitiveSubstringToFind: 'company-profile-not-found',
  throwError: (error) => {
    throw new CompaniesHouseNotFoundException(`Company with registration number ${registrationNumber} was not found.`, error);
  },
});
