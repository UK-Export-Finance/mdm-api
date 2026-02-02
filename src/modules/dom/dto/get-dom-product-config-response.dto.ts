import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

import { GetDomProductConfigConfig } from './get-dom-product-config-config.dto';

export class GetDomProductConfigResponse {
  @ApiProperty({
    description: 'The product type',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.productType,
  })
  readonly productType: string;

  @ApiProperty({
    description: 'The product name',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'The product short name',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.shortName,
  })
  readonly shortName: string;

  @ApiProperty({
    description: "The product's configuration",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.configuration,
  })
  readonly configuration: GetDomProductConfigConfig;

  @ApiProperty({
    description: "The product's counterparty role types",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.counterpartyRoleTypes,
  })
  readonly counterpartyRoleTypes: string[];

  @ApiProperty({
    description: "The product's facility category subtypes",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.facilityCategoryTypes,
  })
  readonly facilityCategoryTypes: string[];

  @ApiProperty({
    description: "The product's obligation subtypes",
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.obligationSubtypes,
  })
  readonly obligationSubtypes: string[];

  @ApiProperty({
    description: 'The UKEF accounts that the product is in',
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.account,
  })
  readonly account: string[];
}
