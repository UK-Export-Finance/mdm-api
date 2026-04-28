import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class GetOdsBusinessCentreOdsResponsesNonWorkingDaysParamDto {
  @ApiProperty({
    required: true,
    example: `${EXAMPLES.DOM.BUSINESS_CENTRES[0].CODE},${EXAMPLES.DOM.BUSINESS_CENTRES[1].CODE}`,
    description: 'Unique business centre codes - separated by commas',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  public centreCodes: string;
}
