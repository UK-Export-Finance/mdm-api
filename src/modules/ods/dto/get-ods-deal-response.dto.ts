import { ApiProperty } from '@nestjs/swagger';
import { DEALS } from '@ukef/constants';

export class GetOdsDealResponse {
  @ApiProperty({
    description: 'The unique UKEF ID of the deal',
    example: DEALS.EXAMPLES.ID,
  })
  readonly dealId: string;

  @ApiProperty({
    description: 'The name of the deal',
    example: DEALS.EXAMPLES.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'The description of the deal',
    example: DEALS.EXAMPLES.DESCRIPTION,
  })
  readonly description: string;
}
