import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetObligationSubtypeResponseDto {
  @ApiProperty({
    description: 'Obligation subtype code',
    example: EXAMPLES.OBLIGATION_SUBTYPE.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Obligation subtype description',
    example: EXAMPLES.OBLIGATION_SUBTYPE.DESCRIPTION,
  })
  readonly description: string;

  @ApiProperty({
    description: 'Obligation subtype balance category',
    example: EXAMPLES.OBLIGATION_SUBTYPE.BALANCE_CATEGORY,
  })
  readonly balanceCategory: string;

  @ApiProperty({
    description: 'Obligation subtype active flag',
    example: EXAMPLES.OBLIGATION_SUBTYPE.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
