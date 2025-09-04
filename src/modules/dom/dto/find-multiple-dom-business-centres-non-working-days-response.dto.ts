import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

import { GetDomBusinessCentreNonWorkingDayMappedResponse } from './get-dom-business-centre-non-working-day-mapped-response.dto';

export class FindMultipleDomBusinessCentresNonWorkingDaysResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: EXAMPLES.BUSINESS_CENTRE.CODE,
  })
  rawDefinition?: Record<string, GetDomBusinessCentreNonWorkingDayMappedResponse>;
}
