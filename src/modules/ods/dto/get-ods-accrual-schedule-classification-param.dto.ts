import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsAccrualScheduleClassificationParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.CODE,
    description: 'Unique accrual schedule classification code',
  })
  @IsString()
  public classificationCode: string;
}
