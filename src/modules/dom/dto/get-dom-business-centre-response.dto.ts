import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomBusinessCentreResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: EXAMPLES.BUSINESS_CENTRE.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Non working day name',
    example: EXAMPLES.BUSINESS_CENTRE.NAME,
  })
  readonly name: string;
}
