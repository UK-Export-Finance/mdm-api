import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, Matches, MaxLength } from 'class-validator';

export class GetExposurePeriodQueryDto {
  @IsDateString({ strict: true })
  // Max length validation blocks dates with time.
  @MaxLength(10, { message: '$property should use format YYYY-MM-DD' })
  @ApiProperty({
    example: '2017-07-04',
    description: 'Guarantee commencement date for a facility',
  })
  public startdate: string;

  @IsDateString({ strict: true })
  // Max length validation blocks dates with time.
  @MaxLength(10, { message: '$property should use format YYYY-MM-DD' })
  @ApiProperty({
    example: '2018-07-04',
    description: 'Guarantee expiry date for a facility',
  })
  public enddate: string;

  @IsString()
  @ApiProperty({ example: 'EW', description: 'Two products are accepted: EW and BS' })
  @Matches(/^(EW|BS)$/)
  public productgroup: string;
}
