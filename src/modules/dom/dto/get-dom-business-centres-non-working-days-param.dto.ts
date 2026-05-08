import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsDateString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class GetOdsBusinessCentreOdsResponsesNonWorkingDaysParamDto {
  @ApiProperty({
    required: true,
    example: `${EXAMPLES.BUSINESS_CENTRE.CODE},${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE}`,
    description: 'Unique business centre codes - separated by commas',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  public centreCodes: string;

  @IsDateString({ strict: true })
  @MaxLength(10, { message: '$property should use format YYYY-MM-DD' })
  @IsOptional()
  @ApiProperty({
    example: '2026-01-01',
    description: 'Optional non-working day start date filter (inclusive) in YYYY-MM-DD format',
    required: false,
  })
  public startDate?: string;

  @IsDateString({ strict: true })
  @MaxLength(10, { message: '$property should use format YYYY-MM-DD' })
  @IsOptional()
  @ApiProperty({
    example: '2026-12-31',
    description: 'Optional non-working day end date filter (inclusive) in YYYY-MM-DD format',
    required: false,
  })
  public endDate?: string;
}
