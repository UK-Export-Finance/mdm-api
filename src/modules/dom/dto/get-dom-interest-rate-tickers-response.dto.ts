import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

/**
 * The response DTO for the GET /dom/interest-rate-tickers endpoint.
 * This is mapped from the response received from the ODS query for DOM interest rate tickers in {@link GetDomInterestRateTickersDomResponseDto}.
 */
export class GetDomInterestRateTickersResponseDto {
  @ApiProperty({
    description: 'The code of the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].code,
  })
  readonly code: string;

  @ApiProperty({
    description: 'The name of the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'The type of the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].type,
  })
  readonly type: string;

  @ApiProperty({
    description: 'The code of the interest rate frequency',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].frequencyCode,
  })
  readonly frequencyCode: string;

  @ApiProperty({
    description: 'The name of the interest rate frequency',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].frequencyName,
  })
  readonly frequencyName: string;

  @ApiProperty({
    description: 'The number of lead days for the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].leadDays,
  })
  readonly leadDays: number;

  @ApiProperty({
    description: 'The code of the currency',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].currencyCode,
  })
  readonly currencyCode: string;

  @ApiProperty({
    description: 'Whether the interest rate ticker is active',
    example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].active,
  })
  readonly active: boolean;
}
