import { ApiProperty } from '@nestjs/swagger';
import { COMPANIES, EXAMPLES } from '@ukef/constants';
import { IsNumberString, MaxLength, MinLength } from 'class-validator';

export class GetOdsUkefIndustryCodeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE,
    description: 'Unique Companies House industry code',
  })
  @IsNumberString()
  @MinLength(COMPANIES.INDUSTRY_CODE.LEGACY_LENGTH)
  @MaxLength(COMPANIES.INDUSTRY_CODE.MODERN_LENGTH)
  public companiesHouseIndustryCode: string;
}
