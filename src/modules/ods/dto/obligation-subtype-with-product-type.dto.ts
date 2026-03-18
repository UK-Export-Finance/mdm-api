import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

import { GetObligationSubtypeResponseDto } from './get-obligation-subtype-response.dto';

export class ObligationSubtypeWithProductTypeDto extends GetObligationSubtypeResponseDto {
  @ApiProperty({
    description: 'The product type code',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.productType,
  })
  readonly productTypeCode: string;
}
