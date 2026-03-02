import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsAccrualScheduleParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE,
    description: 'Unique accrual schedule type code',
  })
  @IsString()
  public scheduleTypeCode: string;
}
