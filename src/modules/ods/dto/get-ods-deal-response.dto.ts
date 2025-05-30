import { ApiProperty } from '@nestjs/swagger';

export class GetOdsDealResponse {
  @ApiProperty({
    description: 'The unique UKEF ID of the deal',
    example: '0030000321',
  })
  readonly dealId: string;
}
