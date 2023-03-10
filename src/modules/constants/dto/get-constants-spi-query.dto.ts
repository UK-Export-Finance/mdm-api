import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

export class GetConstantsSpiQueryDto {
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(7)
  @ApiProperty({
    required: false,
    example: 1,
    description: 'Country risk category. Values from 0 to 7',
  })
  public oecdRiskCategory: number = null;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'C',
    description: 'Constant category/type/group. Values: A, B, C, Quality of Product, Percentage of Cover',
  })
  @Matches(/^[a-zA-Z ]{1,20}$/)
  public category: string = null;
}
