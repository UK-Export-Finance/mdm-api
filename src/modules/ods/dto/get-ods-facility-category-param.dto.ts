import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class GetOdsFacilityCategoryParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.FACILITY_CATEGORY.CODE,
    description: 'Unique facility category code',
  })
  @IsString()
  public categoryCode: string;
}
