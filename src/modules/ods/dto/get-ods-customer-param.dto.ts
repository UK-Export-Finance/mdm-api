import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES, UKEF_ID } from '@ukef/constants';
import { regexToString } from '@ukef/helpers/regex.helper';
import { Matches } from 'class-validator';

export class GetOdsCustomerParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.CUSTOMER.PARTYURN,
    description: 'Unique UKEF customer ID',
    pattern: regexToString(UKEF_ID.PARTY_ID.REGEX),
  })
  @Matches(UKEF_ID.PARTY_ID.REGEX)
  public urn: string;
}
