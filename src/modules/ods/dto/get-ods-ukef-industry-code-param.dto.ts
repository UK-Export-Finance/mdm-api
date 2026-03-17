import { ApiProperty } from '@nestjs/swagger';
import { COMPANIES_HOUSE, EXAMPLES } from '@ukef/constants';
import { ExactLength } from '@ukef/custom-decorators';
import { IsNumberString } from 'class-validator';

export class GetOdsUkefIndustryCodeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE,
    description: 'Unique Companies House industry code',
  })
  @IsNumberString()
  @ExactLength(COMPANIES_HOUSE.INDUSTRY_CODE.EXACT_LENGTH)
  public industryCode: string;
}
