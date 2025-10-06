import { ApiProperty } from '@nestjs/swagger';

import { FindDomBusinessCentreNonWorkingDayMappedResponse } from './find-dom-business-centre-non-working-day-mapped-response.dto';

export class FindMultipleDomBusinessCentresNonWorkingDaysResponse {
  @ApiProperty({
    description: "Multiple business centre's non working days",
    example: FindDomBusinessCentreNonWorkingDayMappedResponse,
  })
  rawDefinition?: FindDomBusinessCentreNonWorkingDayMappedResponse;
}
