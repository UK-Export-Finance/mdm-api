import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsAdditionalRateParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.CODE,
    description: 'Unique additional rate code',
  })
  @IsString()
  public rateCode: string;
}
