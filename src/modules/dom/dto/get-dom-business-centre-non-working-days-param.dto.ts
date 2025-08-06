import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetDomBusinessCentreNonWorkingDaysParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.BUSINESS_CENTRE.CODE,
    description: 'Unique business centre code',
  })
  @IsString()
  public centreCode: string;
}
