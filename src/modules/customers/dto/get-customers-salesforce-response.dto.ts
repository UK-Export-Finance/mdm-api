import { ApiProperty } from '@nestjs/swagger';

export type GetCustomersSalesforceResponse = GetCustomersSalesforceResponseItem[];

export class GetCustomersSalesforceResponseItem {
  @ApiProperty({
    description: 'The unique UKEF id of the customer',
  })
  readonly partyUrn: string | null;

  @ApiProperty({
    description: 'The name of the Salesforce customer',
  })
  readonly name: string;

  @ApiProperty({
    description: 'The unique Salesforce id',
  })
  readonly sfId: string;

  @ApiProperty({
    description: 'The Companies house registration number',
  })
  readonly companyRegNo: string | null;
}
