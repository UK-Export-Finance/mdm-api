import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomProductConfigConfigFees {
  @ApiProperty({
    description: 'If fees can be added to the product at creation time',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.fees.creation,
  })
  readonly creation: string;

  @ApiProperty({
    description: 'If fees can be added to the product during its lifecycle',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.fees.inLife,
  })
  readonly inLife: string;
}
