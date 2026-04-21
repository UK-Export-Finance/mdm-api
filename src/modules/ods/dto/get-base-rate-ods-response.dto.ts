import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetBaseRateOdsResponseDto {
  @ApiProperty({
    description: 'Base rate type',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.classification_type,
  })
  readonly classification_type: string;

  @ApiProperty({
    description: 'Base rate type code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.classification_type_code,
  })
  readonly classification_type_code: string;

  @ApiProperty({
    description: 'Base rate code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.classification_code,
  })
  readonly classification_code: string;

  @ApiProperty({
    description: 'Base rate description',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.classification_description,
  })
  readonly classification_description: string;

  @ApiProperty({
    description: 'Optional base rate numeric value',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.classification_numeric_value,
  })
  readonly classification_numeric_value?: number;

  @ApiProperty({
    description: 'Base rate active flag',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.classification_active_flag,
  })
  readonly classification_active_flag: boolean;
}
