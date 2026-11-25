import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetObligationSubtypeOdsResponseDto {
  @ApiProperty({
    description: 'Obligation subtype code',
    example: EXAMPLES.ODS.CONFIGURATION_OBLIGATION_SUBTYPE.code,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Obligation subtype name',
    example: EXAMPLES.ODS.CONFIGURATION_OBLIGATION_SUBTYPE.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Obligation subtype balance category',
    example: EXAMPLES.ODS.CONFIGURATION_OBLIGATION_SUBTYPE.balanceCategory,
  })
  readonly balanceCategory: string;

  @ApiProperty({
    description: 'Obligation subtype active',
    example: EXAMPLES.ODS.CONFIGURATION_OBLIGATION_SUBTYPE.obligationSubtypeActive,
  })
  readonly obligationSubtypeActive: boolean;
}
