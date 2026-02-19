import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomProductConfigConfigFees {
  @ApiProperty({
    description: "The product's 'fees - creation'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.fees.creation,
  })
  readonly creation: string;

  @ApiProperty({
    description: "The product's 'fees - inLife'",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration.fees.inLife,
  })
  readonly inLife: string;
}
