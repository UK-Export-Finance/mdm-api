import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetDomInterestRateQueryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: EXAMPLES.DOM.INTEREST_RATES[0].code,
    description: 'The code of the interest rate ticker',
  })
  public rateCode: string;

  @IsDateString({ strict: true })
  @IsOptional()
  @ApiProperty({
    example: EXAMPLES.DATE_START,
    description: 'Optional start date (inclusive) to retrieve interest rates from. If omitted, only the rate for the end date is returned.',
    required: false,
  })
  public startDate?: string;

  @IsDateString({ strict: true })
  @ApiProperty({
    example: EXAMPLES.DATE_END,
    description: 'The end date (inclusive) to retrieve interest rates until',
  })
  public endDate: string;
}
