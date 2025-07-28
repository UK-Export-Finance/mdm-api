import { ApiProperty } from '@nestjs/swagger';
import { BUSINESS_CENTRE } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetDomBusinessCentreParamDto {
  @ApiProperty({
    required: true,
    example: BUSINESS_CENTRE.EXAMPLES.CODE,
    description: 'Unique business centre code',
  })
  @IsString()
  public centreCode: string;
}
