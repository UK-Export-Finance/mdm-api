import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

// TODO - update examples

export class GetFacilityCategoryOdsResponseDto {
  @ApiProperty({
    description: 'Facility category type',
    example: EXAMPLES.ODS.FACILITY_CLASSIFICATION.classification_type,
  })
  readonly classification_type: string;

  @ApiProperty({
    description: 'Facility category type code',
    example: EXAMPLES.ODS.FACILITY_CLASSIFICATION.classification_type_code,
  })
  readonly classification_type_code: string;

  @ApiProperty({
    description: 'Facility category code',
    example: EXAMPLES.ODS.FACILITY_CLASSIFICATION.classification_code,
  })
  readonly classification_code: string;

  @ApiProperty({
    description: 'Facility category description',
    example: EXAMPLES.ODS.FACILITY_CLASSIFICATION.classification_description,
  })
  readonly classification_description: string;

  @ApiProperty({
    description: 'Optional facility category numeric value',
    example: EXAMPLES.ODS.FACILITY_CLASSIFICATION.classification_numeric_value,
  })
  readonly classification_numeric_value?: number;

  @ApiProperty({
    description: 'Facility category active flag',
    example: EXAMPLES.ODS.FACILITY_CLASSIFICATION.classification_active_flag,
  })
  readonly classification_active_flag: boolean;
}
