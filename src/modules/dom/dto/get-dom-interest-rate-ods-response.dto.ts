import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

/**
 * The response received from the ODS query for DOM interest rates.
 */
export class GetDomInterestRateOdsResponseDto {
  @ApiProperty({
    description: 'The code of the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATES[0].code,
  })
  readonly interest_rate_ticker_code: string;

  @ApiProperty({
    description: 'The start date and time the interest rate is active from',
    example: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
  })
  readonly interest_rate_start_datetime: string;

  @ApiProperty({
    description: 'The end date and time the interest rate is active until',
    example: EXAMPLES.DOM.INTEREST_RATES[0].endDate,
  })
  readonly interest_rate_end_datetime: string;

  @ApiProperty({
    description: 'The interest rate',
    example: EXAMPLES.DOM.INTEREST_RATES[0].rate,
  })
  readonly interest_rate: number;

  @ApiProperty({
    description: 'The interest rate adjusted so that negative rates are floored at zero',
    example: EXAMPLES.DOM.INTEREST_RATES[0].adjustedRate,
  })
  readonly interest_rate_adjusted: number;
}
