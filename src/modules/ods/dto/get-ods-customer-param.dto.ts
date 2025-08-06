import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES, UKEFID } from '@ukef/constants';
import { regexToString } from '@ukef/helpers/regex.helper';
import { Matches } from 'class-validator';

export class GetOdsCustomerParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.CUSTOMER.PARTYURN,
    description: 'Unique UKEF customer ID',
    pattern: regexToString(UKEFID.PARTY_ID.REGEX),
  })
  @Matches(UKEFID.PARTY_ID.REGEX)
  public urn: string;
}
