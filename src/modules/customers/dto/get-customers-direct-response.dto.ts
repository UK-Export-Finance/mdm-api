import { ApiProperty } from '@nestjs/swagger';

export type GetCustomersDirectResponseItems = GetCustomersDirectResponseItem[];

export class GetCustomersDirectResponse {
  @ApiProperty({
    description: 'The unique UKEF id of the customer',
  })
  readonly totalSize: number;

  @ApiProperty({
    description: 'The unique UKEF id of the customer',
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
