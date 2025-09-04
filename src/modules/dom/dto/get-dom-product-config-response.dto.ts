import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

import { GetDomProductConfigConfig } from './get-dom-product-config-config.dto';

export class GetDomProductConfigResponse {
  @ApiProperty({
    description: 'The product type',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.productType,
  })
  readonly productType: string;

  @ApiProperty({
    description: "The product's configuration",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.configuration,
  })
  readonly configuration: GetDomProductConfigConfig;

  @ApiProperty({
    description: "The product's counterparty subtypes",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.counterpartySubtypes,
  })
  readonly counterpartySubtypes: string[];

  @ApiProperty({
    description: "The product's subtypes",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.productSubtypes,
  })
  readonly productSubtypes: string[];

  @ApiProperty({
    description: 'The UKEF accounts that the product is in',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.account,
  })
  readonly account: string[];
}
