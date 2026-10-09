import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class GetOdsObligationSubtypeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.OBLIGATION_SUBTYPE.CODE,
    description: 'Unique obligation subtype code',
  })
  @IsString()
  public subtypeCode: string;
}
