import { ApiProperty } from '@nestjs/swagger';
import { CustomerSubtypesEnum } from '@ukef/constants/enums/customer-subtypes';
import { CustomerTypesEnum } from '@ukef/constants/enums/customer-types';

export type GetCustomersResponse = GetCustomersResponseItem[];

export class GetCustomersResponseItem {
  @ApiProperty({
    description: 'The unique UKEF ID of the customer',
  })
  readonly partyUrn: string | null;

  @ApiProperty({
    description: 'Customer company name',
  })
  readonly name: string;

  @ApiProperty({
    description: 'The unique Salesforce ID',
  })
  readonly sfId: string;

  @ApiProperty({
    description: 'The Companies House registration number',
  })
  readonly companyRegNo: string | null;

  @ApiProperty({
    description: 'Probability of default of the company',
  })
  readonly probabilityOfDefault: number;

  @ApiProperty({
    description: 'Whether the company is UK based or not',
  })
  readonly ukEntity: number;

  @ApiProperty({
    description: 'UKEF industry identifier code',
  })
  readonly ukefIndustryId: string;

  @ApiProperty({
    description: 'UKEF industry sector identifier code',
  })
  readonly ukefSectorId: string;

  @ApiProperty({
    description: 'Customer company type',
    enum: CustomerTypesEnum,
  })
  readonly type: string | null;

  @ApiProperty({
    description: 'Customer company sub-type',
    enum: CustomerSubtypesEnum,
  })
  readonly subtype: string | null;

  @ApiProperty({
    description: 'False for Salesforce account record, True for legacy Party DB record',
  })
  readonly isLegacyRecord: boolean;
}
