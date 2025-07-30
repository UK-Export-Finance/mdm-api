import { ApiProperty } from '@nestjs/swagger';
import { BUSINESS_CENTRE } from '@ukef/constants';

export class GetDomBusinessCentreResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: BUSINESS_CENTRE.EXAMPLES.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Non working day name',
    example: BUSINESS_CENTRE.EXAMPLES.NAME,
  })
  readonly name: string;
}
