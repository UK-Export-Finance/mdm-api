import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsObligationSubtypeParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.OBLIGATION_SUBTYPE.CODE,
    description: 'Unique obligation subtype code',
  })
  @IsString()
  public subtypeCode: string;
}
