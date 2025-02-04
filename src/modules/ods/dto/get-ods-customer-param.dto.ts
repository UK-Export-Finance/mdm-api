import { ApiProperty } from '@nestjs/swagger';
import { CUSTOMERS, UKEFID } from '@ukef/constants';
import { regexToString } from '@ukef/helpers/regex.helper';
import { Matches } from 'class-validator';

export class GetOdsCustomerParamDto {
  @ApiProperty({
    required: true,
    example: CUSTOMERS.EXAMPLES.PARTYURN,
    description: 'The unique UKEF ID of the customer to search for.',
    pattern: regexToString(UKEFID.PARTY_ID.REGEX),
  })
  @Matches(UKEFID.PARTY_ID.REGEX)
  public urn: string;
}
