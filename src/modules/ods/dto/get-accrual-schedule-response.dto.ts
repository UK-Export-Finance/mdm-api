import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetAccrualScheduleResponseDto {
  @ApiProperty({
    description: 'Accrual schedule classification type',
    example: EXAMPLES.ACCRUAL_SCHEDULE.TYPE,
  })
  readonly type: string;

  @ApiProperty({
    description: 'Accrual schedule classification type code',
    example: EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE,
  })
  readonly typeCode: string;

  @ApiProperty({
    description: 'Accrual schedule classification code',
    example: EXAMPLES.ACCRUAL_SCHEDULE.DESCRIPTION,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Accrual schedule classification description',
    example: EXAMPLES.ACCRUAL_SCHEDULE.DESCRIPTION,
  })
  readonly description: string;

  @ApiProperty({
    description: 'Optional accrual schedule classification numeric value',
    example: EXAMPLES.ACCRUAL_SCHEDULE.NUMERIC_VALUE,
  })
  readonly numericValue: number;

  @ApiProperty({
    description: 'Accrual schedule classification active flag',
    example: EXAMPLES.ACCRUAL_SCHEDULE.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
