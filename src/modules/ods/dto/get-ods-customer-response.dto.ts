import { ApiProperty } from '@nestjs/swagger';

export class GetOdsCustomerResponse {
  @ApiProperty({
    description: 'Unique UKEF customer ID',
    example: '00312345',
  })
  readonly urn: string;

  @ApiProperty({
    description: 'Customer name',
    example: 'Test Company name',
  })
  readonly name: string;
}
