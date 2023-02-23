import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, Max } from 'class-validator';

export class GetConstantsSpiQueryDto {
  @IsInt()
  @IsOptional()
  @Max(7)
  @ApiProperty({ example: 1 })
  public oecdRiskCategory: number = null;

  @IsString()
  @IsOptional()
  @ApiProperty({ examples: ['C', 'Quality of Product'] })
  @Matches(/^[a-zA-Z ]{1,20}$/)
  public category: string = null;
}
