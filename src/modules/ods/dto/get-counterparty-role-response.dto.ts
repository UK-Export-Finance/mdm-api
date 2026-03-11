import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetCounterpartyRoleResponseDto {
  @ApiProperty({
    description: 'Counterparty role type',
    example: EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE,
  })
  readonly roleType: string;

  @ApiProperty({
    description: 'Counterparty role name',
    example: EXAMPLES.COUNTERPARTY_ROLE.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Counterparty role has share percentage flag',
    example: EXAMPLES.COUNTERPARTY_ROLE.HAS_SHARE_PERCENTAGE,
  })
  readonly hasSharePercentage: boolean;

  @ApiProperty({
    description: 'Counterparty role active flag',
    example: EXAMPLES.COUNTERPARTY_ROLE.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
