import { ApiProperty } from '@nestjs/swagger';

export type GetCustomersDirectResponseItems = GetCustomersDirectResponseItem[];

export class GetCustomersDirectResponseItem {
  @ApiProperty({
    description: 'The unique Salesforce id of the customer',
  })
  readonly Id: string | null;

  @ApiProperty({
    description: 'The Party URN of the customer',
  })
  readonly Party_URN__c: string | null;
}

export class GetCustomersDirectResponse {
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
    type: [GetCustomersDirectResponseItem],
  })
  readonly records: GetCustomersDirectResponseItems
};
