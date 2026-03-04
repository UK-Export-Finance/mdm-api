import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetObligationSubtypeOdsResponseDto {
  @ApiProperty({
    description: 'Obligation subtype classification type',
    example: EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_type,
  })
  readonly classification_type: string;

  @ApiProperty({
    description: 'Obligation subtype classification type code',
    example: EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_type_code,
  })
  readonly classification_type_code: string;

  @ApiProperty({
    description: 'Obligation subtype classification code',
    example: EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_code,
  })
  readonly classification_code: string;

  @ApiProperty({
    description: 'Obligation subtype classification description',
    example: EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_description,
  })
  readonly classification_description: string;

  @ApiProperty({
    description: 'Obligation subtype active flag',
    example: EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_active_flag,
  })
  readonly classification_active_flag: boolean;
}
