import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetOdsIndustryResponse {
  @ApiProperty({
    description: 'Industry ID',
    example: EXAMPLES.INDUSTRY.ID,
  })
  readonly id: string;

  @ApiProperty({
    description: 'Industry code',
    example: EXAMPLES.INDUSTRY.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Industry description',
    example: EXAMPLES.INDUSTRY.DESCRIPTION,
  })
  readonly description: string;

  @ApiProperty({
    description: 'Industry group code',
    example: EXAMPLES.INDUSTRY.GROUP_CODE,
  })
  readonly groupCode: string;

  @ApiProperty({
    description: 'Industry group description',
    example: EXAMPLES.INDUSTRY.GROUP_DESCRIPTION,
  })
  readonly groupDescription: string;

  @ApiProperty({
    description: 'Industry category',
    example: EXAMPLES.INDUSTRY.CATEGORY,
  })
  readonly category: string;
}
