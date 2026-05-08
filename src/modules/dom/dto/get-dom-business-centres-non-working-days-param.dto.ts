import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { BUSINESS_CENTRE } from '@ukef/constants/business-centre.constant';
import { IsDateString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class GetOdsBusinessCentreOdsResponsesNonWorkingDaysParamDto {
  @ApiProperty({
    required: true,
    example: `${EXAMPLES.BUSINESS_CENTRE.CODE},${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE}`,
    description: 'Unique business centre codes - separated by commas',
  })
  @IsString()
  @MinLength(BUSINESS_CENTRE.CODE_PARAM.MIN_LENGTH)
  @MaxLength(BUSINESS_CENTRE.CODE_PARAM.MAX_LENGTH)
  public centreCodes: string;

  @IsDateString({ strict: true })
  @MinLength(BUSINESS_CENTRE.DATE_QUERY_PARAM.MIN_LENGTH)
  @MaxLength(BUSINESS_CENTRE.DATE_QUERY_PARAM.MAX_LENGTH)
  @IsOptional()
  @ApiProperty({
    example: '2026-01-01',
    description: 'Optional non-working day start date filter (inclusive) in YYYY-MM-DD format',
    required: false,
  })
  public startDate?: string;

  @IsDateString({ strict: true })
  @MinLength(BUSINESS_CENTRE.DATE_QUERY_PARAM.MIN_LENGTH)
  @MaxLength(BUSINESS_CENTRE.DATE_QUERY_PARAM.MAX_LENGTH)
  @IsOptional()
  @ApiProperty({
    example: '2026-12-31',
    description: 'Optional non-working day end date filter (inclusive) in YYYY-MM-DD format',
    required: false,
  })
  public endDate?: string;
}
