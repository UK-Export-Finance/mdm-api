import { ApiProperty } from '@nestjs/swagger';
import { MOCK_PRODUCT_CONFIG } from '@ukef/constants';

export class GetDomProductConfigurationResponse {
  @ApiProperty({
    description: 'Mock product configuration',
    example: MOCK_PRODUCT_CONFIG.mockProduct,
  })
  readonly mockProduct: boolean;
}
