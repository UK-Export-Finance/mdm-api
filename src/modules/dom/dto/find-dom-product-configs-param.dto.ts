import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class FindDomProductConfigsParam {
  @ApiProperty({
    required: true,
    example: `${EXAMPLES.PRODUCT_TYPES.BIP},${EXAMPLES.PRODUCT_TYPES.EXIP}`,
    description: 'Unique product types - separated by commas',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  public productTypes: string;
}
