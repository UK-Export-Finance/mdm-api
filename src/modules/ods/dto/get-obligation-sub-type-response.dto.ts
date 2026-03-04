import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetObligationSubTypeResponseDto {
  @ApiProperty({
    description: 'Obligation sub-type classification type',
    example: EXAMPLES.OBLIGATION_SUB_TYPE.TYPE,
  })
  readonly type: string;

  @ApiProperty({
    description: 'Obligation sub-type classification type code',
    example: EXAMPLES.OBLIGATION_SUB_TYPE.TYPE_CODE,
  })
  readonly typeCode: string;

  @ApiProperty({
    description: 'Obligation sub-type classification code',
    example: EXAMPLES.OBLIGATION_SUB_TYPE.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Obligation sub-type classification description',
    example: EXAMPLES.OBLIGATION_SUB_TYPE.DESCRIPTION,
  })
  readonly description: string;

  @ApiProperty({
    description: 'Obligation sub-type active flag',
    example: EXAMPLES.OBLIGATION_SUB_TYPE.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
