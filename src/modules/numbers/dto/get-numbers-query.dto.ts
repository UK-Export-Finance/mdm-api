import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Matches, Max } from 'class-validator';

export class GetNumbersQueryDto {
  @IsInt()
  @IsNotEmpty()
  @Max(9)
  @ApiProperty({ example: 1, description: 'Id of UKEF ID type. Common types are: 1 for Deal/Facility, 2 for Party, 8 for Covenant' })
  public type: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '0030052431', description: 'UKEF ID to check' })
  @Matches(/^\d{10}$/)
  public ukefId: string;
}
