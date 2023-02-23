import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

export class GetConstantsSpiQueryDto {
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(7)
  @ApiProperty({ example: 1 })
  public oecdRiskCategory: number = null;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'C' })
  @Matches(/^[a-zA-Z ]{1,20}$/)
  public category: string = null;
}
