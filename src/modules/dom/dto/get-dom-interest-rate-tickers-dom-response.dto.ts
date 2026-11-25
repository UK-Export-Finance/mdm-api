import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

/**
 * The response received from the ODS query for DOM interest rate tickers.
 */
export class GetDomInterestRateTickersDomResponseDto {
  @ApiProperty({
    description: 'The code of the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].code,
  })
  readonly interest_rate_ticker_code: string;

  @ApiProperty({
    description: 'The name of the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].name,
  })
  readonly interest_rate_ticker_name: string;

  @ApiProperty({
    description: 'The type of the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].type,
  })
  readonly interest_rate_ticker_type: string;

  @ApiProperty({
    description: 'The code of the interest rate frequency',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].frequencyCode,
  })
  readonly interest_rate_frequency_code: string;

  @ApiProperty({
    description: 'The name of the interest rate frequency',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].frequencyName,
  })
  readonly interest_rate_frequency_name: string;

  @ApiProperty({
    description: 'The number of lead days for the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].leadDays,
  })
  readonly interest_rate_ticker_lead_days: number;

  @ApiProperty({
    description: 'The code of the currency',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].currencyCode,
  })
  readonly currency_code: string;

  @ApiProperty({
    description: 'Whether the interest rate ticker is active',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].active,
  })
  readonly interest_rate_ticker_active_flag: boolean;
}
