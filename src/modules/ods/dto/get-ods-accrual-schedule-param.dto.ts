import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsAccrualScheduleParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.ACCRUAL_SCHEDULE.CODE,
    description: 'Unique accrual schedule code',
  })
  @IsString()
  public scheduleTypeCode: string;
}
