import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class FindCounterpartyRoleParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE,
    description: 'Unique counterparty role type',
  })
  @IsString()
  public roleType: string;
}
