import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetAdditionalRateResponseDto {
  @ApiProperty({
    description: 'Additional rate type',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.TYPE,
  })
  readonly type: string;

  @ApiProperty({
    description: 'Additional rate type code',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.TYPE_CODE,
  })
  readonly typeCode: string;

  @ApiProperty({
    description: 'Additional rate code',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Additional rate description',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.DESCRIPTION,
  })
  readonly description: string;

  @ApiProperty({
    description: 'Additional rate active flag',
    example: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
