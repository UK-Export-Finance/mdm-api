import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class FindOdsBusinessCentreOdsResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: EXAMPLES.BUSINESS_CENTRE.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Business centre name',
    example: EXAMPLES.BUSINESS_CENTRE.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Business centre description',
    example: EXAMPLES.BUSINESS_CENTRE.DESCRIPTION,
  })
  readonly description: string;

  @ApiProperty({
    description: 'Business centre active flag',
    example: EXAMPLES.BUSINESS_CENTRE.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
