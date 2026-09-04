import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

/**
 * The response DTO for the GET /dom/compounding-index endpoint.
 * This is mapped from the response received from the ODS query for DOM compounding indices in {@link GetDomCompoundingIndexOdsResponseDto}.
 */
export class GetDomCompoundingIndexResponseDto {
  @ApiProperty({ description: 'The code of the interest rate ticker', example: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].code })
  readonly code: string;

  @ApiProperty({ description: 'The start date and time the interest rate is active from', example: EXAMPLES.DOM.INTEREST_RATES[0].startDate })
  readonly startDate: string;

  @ApiProperty({ description: 'The end date and time the interest rate is active until', example: EXAMPLES.DOM.INTEREST_RATES[0].endDate })
  readonly endDate: string;

  @ApiProperty({ description: 'The number of days for which the interest rate is active', example: 1 })
  readonly daysActive: number;

  @ApiProperty({ description: 'The interest rate', example: EXAMPLES.DOM.INTEREST_RATES[0].rate })
  readonly rate: number;

  @ApiProperty({ description: 'The compounding index value for the interest rate', example: 10000.5361111111 })
  readonly compoundingIndexValue: number;
}
