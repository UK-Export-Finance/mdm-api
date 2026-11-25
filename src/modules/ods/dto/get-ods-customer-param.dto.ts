import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { EXAMPLES, REGEX } from '@ukef/constants';
import { regexToString } from '@ukef/helpers/regex.helper';

export class GetOdsCustomerParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.CUSTOMER.PARTYURN,
    description: 'Unique UKEF customer ID',
    pattern: regexToString(REGEX.EIGHT_DIGIT_UKEF_ID),
  })
  @Matches(REGEX.EIGHT_DIGIT_UKEF_ID)
  public urn: string;
}
