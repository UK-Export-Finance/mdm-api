import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

import { GetDomProductConfigConfigAccrualSchedule } from './get-dom-product-config-config-accrual-schedule.dto';
import { GetDomProductConfigConfigFees } from './get-dom-product-config-config-fees.dto';
import { GetDomProductConfigConfigLeadDays } from './get-dom-product-config-config-lead-days.dto';

export class GetDomProductConfigConfig {
  @ApiProperty({
    description: "The product's 'commitment date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.commitmentDate,
  })
  readonly commitmentDate: string;

  @ApiProperty({
    description: "The product's 'issued date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.issuedDate,
  })
  readonly issuedDate: string;

  @ApiProperty({
    description: "The product's 'effective date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.effectiveDate,
  })
  readonly effectiveDate: string;

  @ApiProperty({
    description: "The product's 'availability end date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.availabilityEndDate,
  })
  readonly availabilityEndDate: string;

  @ApiProperty({
    description: "The product's 'expiry date' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.expiryDate,
  })
  readonly expiryDate: string;

  @ApiProperty({
    description: "The product's 'credit type' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.creditType,
  })
  readonly creditType: string;

  @ApiProperty({
    description: "The product's 'participations' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.participations,
  })
  readonly participations: string;

  @ApiProperty({
    description: "The product's 'scheduled repayments' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.scheduledRepayments,
  })
  readonly scheduledRepayments: string;

  @ApiProperty({
    description: "The product's 'non cash obligations' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.nonCashObligations,
  })
  readonly nonCashObligations: string;

  @ApiProperty({
    description: "The product's 'cash obligations' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.cashObligations,
  })
  readonly cashObligations: string;

  @ApiProperty({
    description: "The product's 'accural schedule' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.accrualSchedule,
  })
  readonly accrualSchedule: string;

  @ApiProperty({
    description: "The product's 'PIM owner' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.pimOwner,
  })
  readonly pimOwner: string;

  @ApiProperty({
    description: "The product's 'risk rating' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.riskRating,
  })
  readonly riskRating: string;

  @ApiProperty({
    description: "The product's 'pre credit period' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.preCreditPeriod,
  })
  readonly preCreditPeriod: string;

  @ApiProperty({
    description: "The product's 'credit period' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.creditPeriod,
  })
  readonly creditPeriod: string;

  @ApiProperty({
    description: "The product's 'loss given default' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.lossGivenDefault,
  })
  readonly lossGivenDefault: string;

  @ApiProperty({
    description: "The product's 'provision rate' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.provisionRate,
  })
  readonly provisionRate: string;

  @ApiProperty({
    description: "The product's 'forecast year' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.forecastYear,
  })
  readonly forecastYear: string;

  @ApiProperty({
    description: "The product's 'bank rate' requirement",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.bankRate,
  })
  readonly bankRate: string;

  @ApiProperty({
    description: "The product's 'accrual schedules'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.accrualSchedules,
  })
  readonly accrualSchedules: GetDomProductConfigConfigAccrualSchedule[];

  @ApiProperty({
    description: "The product's 'fees'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.fees,
  })
  readonly fees: GetDomProductConfigConfigFees;

  @ApiProperty({
    description: "The product's 'lead days'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.leadDays,
  })
  readonly leadDays: GetDomProductConfigConfigLeadDays;
}
