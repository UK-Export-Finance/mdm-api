import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class GetSectorIndustriesQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(4)
  @Matches(/^\d{4}$/)
  @ApiProperty({ example: '1010' })
  public ukefSectorId: string;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  @Matches(/^\d{5}$/)
  @ApiProperty({ example: '02400' })
  public ukefIndustryId: string;
}
