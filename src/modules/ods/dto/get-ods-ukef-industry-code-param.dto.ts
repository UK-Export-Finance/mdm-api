import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsUkefIndustryCodeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE,
    description: 'Unique Companies House industry code',
  })
  @IsString()
  public industryCode: string;
}
