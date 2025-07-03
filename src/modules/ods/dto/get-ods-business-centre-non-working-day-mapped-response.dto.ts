import { ApiProperty } from '@nestjs/swagger';
import { BUSINESS_CENTRE } from '@ukef/constants';

export class GetOdsBusinessCentreNonWorkingDayMappedResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: BUSINESS_CENTRE.EXAMPLES.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Non working day name',
    example: BUSINESS_CENTRE.EXAMPLES.NON_WORKING_DAY.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Non working day date',
    example: BUSINESS_CENTRE.EXAMPLES.NON_WORKING_DAY.DATE,
  })
  readonly date: string;
}
