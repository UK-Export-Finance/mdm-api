import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

/**
 * The response DTO for the GET /dom/interest-rate endpoint.
 * This is mapped from the response received from the ODS query for DOM interest rates in {@link GetDomInterestRateOdsResponseDto}.
 */
export class GetDomInterestRateResponseDto {
  @ApiProperty({
    description: 'The code of the interest rate ticker',
    example: EXAMPLES.DOM.INTEREST_RATES[0].code,
  })
  readonly code: string;

  @ApiProperty({
    description: 'The start date and time the interest rate is active from',
    example: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
  })
  readonly startDate: string;

  @ApiProperty({
    description: 'The end date and time the interest rate is active until',
    example: EXAMPLES.DOM.INTEREST_RATES[0].endDate,
  })
  readonly endDate: string;

  @ApiProperty({
    description: 'The interest rate',
    example: EXAMPLES.DOM.INTEREST_RATES[0].rate,
  })
  readonly rate: number;

  @ApiProperty({
    description: 'The interest rate adjusted so that negative rates are floored at zero',
    example: EXAMPLES.DOM.INTEREST_RATES[0].adjustedRate,
  })
  readonly adjustedRate: number;
}
