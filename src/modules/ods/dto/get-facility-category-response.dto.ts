import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetFacilityCategoryResponseDto {
  @ApiProperty({
    description: 'Facility classification type',
    example: EXAMPLES.FACILITY_CATEGORY.TYPE,
  })
  readonly type: string;

  @ApiProperty({
    description: 'Facility classification type code',
    example: EXAMPLES.FACILITY_CATEGORY.TYPE_CODE,
  })
  readonly typeCode: string;

  @ApiProperty({
    description: 'Facility classification code',
    example: EXAMPLES.FACILITY_CATEGORY.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Facility classification description',
    example: EXAMPLES.FACILITY_CATEGORY.DESCRIPTION,
  })
  readonly description: string;

  @ApiProperty({
    description: 'Facility classification active flag',
    example: EXAMPLES.FACILITY_CATEGORY.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
