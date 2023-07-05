import { ApiProperty } from '@nestjs/swagger';

export type GetCustomersResponse = GetCustomersResponseItem[];

export class GetCustomersResponseItem {
  @ApiProperty({
    description: '',
  })
  readonly partyUrn: string | null;

  @ApiProperty({
    description: 'Customer company name',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Uniqueue Salesforce id',
  })
  readonly sfId: string;

  @ApiProperty({
    description: 'Companies house registration number',
  })
  readonly companyRegNo: string | null;

  @ApiProperty({
    description: 'Customer company type',
  })
  readonly type: string | null;

  @ApiProperty({
    description: 'Customer company sub-type',
  })
  readonly subtype: string | null;

  @ApiProperty({
    description: '',
  })
  readonly isLegacyRecord: boolean;
}
