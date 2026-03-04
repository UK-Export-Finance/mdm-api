import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsFacilityCategoryParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.FACILITY_CATEGORY.CODE,
    description: 'Unique facility category code',
  })
  @IsString()
  public categoryCode: string;
}
