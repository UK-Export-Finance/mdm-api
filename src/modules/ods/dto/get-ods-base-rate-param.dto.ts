import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class GetOdsBaseRateParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.CODE,
    description: 'Unique base rate code',
  })
  @IsString()
  public rateCode: string;
}
