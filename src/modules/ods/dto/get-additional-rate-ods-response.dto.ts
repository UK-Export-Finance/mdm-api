import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetAdditionalRateOdsResponseDto {
  @ApiProperty({
    description: 'Additional rate type',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.classification_type,
  })
  readonly classification_type: string;

  @ApiProperty({
    description: 'Additional rate type code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.classification_type_code,
  })
  readonly classification_type_code: string;

  @ApiProperty({
    description: 'Additional rate code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.classification_code,
  })
  readonly classification_code: string;

  @ApiProperty({
    description: 'Additional rate description',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.classification_description,
  })
  readonly classification_description: string;

  @ApiProperty({
    description: 'Optional accrual schedule classification numeric value',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.classification_numeric_value,
  })
  readonly classification_numeric_value?: number;

  @ApiProperty({
    description: 'Additional rate active flag',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.classification_active_flag,
  })
  readonly classification_active_flag: boolean;
}
