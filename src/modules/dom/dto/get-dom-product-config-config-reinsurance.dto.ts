import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomProductConfigConfigReinsurance {
  @ApiProperty({
    description: 'If reinsurance can be added to the product at creation time',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.reinsurance.creation,
  })
  readonly creation: string;

  @ApiProperty({
    description: 'If reinsurance can be added to the product during its lifecycle',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.reinsurance.inLife,
  })
  readonly inLife: string;
}
