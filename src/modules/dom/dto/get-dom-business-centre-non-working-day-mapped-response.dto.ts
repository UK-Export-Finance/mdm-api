import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetDomBusinessCentreNonWorkingDayMappedResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: EXAMPLES.BUSINESS_CENTRE.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Non working day name',
    example: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Non working day date',
    example: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
  })
  readonly date: string;
}
