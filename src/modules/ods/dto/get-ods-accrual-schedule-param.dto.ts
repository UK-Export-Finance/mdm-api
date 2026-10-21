import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class GetOdsAccrualScheduleParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.code,
    description: 'Unique accrual schedule code',
  })
  @IsString()
  public scheduleCode: string;
}
