import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class GetOdsFeeTypeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.FEE_TYPE.FEE_TYPE,
    description: 'Unique fee type code',
  })
  @IsString()
  public feeTypeCode: string;
}
