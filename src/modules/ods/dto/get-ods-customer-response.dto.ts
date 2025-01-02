import { ApiProperty } from '@nestjs/swagger';

export class GetOdsCustomerResponse {
  @ApiProperty({
    description: 'The unique UKEF id of the customer',
  })
  readonly partyUrn: string;

  @ApiProperty({
    description: 'Customer company name',
  })
  readonly name: string;
}
