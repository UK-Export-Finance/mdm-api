import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES, INDUSTRY_CODE } from '@ukef/constants';
import { ExactLength } from '@ukef/custom-decorators';
import { IsNumberString } from 'class-validator';

export class CompaniesHouseIndustryCodeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE,
    description: 'Companies House industry code',
  })
  @IsNumberString()
  @ExactLength(INDUSTRY_CODE.EXACT_LENGTH)
  public industryCode: string;
}
