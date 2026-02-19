import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomProductConfigConfigAccrualSchedule {
  @ApiProperty({
    description: "The product's 'accrual schedule - code'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.accrualSchedules[0].code,
  })
  readonly code: string;

  @ApiProperty({
    description: "The product's 'accrual schedule - cash indicator'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.accrualSchedules[0].cashIndicator,
  })
  readonly cashIndicator: boolean;
}
