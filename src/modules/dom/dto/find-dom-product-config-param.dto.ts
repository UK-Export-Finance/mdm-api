import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class FindDomProductConfigParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.DOM.PRODUCT_CONFIG.productType,
    description: 'Unique product type',
  })
  @IsString()
  public productType: string;
}
