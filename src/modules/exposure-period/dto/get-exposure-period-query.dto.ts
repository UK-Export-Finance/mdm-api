import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, Matches } from 'class-validator';

export class GetExposurePeriodQueryDto {
  @IsDate()
  @ApiProperty({ example: '2017-07-04' })
  public startdate: Date;

  @IsDate()
  @ApiProperty({ example: '2018-07-04' })
  public enddate: Date;

  @IsString()
  @ApiProperty({ example: 'EW', description: 'Two products are accepted: EW and BS' })
  @Matches(/^(EW|BS)$/)
  public productgroup: string;
}
