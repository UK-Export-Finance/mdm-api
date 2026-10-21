import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class FindOdsIndustryParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.INDUSTRY.CODE,
    description: 'Unique UKEF industry code',
  })
  @IsString()
  public industryCode: string;
}
