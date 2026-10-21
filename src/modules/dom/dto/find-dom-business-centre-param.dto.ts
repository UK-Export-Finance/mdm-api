import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class FindOdsBusinessCentreOdsResponseParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.BUSINESS_CENTRE.CODE,
    description: 'Unique business centre code',
  })
  @IsString()
  public centreCode: string;
}
