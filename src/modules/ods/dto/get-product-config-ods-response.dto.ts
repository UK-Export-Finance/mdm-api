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
    description: "The product's 'credit type' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.creditType,
  })
  readonly creditType: string;

  @ApiProperty({
    description: "The product's 'lead days'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.leadDays,
  })
  readonly leadDays: ConfigurationLeadDaysOdsResponse;
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
    description: "The product's configuration",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration,
  })
  readonly configuration: ConfigurationOdsResponse;

  @ApiProperty({
    description: "The product's counterparty role types",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.counterpartyRoleTypes,
  })
  readonly counterpartyRoleTypes: string[];

  @ApiProperty({
    description: "The product's facility category subtypes",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.facilityCategoryTypes,
  })
  readonly facilityCategoryTypes: string[];

  @ApiProperty({
    description: "The product's obligation subtypes",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.obligationSubtypes,
  })
  readonly obligationSubtypes: string[];

  @ApiProperty({
    description: 'The UKEF accounts that the product is in',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.account,
  })
  readonly account: string[];

  @ApiProperty({
    description: "The product's additional rates",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.additionalRateTypes,
  })
  readonly additionalRateTypes: string[];

  @ApiProperty({
    description: "The product's base rates",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.baseRateTypes,
  })
  readonly baseRateTypes: string[];

  @ApiProperty({
    description: "The product's accrual schedule",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.accrualScheduleTypes,
  })
  readonly accrualScheduleTypes: string[];
}
