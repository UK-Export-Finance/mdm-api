import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetAccrualScheduleOdsResponseDto {
  @ApiProperty({
    description: 'Accrual schedule classification type',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.classification_type,
  })
  readonly classification_type: string;

  @ApiProperty({
    description: 'Accrual schedule classification type code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.classification_type_code,
  })
  readonly classification_type_code: string;

  @ApiProperty({
    description: 'Accrual schedule classification code',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.classification_code,
  })
  readonly classification_code: string;

  @ApiProperty({
    description: 'Accrual schedule classification description',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.classification_description,
  })
  readonly classification_description: string;

  @ApiProperty({
    description: 'Optional accrual schedule classification numeric value',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.classification_numeric_value,
  })
  readonly classification_numeric_value: number;

  @ApiProperty({
    description: 'Accrual schedule classification active flag',
    example: EXAMPLES.ODS.ACCRUAL_SCHEDULE.classification_active_flag,
  })
  readonly classification_active_flag: boolean;
}
