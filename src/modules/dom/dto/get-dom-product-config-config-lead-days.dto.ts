import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomProductConfigConfigLeadDays {
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
