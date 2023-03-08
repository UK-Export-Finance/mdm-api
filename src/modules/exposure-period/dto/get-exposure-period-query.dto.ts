import { ApiProperty } from '@nestjs/swagger';
import { ENUMS } from '@ukef/constants';
import { IsDate, IsEnum, IsString } from 'class-validator';

export class GetExposurePeriodQueryDto {
  @IsDate()
  @ApiProperty({ example: '2017-07-04' })
  public startdate: Date;

  @IsDate()
  @ApiProperty({ example: '2018-07-04' })
  public enddate: Date;

  @IsString()
  @ApiProperty({ example: 'EW', description: 'Two products are accepted: EW and BS' })
  @IsEnum(ENUMS.PRODUCTS)
  public productgroup: string;
}
