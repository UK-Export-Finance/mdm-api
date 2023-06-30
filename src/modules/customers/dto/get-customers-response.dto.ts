import { ApiProperty } from '@nestjs/swagger';

export type GetCustomersResponse = GetCustomersResponseItem[];

export class GetCustomersResponseItem {
  @ApiProperty({
    description: '',
  })
  readonly partyUrn: string;

  @ApiProperty({
    description: '',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Uniqueue Salesforce id',
  })
  readonly sfId: string;

  @ApiProperty({
    description: '',
  })
  readonly companyRegNo: string;

  @ApiProperty({
    description: '',
  })
  readonly type: string;

  @ApiProperty({
    description: '',
  })
  readonly subtype: string;

  @ApiProperty({
    description: '',
  })
  readonly isLegacyRecord: string;
}
