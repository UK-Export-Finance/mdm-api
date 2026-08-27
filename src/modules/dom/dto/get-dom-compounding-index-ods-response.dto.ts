import { ApiProperty } from '@nestjs/swagger';

/**
 * The response received from the ODS query for DOM compounding indices.
 */
export class GetDomCompoundingIndexOdsResponseDto {
  @ApiProperty({ description: 'The code of the interest rate ticker', example: 'EUR001' })
  readonly interest_rate_ticker_code: string;

  @ApiProperty({ description: 'The start date and time the interest rate is active from', example: '2026-02-09T00:00:00' })
  readonly interest_rate_start_datetime: string;

  @ApiProperty({ description: 'The end date and time the interest rate is active until', example: '2026-02-09T23:59:59' })
  readonly interest_rate_end_datetime: string;

  @ApiProperty({ description: 'The number of days for which the interest rate is active', example: 1 })
  readonly interest_rate_days_active: number;

  @ApiProperty({ description: 'The interest rate', example: 1.93 })
  readonly interest_rate: number;

  @ApiProperty({ description: 'The compounding index value for the interest rate', example: 10000.5361111111 })
  readonly interest_compounding_index_value: number;
}
