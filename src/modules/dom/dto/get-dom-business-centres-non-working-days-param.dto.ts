import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetDomBusinessCentresNonWorkingDaysParamDto {
  @ApiProperty({
    required: true,
    example: `${EXAMPLES.DOM.BUSINESS_CENTRES[0].code},${EXAMPLES.DOM.BUSINESS_CENTRES[1].code}`,
    description: 'Unique business centre codes - separated by commas',
  })
  @IsString()
  public centreCodes: string;
}
