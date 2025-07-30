import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomProductConfigurationResponse {
  @ApiProperty({
    description: 'Mock product configuration',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.mockProduct,
  })
  readonly mockProduct: boolean;
}
