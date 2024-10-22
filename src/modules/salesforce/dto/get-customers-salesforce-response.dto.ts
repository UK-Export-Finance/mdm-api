import { ApiProperty } from '@nestjs/swagger';

export type GetCustomersSalesforceResponseItems = GetCustomersSalesforceResponseItem[];

export class GetCustomersSalesforceResponseItem {
  @ApiProperty({
    description: 'The unique Salesforce id of the customer',
  })
  readonly Id: string | null;

  @ApiProperty({
    description: 'The Party URN of the customer',
  })
  readonly Party_URN__c: string | null;

  @ApiProperty({
    description: 'The name of the customer',
  })
  readonly Name: string | null;

  @ApiProperty({
    description: 'The Customer Registration Number of the customer',
  })
  readonly Company_Registration_Number__c: string | null;
}

export class GetCustomersSalesforceResponse {
  @ApiProperty({
    description: 'Total number of records returned',
  })
  readonly totalSize: number;

  @ApiProperty({
    description: 'A boolean indicating whether there are no more results',
  })
  readonly done: boolean;
  
  @ApiProperty({
    description: 'The list of matching records',
    type: [GetCustomersSalesforceResponseItem],
  })
  readonly records: GetCustomersSalesforceResponseItems
};
