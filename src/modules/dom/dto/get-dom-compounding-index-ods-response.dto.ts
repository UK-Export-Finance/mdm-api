import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

/**
 * The response received from the ODS query for DOM compounding indices.
 */
export class GetDomCompoundingIndexOdsResponseDto {
  @ApiProperty({ description: 'The code of the interest rate ticker', example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].code })
  readonly interest_rate_ticker_code: string;

  @ApiProperty({ description: 'The start date and time the interest rate is active from', example: EXAMPLES.DOM.INTEREST_RATES[0].startDate })
  readonly interest_rate_start_datetime: string;

  @ApiProperty({ description: 'The end date and time the interest rate is active until', example: EXAMPLES.DOM.INTEREST_RATES[0].endDate })
  readonly interest_rate_end_datetime: string;

  @ApiProperty({ description: 'The number of days for which the interest rate is active', example: 1 })
  readonly interest_rate_days_active: number;

  @ApiProperty({ description: 'The interest rate', example: EXAMPLES.DOM.INTEREST_RATES[0].rate })
  readonly interest_rate: number;

  @ApiProperty({ description: 'The compounding index value for the interest rate', example: EXAMPLES.DOM.INTEREST_RATES[0].compoundingIndexValue })
  readonly interest_compounding_index_value: number;

  @ApiProperty({ description: 'The start date and time the compounding index is effective from', example: EXAMPLES.DOM.INTEREST_RATES[0].startDate })
  readonly interest_compounding_index_source_start_datetime: string;
}
