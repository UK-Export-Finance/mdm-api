import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

import { GetAccrualScheduleBaseDto } from './get-accrual-schedule-base.dto';

export class GetAccrualScheduleResponseDto extends GetAccrualScheduleBaseDto {
  @ApiProperty({
    description: 'Accrual schedule classification active flag',
    example: EXAMPLES.ACCRUAL_SCHEDULE.isActive,
  })
  readonly isActive: boolean;
}
