import { HttpStatus } from '@nestjs/common';
import { messageCheck, statusCheck } from '@ukef/helpers/response-status';
import { AxiosError } from 'axios';

import { CompaniesHouseInvalidAuthorizationException } from './exception/companies-house-invalid-authorization.exception';
import { CompaniesHouseMalformedAuthorizationHeaderException } from './exception/companies-house-malformed-authorization-header.exception';
import { CompaniesHouseNotFoundException } from './exception/companies-house-not-found.exception';

export type KnownErrors = KnownError[];

type KnownError = { checkHasError: (error: Error) => boolean; throwError: (error: AxiosError) => never };

export const getCompanyMalformedAuthorizationHeaderKnownCompaniesHouseError = (): KnownError => ({
  checkHasError: (error) => statusCheck({ error, status: HttpStatus.UNAUTHORIZED }) && messageCheck({ error, search: 'Invalid Authorization header' }),
  throwError: (error) => {
    throw new CompaniesHouseMalformedAuthorizationHeaderException(
      `Invalid 'Authorization' header. Check that your 'Authorization' header is well-formed.`,
      error,
    );
  },
});

export const getCompanyInvalidAuthorizationKnownCompaniesHouseError = (): KnownError => ({
  checkHasError: (error) => statusCheck({ error, status: HttpStatus.UNAUTHORIZED }) && messageCheck({ error, search: 'Invalid Authorization' }),
  throwError: (error) => {
    throw new CompaniesHouseInvalidAuthorizationException('Invalid authorization. Check your Companies House API key.', error);
  },
});

export const getCompanyNotFoundKnownCompaniesHouseError = (registrationNumber: string): KnownError => ({
  checkHasError: (error) => statusCheck({ error, status: HttpStatus.NOT_FOUND }),
  throwError: (error) => {
    throw new CompaniesHouseNotFoundException(`Company with registration number ${registrationNumber} was not found.`, error);
  },
});
