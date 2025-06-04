import { ApiProperty } from '@nestjs/swagger';
import { DEALS, UKEFID } from '@ukef/constants';
import { regexToString } from '@ukef/helpers/regex.helper';
import { Matches } from 'class-validator';

export class GetOdsDealParamDto {
  @ApiProperty({
    required: true,
    example: DEALS.EXAMPLES.ID,
    description: 'The unique UKEF ID of the deal to search for.',
    pattern: regexToString(UKEFID.MAIN_ID.TEN_DIGIT_REGEX),
  })
  @Matches(UKEFID.MAIN_ID.TEN_DIGIT_REGEX)
  public id: string;
}
