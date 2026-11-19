import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { CustomerCompanySubtypesEnum } from '@ukef/constants/enums/customer-company-subtypes';
import { CustomerTypesEnum } from '@ukef/constants/enums/customer-types';

export type GetCustomersResponse = GetCustomersResponseItem[];

export class GetCustomersResponseItem {
  @ApiProperty({
    description: 'The Companies House registration number',
    example: EXAMPLES.CUSTOMER.COMPANYREG,
    nullable: true,
  })
  readonly companyRegNo: string | null;

  @ApiProperty({
    description: 'Credit Classification Status Date (dd/mm/yyyy)',
    example: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_DATE,
    nullable: true,
  })
  readonly creditClassificationDate: string | null;

  @ApiProperty({
    description: 'Credit classification status',
    example: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
    nullable: true,
  })
  readonly creditClassificationStatus: string | null;

  @ApiProperty({
    description: 'Customer type',
    example: EXAMPLES.CUSTOMER.SALESFORCE_TYPE,
    enum: CustomerTypesEnum,
    nullable: true,
  })
  readonly customerType: string | null;

  @ApiProperty({
    description: 'False for Salesforce account record, True for legacy Party DB record',
    example: EXAMPLES.CUSTOMER.SALESFORCE_IS_LEGACY,
  })
  readonly isLegacyRecord: boolean;

  @ApiProperty({
    description: 'Customer company name',
    example: EXAMPLES.CUSTOMER.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'The unique UKEF ID of the customer',
    example: EXAMPLES.CUSTOMER.PARTYURN,
    nullable: true,
  })
  readonly partyUrn: string | null;

  @ApiProperty({
    description: 'Probability of default of the company',
    example: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
    nullable: true,
  })
  readonly probabilityOfDefault: number | null;

  @ApiProperty({
    description: 'Risk entity',
    example: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
    nullable: true,
  })
  readonly riskEntity: string | null;

  @ApiProperty({
    description: 'The unique Salesforce ID',
    example: EXAMPLES.CUSTOMER.SALESFORCE_ID,
  })
  readonly sfId: string;

  @ApiProperty({
    description: 'Customer company subtype',
    example: EXAMPLES.CUSTOMER.SALESFORCE_SUBTYPE,
    enum: CustomerCompanySubtypesEnum,
    nullable: true,
  })
  readonly subtype: string | null;

  @ApiProperty({
    description: 'Customer company type',
    example: EXAMPLES.CUSTOMER.SALESFORCE_TYPE,
    enum: CustomerTypesEnum,
    nullable: true,
  })
  readonly type: string | null;

  @ApiProperty({
    description: 'Whether the company is UK based or not',
    example: EXAMPLES.CUSTOMER.UK_ENTITY,
    nullable: true,
  })
  readonly ukEntity: string | null;

  @ApiProperty({
    description: 'UKEF industry identifier code',
    example: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
    nullable: true,
  })
  readonly ukefIndustryName: string | null;

  @ApiProperty({
    description: 'UKEF industry sector identifier code',
    example: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
    nullable: true,
  })
  readonly ukefSectorName: string | null;
}
