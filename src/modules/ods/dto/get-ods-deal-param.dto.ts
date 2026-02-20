import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES, UKEF_ID } from '@ukef/constants';
import { regexToString } from '@ukef/helpers/regex.helper';
import { Matches } from 'class-validator';

export class GetOdsDealParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.DEAL.ID,
    description: 'Unique UKEF deal ID',
    pattern: regexToString(UKEF_ID.MAIN_ID.TEN_DIGIT_REGEX),
  })
  @Matches(UKEF_ID.MAIN_ID.TEN_DIGIT_REGEX)
  public id: string;
}
