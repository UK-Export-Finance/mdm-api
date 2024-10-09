import { ApiProperty } from '@nestjs/swagger';

export type GetCustomersDirectResponseItems = GetCustomersDirectResponseItem[];

export class GetCustomersDirectResponse {
  @ApiProperty({
    description: 'Total numer of records returned',
  })
  readonly totalSize: number;

  @ApiProperty({
    description: 'A boolean indicating whether there are no more results',
  })
  readonly done: boolean;
  
  @ApiProperty({
    description: 'The list of matching records'
  })
  readonly records: GetCustomersDirectResponseItems
};

export class GetCustomersDirectResponseItem {
  @ApiProperty({
    description: 'The unique Salesforce id of the customer',
  })
  readonly Id: string | null;
}
