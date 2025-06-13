import { ApiProperty } from '@nestjs/swagger';
import { DEALS } from '@ukef/constants';

export class GetOdsDealResponse {
  @ApiProperty({
    description: 'Unique UKEF deal ID',
    example: DEALS.EXAMPLES.ID,
  })
  readonly dealId: string;

  @ApiProperty({
    description: 'Deal name',
    example: DEALS.EXAMPLES.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Deal description',
    example: DEALS.EXAMPLES.DESCRIPTION,
  })
  readonly description: string;
}
