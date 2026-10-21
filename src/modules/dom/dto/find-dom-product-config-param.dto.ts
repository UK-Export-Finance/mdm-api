import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class FindDomProductConfigParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.DOM.PRODUCT_CONFIG.BIP.productType,
    description: 'Unique product type',
  })
  @IsString()
  public productType: string;
}
