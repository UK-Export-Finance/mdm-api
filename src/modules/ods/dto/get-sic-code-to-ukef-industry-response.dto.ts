import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetSicCodeToUkefIndustryResponseDto {
  @ApiProperty({
    description: 'UKEF industry code',
    example: EXAMPLES.INDUSTRY.CODE,
  })
  readonly ukefIndustryCode: string;
}
