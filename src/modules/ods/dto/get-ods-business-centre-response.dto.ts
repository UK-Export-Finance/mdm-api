import { ApiProperty } from '@nestjs/swagger';
import { BUSINESS_CENTRE } from '@ukef/constants';

export class GetOdsBusinessCentreResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: BUSINESS_CENTRE.EXAMPLES.CODE,
  })
  readonly business_centre_code: string;

  @ApiProperty({
    description: 'Business centre name',
    example: BUSINESS_CENTRE.EXAMPLES.NAME,
  })
  readonly business_centre_name: string;
}
