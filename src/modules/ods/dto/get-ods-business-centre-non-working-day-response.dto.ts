import { ApiProperty } from '@nestjs/swagger';
import { BUSINESS_CENTRE } from '@ukef/constants';

export class GetOdsBusinessCentreNonWorkingDayResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: BUSINESS_CENTRE.EXAMPLES.CODE,
  })
  readonly business_centre_code: string;

  @ApiProperty({
    description: 'Non working day name',
    example: BUSINESS_CENTRE.EXAMPLES.NON_WORKING_DAY.NAME,
  })
  readonly non_working_day_name: string;

  @ApiProperty({
    description: 'Non working day date',
    example: BUSINESS_CENTRE.EXAMPLES.NON_WORKING_DAY.DATE,
  })
  readonly non_working_day_date: string;
}
