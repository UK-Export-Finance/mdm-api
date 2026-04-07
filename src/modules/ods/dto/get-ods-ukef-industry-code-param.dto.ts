import { ApiProperty } from '@nestjs/swagger';
import { COMPANIES_HOUSE, EXAMPLES } from '@ukef/constants';
import { IsNumberString, MaxLength, MinLength } from 'class-validator';

export class GetOdsUkefIndustryCodeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE,
    description: 'Unique Companies House industry code',
  })
  @IsNumberString()
  @MinLength(COMPANIES_HOUSE.INDUSTRY_CODE.MIN_LENGTH)
  @MaxLength(COMPANIES_HOUSE.INDUSTRY_CODE.MAX_LENGTH)
  public companiesHouseIndustryCode: string;
}
