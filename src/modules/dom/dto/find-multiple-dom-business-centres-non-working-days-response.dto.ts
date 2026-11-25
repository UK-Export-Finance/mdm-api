import { ApiProperty } from '@nestjs/swagger';

import { FindOdsBusinessCentreOdsResponseNonWorkingDayMappedResponse } from './find-dom-business-centre-non-working-day-mapped-response.dto';

export class FindMultipleOdsBusinessCentreOdsResponsesNonWorkingDaysResponse {
  @ApiProperty({
    description: "Multiple business centre's non working days",
    example: FindOdsBusinessCentreOdsResponseNonWorkingDayMappedResponse,
  })
  rawDefinition?: FindOdsBusinessCentreOdsResponseNonWorkingDayMappedResponse;
}
