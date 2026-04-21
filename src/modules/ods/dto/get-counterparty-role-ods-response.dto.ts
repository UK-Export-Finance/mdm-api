import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetCounterpartyRoleOdsResponseDto {
  @ApiProperty({
    description: 'Counterparty role type',
    example: EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE.counterpartyRoleType,
  })
  readonly counterpartyRoleType: string;

  @ApiProperty({
    description: 'Counterparty role name',
    example: EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Counterparty role has share percentage flag',
    example: EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE.hasSharePercentage,
  })
  readonly hasSharePercentage: boolean;

  @ApiProperty({
    description: 'Counterparty role active flag',
    example: EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE.counterpartyRoleTypeActive,
  })
  readonly counterpartyRoleTypeActive: boolean;
}
