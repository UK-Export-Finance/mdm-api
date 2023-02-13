import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Matches, Max } from 'class-validator';

export class GetNumbersQueryDto {
  @IsInt()
  @IsNotEmpty()
  @Max(9)
  @ApiProperty({ example: 1 })
  public type: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '0030052431' })
  @Matches(/^\d{10}$/)
  public ukefId: string;
}
