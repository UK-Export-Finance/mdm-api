import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class GetSectorIndustriesQueryDto {
  @IsOptional()
  @IsString()
  @Length(4)
  @Matches(/^\d{4}$/)
  @ApiProperty({ required: false, example: '1010', description: 'Search by UKEF Sector id, returns multiple Industries' })
  public ukefSectorId: string;

  @IsOptional()
  @IsString()
  @Length(5)
  @Matches(/^\d{5}$/)
  @ApiProperty({ required: false, example: '02400', description: 'Search by UKEF Industry id, most likely returns 1 result' })
  public ukefIndustryId: string;
}
