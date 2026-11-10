import { ApiProperty } from '@nestjs/swagger';
import { REGEX } from '@ukef/constants';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Matches, Max, Min } from 'class-validator';

export class GetNumbersQueryDto {
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(9)
  @ApiProperty({ example: 1, description: 'Id of UKEF ID type. Common types are: 1 for Deal/Facility, 2 for Party, 8 for Covenant' })
  public type: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '00300524', description: 'UKEF ID to check. Examples: \n- Facility/Deal/Covenant ID: 0020019715 \n- Party URN: 00300524' })
  @Matches(REGEX.EIGHT_TO_TEN_DIGIT_UKEF_ID)
  public ukefId: string;
}
