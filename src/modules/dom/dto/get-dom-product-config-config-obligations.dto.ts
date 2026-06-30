import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomProductConfigConfigObligations {
  @ApiProperty({
    description: 'If obligations can be added to the product at creation time',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.obligations.creation,
  })
  readonly creation: string;

  @ApiProperty({
    description: 'If obligations can be added to the product during its lifecycle',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.obligations.inLife,
  })
  readonly inLife: string;
}
