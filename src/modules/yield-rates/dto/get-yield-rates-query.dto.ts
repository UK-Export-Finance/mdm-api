import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsISO8601, IsOptional, MaxLength } from 'class-validator';

export class GetYieldRatesQueryDto {
  @IsDateString()
  // Max length allows dates without time.
  @MaxLength(10, { message: '$property should use format YYYY-MM-DD' })
  @IsOptional()
  @ApiProperty({
    example: '2023-03-01',
    description: 'Filter yield rates for specific date. Can go back to 2010-03-15',
  })
  public searchDate: string;
}
