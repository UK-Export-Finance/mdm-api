import { ApiProperty } from '@nestjs/swagger';
import { COMPANIES } from '@ukef/constants';
import { Matches, MaxLength, MinLength } from 'class-validator';

export class GetCompanyByRegistrationNumberQuery {
  @ApiProperty({
    description: 'The Companies House registration number of the company to find.',
    example: COMPANIES.EXAMPLES.COMPANIES_HOUSE_REGISTRATION_NUMBER,
    minLength: 8,
    maxLength: 8,
    pattern: COMPANIES.REGEX.COMPANIES_HOUSE_REGISTRATION_NUMBER.source,
  })
  @MinLength(8)
  @MaxLength(8)
  @Matches(COMPANIES.REGEX.COMPANIES_HOUSE_REGISTRATION_NUMBER)
  public registrationNumber: string;
}
