import { ApiProperty } from '@nestjs/swagger';
import { CustomerSubtypesEnum } from '@ukef/constants/enums/customer-subtypes';
import { CustomerTypesEnum } from '@ukef/constants/enums/customer-types';

export type GetCustomersResponse = GetCustomersResponseItem[];

export class GetCustomersResponseItem {
  @ApiProperty({
    description: 'The unique UKEF id of the customer',
  })
  readonly partyUrn: string | null;

  @ApiProperty({
    description: 'Customer company name',
  })
  readonly name: string;

  @ApiProperty({
    description: 'The uniqueue Salesforce id',
  })
  readonly sfId: string;

  @ApiProperty({
    description: 'The Companies house registration number',
  })
  readonly companyRegNo: string | null;

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
