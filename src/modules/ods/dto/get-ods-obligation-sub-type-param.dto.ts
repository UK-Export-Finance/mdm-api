import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsObligationSubTypeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.OBLIGATION_SUB_TYPE.CODE,
    description: 'Unique obligation sub-type code',
  })
  @IsString()
  public subTypeCode: string;
}
