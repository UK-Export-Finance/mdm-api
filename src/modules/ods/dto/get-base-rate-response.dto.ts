import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetBaseRateResponseDto {
  @ApiProperty({
    description: 'Base rate type',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.TYPE,
  })
  readonly type: string;

  @ApiProperty({
    description: 'Base rate type code',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.TYPE_CODE,
  })
  readonly typeCode: string;

  @ApiProperty({
    description: 'Base rate code',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Base rate description',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.DESCRIPTION,
  })
  readonly description: string;

  @ApiProperty({
    description: 'Base rate active flag',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
