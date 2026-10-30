import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { EXAMPLES, REGEX } from '@ukef/constants';
import { regexToString } from '@ukef/helpers/regex.helper';

export class GetOdsDealParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.DEAL.ID,
    description: 'Unique UKEF deal ID',
    pattern: regexToString(REGEX.TEN_DIGIT_UKEF_ID),
  })
  @Matches(REGEX.TEN_DIGIT_UKEF_ID)
  public id: string;
}
