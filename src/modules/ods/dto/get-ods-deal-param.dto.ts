import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES, UKEFID } from '@ukef/constants';
import { regexToString } from '@ukef/helpers/regex.helper';
import { Matches } from 'class-validator';

export class GetOdsDealParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.DEAL.ID,
    description: 'Unique UKEF deal ID',
    pattern: regexToString(UKEFID.MAIN_ID.TEN_DIGIT_REGEX),
  })
  @Matches(UKEFID.MAIN_ID.TEN_DIGIT_REGEX)
  public id: string;
}
