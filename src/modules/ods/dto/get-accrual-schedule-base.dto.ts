import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetAccrualScheduleBaseDto {
  @ApiProperty({
    description: 'Accrual schedule code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.code,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Accrual schedule name',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Accrual schedule rate type',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.accrualRateType,
  })
  readonly accrualRateType: string;

  @ApiProperty({
    description: 'Accrual schedule base balance category',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.baseBalanceCategory,
  })
  readonly baseBalanceCategory: string;

  @ApiProperty({
    description: 'Accrual schedule income class code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.incomeClassCode,
  })
  readonly incomeClassCode: string;
}
