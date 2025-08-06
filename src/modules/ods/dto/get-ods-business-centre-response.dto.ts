import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetOdsBusinessCentreResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: EXAMPLES.BUSINESS_CENTRE.CODE,
  })
  readonly business_centre_code: string;

  @ApiProperty({
    description: 'Business centre name',
    example: EXAMPLES.BUSINESS_CENTRE.NAME,
  })
  readonly business_centre_name: string;
}
