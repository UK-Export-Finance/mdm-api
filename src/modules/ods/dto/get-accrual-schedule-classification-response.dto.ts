import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetAccrualScheduleClassificationResponseDto {
  @ApiProperty({
    description: 'Accrual schedule classification type',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE,
  })
  readonly type: string;

  @ApiProperty({
    description: 'Accrual schedule classification type code',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE,
  })
  readonly typeCode: string;

  @ApiProperty({
    description: 'Accrual schedule classification code',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Accrual schedule classification description',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.DESCRIPTION,
  })
  readonly description: string;

  @ApiProperty({
    description: 'Accrual schedule classification active flag',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
