import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetAccrualScheduleOdsResponseDto {
  @ApiProperty({
    description: 'Accrual schedule classification type',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.code,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Accrual schedule classification type code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Accrual schedule classification code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.accrualRateType,
  })
  readonly accrualRateType: string;

  @ApiProperty({
    description: 'Accrual schedule classification description',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.baseBalanceCategory,
  })
  readonly baseBalanceCategory: string;

  @ApiProperty({
    description: 'Optional accrual schedule classification numeric value',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.incomeClassCode,
  })
  readonly incomeClassCode?: number;

  @ApiProperty({
    description: 'Accrual schedule classification active flag',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.accrualScheduleTypeActive,
  })
  readonly accrualScheduleTypeActive: boolean;
}
