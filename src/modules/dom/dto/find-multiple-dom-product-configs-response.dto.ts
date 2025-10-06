import { ApiProperty } from '@nestjs/swagger';

import { GetDomProductConfigResponse } from './get-dom-product-config-response.dto';

export class FindMultipleProductConfigsResponse {
  @ApiProperty({
    description: 'Multiple product configurations',
    example: GetDomProductConfigResponse,
  })
  rawDefinition?: GetDomProductConfigResponse;
}
