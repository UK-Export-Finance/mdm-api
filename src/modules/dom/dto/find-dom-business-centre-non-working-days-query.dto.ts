import { ApiProperty } from '@nestjs/swagger';
import { BUSINESS_CENTRE, EXAMPLES } from '@ukef/constants';
import { IsDateString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class FindOdsBusinessCentreOdsResponseNonWorkingDaysQueryDto {
  @IsDateString({ strict: true })
  @MinLength(BUSINESS_CENTRE.DATE_QUERY_PARAM.MIN_LENGTH)
  @MaxLength(BUSINESS_CENTRE.DATE_QUERY_PARAM.MAX_LENGTH)
  @IsOptional()
  @ApiProperty({
    example: EXAMPLES.DATE_START,
    description: 'Optional non-working day start date filter (inclusive) in YYYY-MM-DD format',
    required: false,
  })
  public startDate?: string;

  @IsDateString({ strict: true })
  @MinLength(BUSINESS_CENTRE.DATE_QUERY_PARAM.MIN_LENGTH)
  @MaxLength(BUSINESS_CENTRE.DATE_QUERY_PARAM.MAX_LENGTH)
  @IsOptional()
  @ApiProperty({
    example: EXAMPLES.DATE_END,
    description: 'Optional non-working day end date filter (inclusive) in YYYY-MM-DD format',
    required: false,
  })
  public endDate?: string;
}
