import { ApiProperty } from '@nestjs/swagger';

export class GetOdsCustomerResponse {
  @ApiProperty({
    description: 'The unique UKEF id of the customer',
  })
  readonly urn: string;

  @ApiProperty({
    description: 'Customer name',
  })
  readonly name: string;
}
