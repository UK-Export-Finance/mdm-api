import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomProductConfigConfig {
  @ApiProperty({
    description: "The product's 'commitment date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.commitmentDate,
  })
  readonly commitmentDate: string;

  @ApiProperty({
    description: "The product's 'issued date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.issuedDate,
  })
  readonly issuedDate: string;

  @ApiProperty({
    description: "The product's 'effective date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.effectiveDate,
  })
  readonly effectiveDate: string;

  @ApiProperty({
    description: "The product's 'availability end date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.availabilityEndDate,
  })
  readonly availabilityEndDate: string;

  @ApiProperty({
    description: "The product's 'expiry date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.expiryDate,
  })
  readonly expiryDate: string;

  @ApiProperty({
    description: "The product's 'credit type' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.creditType,
  })
  readonly creditType: string;

  @ApiProperty({
    description: "The product's 'participations' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.participations,
  })
  readonly participations: string;

  @ApiProperty({
    description: "The product's 'scheduled repayments' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.scheduledRepayments,
  })
  readonly scheduledRepayments: string;

  @ApiProperty({
    description: "The product's 'non cash obligations' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.nonCashObligations,
  })
  readonly nonCashObligations: string;

  @ApiProperty({
    description: "The product's 'cash obligations' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.cashObligations,
  })
  readonly cashObligations: string;

  @ApiProperty({
    description: "The product's 'accural schedule' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.accrualSchedule,
  })
  readonly accrualSchedule: string;

  @ApiProperty({
    description: "The product's 'PIM owner' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.pimOwner,
  })
  readonly pimOwner: string;

  @ApiProperty({
    description: "The product's 'risk rating' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.riskRating,
  })
  readonly riskRating: string;

  @ApiProperty({
    description: "The product's 'pre credit period' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.preCreditPeriod,
  })
  readonly preCreditPeriod: string;

  @ApiProperty({
    description: "The product's 'credit period' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.creditPeriod,
  })
  readonly creditPeriod: string;

  @ApiProperty({
    description: "The product's 'loss given default' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.lossGivenDefault,
  })
  readonly lossGivenDefault: string;

  @ApiProperty({
    description: "The product's 'provision rate' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.provisionRate,
  })
  readonly provisionRate: string;

  @ApiProperty({
    description: "The product's 'forecast year' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.forecastYear,
  })
  readonly forecastYear: string;

  @ApiProperty({
    description: "The product's 'bank rate' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration.bankRate,
  })
  readonly bankRate: string;
}
