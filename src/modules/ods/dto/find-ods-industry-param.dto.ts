import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class FindOdsIndustryParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.INDUSTRY.CODE,
    description: 'Unique UKEF industry code',
  })
  @IsString()
  public industryCode: string;
}
