import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

class ConfigurationLeadDaysOdsResponse {
  @ApiProperty({
    description: "The product's 'lead days - repayments'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.leadDays.repayments,
  })
  readonly repayments: number;

  @ApiProperty({
    description: "The product's 'lead days - interest accruals'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.leadDays.interestAccruals,
  })
  readonly interestAccruals: number;

  @ApiProperty({
    description: "The product's 'lead days - accruing fees'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.leadDays.accruingFees,
  })
  readonly accruingFees: number;
}

class ConfigurationOdsResponse {
  @ApiProperty({
    description: 'The credit type of the product, Term or Revolving',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.creditType,
  })
  readonly creditType: string;

  @ApiProperty({
    description: 'The instrument type of the product: Cash Advance, Insurance, Guarantee',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.instrumentType,
  })
  readonly instrumentType: string;

  @ApiProperty({
    description: 'The lead day configuration for the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.leadDays,
  })
  readonly leadDays: ConfigurationLeadDaysOdsResponse;

  @ApiProperty({
    description: 'The repayment type of the product, Bullet or Scheduled',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.repaymentType,
  })
  readonly repaymentType: string;
}

export class GetProductConfigOdsResponse {
  @ApiProperty({
    description: 'The product type',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.productType,
  })
  readonly productType: string;

  @ApiProperty({
    description: 'The product name',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'The product short name',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.shortName,
  })
  readonly shortName: string;

  @ApiProperty({
    description: 'Whether the product is active',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.productActive,
  })
  readonly productActive: boolean;

  @ApiProperty({
    description: 'Configuration information for the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration,
  })
  readonly configuration: ConfigurationOdsResponse;

  @ApiProperty({
    description: 'The counterparty role types applicable to the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.counterpartyRoleTypes,
  })
  readonly counterpartyRoleTypes: string[];

  @ApiProperty({
    description: 'The facility category subtypes applicable to the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.facilityCategoryTypes,
  })
  readonly facilityCategoryTypes: string[];

  @ApiProperty({
    description: 'The obligation subtypes applicable to the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.obligationSubtypes,
  })
  readonly obligationSubtypes: string[];

  @ApiProperty({
    description: 'The account numbers available for selection on the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.account,
  })
  readonly account: string[];

  @ApiProperty({
    description: 'The additional rate types applicable to accrual schedules on the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.additionalRateTypes,
  })
  readonly additionalRateTypes: string[];

  @ApiProperty({
    description: 'The base rate types applicable to accrual schedules on the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.baseRateTypes,
  })
  readonly baseRateTypes: string[];

  @ApiProperty({
    description: 'The fee types applicable to the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.feeTypes,
  })
  readonly feeTypes: string[];

  @ApiProperty({
    description: 'The accrual schedule types applicable to the product',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.accrualScheduleTypes,
  })
  readonly accrualScheduleTypes: Array<{ code: string; cashIndicator: boolean }>;
}
