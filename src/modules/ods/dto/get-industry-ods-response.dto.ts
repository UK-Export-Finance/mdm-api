import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetIndustryOdsResponseDto {
  @ApiProperty({
    description: 'Industry ID',
    example: EXAMPLES.INDUSTRY.CODE,
  })
  readonly industry_id: string;

  @ApiProperty({
    description: 'Industry code',
    example: EXAMPLES.INDUSTRY.CODE,
  })
  readonly industry_code: string;

  @ApiProperty({
    description: 'Industry description',
    example: EXAMPLES.INDUSTRY.DESCRIPTION,
  })
  readonly industry_description: string;

  @ApiProperty({
    description: 'Industry group code',
    example: EXAMPLES.INDUSTRY.GROUP_CODE,
  })
  readonly industry_group_code: string;

  @ApiProperty({
    description: 'Industry group description',
    example: EXAMPLES.INDUSTRY.GROUP_DESCRIPTION,
  })
  readonly industry_group_description: string;

  @ApiProperty({
    description: 'Industry category',
    example: EXAMPLES.INDUSTRY.CATEGORY,
  })
  readonly industry_category: string;
}
