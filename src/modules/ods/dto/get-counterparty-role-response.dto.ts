import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetCounterpartyRoleResponseDto {
  @ApiProperty({
    description: 'Counterparty role type',
    example: EXAMPLES.COUNTERPARTY_ROLE.roleType,
  })
  readonly roleType: string;

  @ApiProperty({
    description: 'Counterparty role name',
    example: EXAMPLES.COUNTERPARTY_ROLE.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Counterparty role has share percentage flag',
    example: EXAMPLES.COUNTERPARTY_ROLE.hasSharePercentage,
  })
  readonly hasSharePercentage: boolean;

  @ApiProperty({
    description: 'Counterparty role active flag',
    example: EXAMPLES.COUNTERPARTY_ROLE.isActive,
  })
  readonly isActive: boolean;
}
