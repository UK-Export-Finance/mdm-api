import { ApiProperty } from '@nestjs/swagger';

export class GetOdsCustomerResponse {
  @ApiProperty({
    description: 'The unique UKEF id of the customer',
  })
  readonly customerUrn: string;

  @ApiProperty({
    description: 'Customer company name',
  })
  readonly customerName: string;
}
