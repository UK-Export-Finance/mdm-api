import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

import { FindDomBusinessCentreNonWorkingDayMappedResponse } from './find-dom-business-centre-non-working-day-mapped-response.dto';

export class FindMultipleDomBusinessCentresNonWorkingDaysResponse {
  @ApiProperty({
    description: 'Business centre code',
    example: EXAMPLES.BUSINESS_CENTRE.CODE,
  })
  rawDefinition?: Record<string, FindDomBusinessCentreNonWorkingDayMappedResponse>;
}
