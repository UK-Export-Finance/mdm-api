import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetOdsDealResponse {
  @ApiProperty({
    description: 'Unique UKEF deal ID',
    example: EXAMPLES.DEAL.ID,
  })
  readonly dealId: string;

  @ApiProperty({
    description: 'Deal name',
    example: EXAMPLES.DEAL.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Deal description',
    example: EXAMPLES.DEAL.DESCRIPTION,
  })
  readonly description: string;
}
