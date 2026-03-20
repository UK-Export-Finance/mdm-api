import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

import { GetAccrualScheduleBaseDto } from './get-accrual-schedule-base.dto';

export class GetAccrualScheduleOdsResponseDto extends GetAccrualScheduleBaseDto {
  @ApiProperty({
    description: 'Accrual schedule type active flag',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.accrualScheduleTypeActive,
  })
  readonly accrualScheduleTypeActive: boolean;
}
