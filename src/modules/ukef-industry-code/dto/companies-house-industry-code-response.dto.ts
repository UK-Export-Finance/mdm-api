import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES, INDUSTRY_CODE } from '@ukef/constants';
import { ExactLength } from '@ukef/custom-decorators';
import { IsString } from 'class-validator';

export class CompaniesHouseIndustryCodeResponseDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.UKEF_INDUSTRY_CODE,
    description: 'UKEF industry code',
  })
  @IsString()
  @ExactLength(INDUSTRY_CODE.EXACT_LENGTH)
  readonly ukefIndustryCode: string;
}
