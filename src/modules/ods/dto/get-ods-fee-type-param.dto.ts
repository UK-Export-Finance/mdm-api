import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsFeeTypeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.FEE_TYPE.FEE_TYPE,
    description: 'Unique fee type code',
  })
  @IsString()
  public feeTypeCode: string;
}
