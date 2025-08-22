import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { CustomerSubtypesEnum } from '@ukef/constants/enums/customer-subtypes';
import { CustomerTypesEnum } from '@ukef/constants/enums/customer-types';

export type GetCustomersResponse = GetCustomersResponseItem[];

export class GetCustomersResponseItem {
  @ApiProperty({
    description: 'The unique UKEF ID of the customer',
    example: EXAMPLES.CUSTOMER.PARTYURN,
  })
  readonly partyUrn: string | null;

  @ApiProperty({
    description: 'Customer company name',
    example: EXAMPLES.CUSTOMER.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'The unique Salesforce ID',
    example: EXAMPLES.CUSTOMER.SALESFORCE_ID,
  })
  readonly sfId: string;

  @ApiProperty({
    description: 'The Companies House registration number',
    example: EXAMPLES.CUSTOMER.COMPANYREG,
  })
  readonly companyRegNo: string | null;

  @ApiProperty({
    description: 'Customer company type',
    example: EXAMPLES.CUSTOMER.SALESFORCE_TYPE,
    enum: CustomerTypesEnum,
  })
  readonly type: string | null;

  @ApiProperty({
    description: 'Customer company sub-type',
    example: EXAMPLES.CUSTOMER.SALESFORCE_SUBTYPE,
    enum: CustomerSubtypesEnum,
  })
  readonly subtype: string | null;

  @ApiProperty({
    description: 'False for Salesforce account record, True for legacy Party DB record',
    example: EXAMPLES.CUSTOMER.SALESFORCE_IS_LEGACY,
  })
  readonly isLegacyRecord: boolean;

  @ApiProperty({
    description: 'Probability of default of the company',
    example: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
  })
  readonly probabilityOfDefault?: number;

  @ApiProperty({
    description: 'Whether the company is UK based or not',
    example: EXAMPLES.CUSTOMER.UK_ENTITY,
  })
  readonly ukEntity?: string;

  @ApiProperty({
    description: 'UKEF industry identifier code',
    example: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
  })
  readonly ukefIndustryName?: string;

  @ApiProperty({
    description: 'UKEF industry sector identifier code',
    example: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
  })
  readonly ukefSectorName?: string;

  @ApiProperty({
    description: 'Risk entity',
    example: EXAMPLES.CUSTOMER.RISK_ENTITY,
  })
  readonly riskEntity?: string;

  @ApiProperty({
    description: 'Credit classification status',
    example: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS,
  })
  readonly creditClassificationStatus?: string;

  @ApiProperty({
    description: 'Credit Classification Status Date (dd/mm/yyyy)',
    example: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_DATE,
  })
  readonly creditClassificationDate?: string;
}
