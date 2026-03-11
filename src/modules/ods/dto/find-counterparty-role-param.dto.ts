import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class FindCounterpartyRoleParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE,
    description: 'Unique counterparty role type',
  })
  @IsString()
  public roleType: string;
}
