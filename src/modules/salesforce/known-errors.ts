import { BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';

export type KnownErrors = KnownError[];

type KnownError = { caseInsensitiveSubstringToFind: string; throwError: (error: AxiosError) => never };

export const customerAlreadyExistsSalesforceError = (): KnownError => ({
  caseInsensitiveSubstringToFind: 'This record looks like an existing Salesforce record, you are unable to create record.',
  throwError: (error) => {
    throw new BadRequestException('This customer already exists in Salesforce', error);
  },
});
