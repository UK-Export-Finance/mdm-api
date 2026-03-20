import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsAccrualScheduleParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.code,
    description: 'Unique accrual schedule code',
  })
  @IsString()
  public scheduleCode: string;
}
