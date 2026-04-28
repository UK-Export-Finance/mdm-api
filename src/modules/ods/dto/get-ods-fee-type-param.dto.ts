import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetOdsFeeTypeParamDto {
  @ApiProperty({
    required: true,
    example: 'BEX',
    description: 'Unique fee type code',
  })
  @IsString()
  public feeTypeCode: string;
}
