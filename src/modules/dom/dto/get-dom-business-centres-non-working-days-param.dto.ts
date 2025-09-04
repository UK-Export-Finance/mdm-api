import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetDomBusinessCentresNonWorkingDaysParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.BUSINESS_CENTRE.CODE,
    description: 'Unique business centre codes - COMMAS',
    // type: [String],
    // isArray: true,
    // type: String,
  })
  @IsString()
  public centreCodes: string;
}
