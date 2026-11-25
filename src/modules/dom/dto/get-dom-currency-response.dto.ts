import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

/**
 * The response DTO for the GET /dom/currencies endpoint.
 * This is mapped from the response received from the ODS query for DOM currencies in {@link GetDomCurrencyOdsResponseDto}.
 */
export class GetDomCurrencyResponseDto {
  @ApiProperty({
    description: 'The code of the currency',
    example: EXAMPLES.DOM.CURRENCIES[0].code,
  })
  readonly code: string;

  @ApiProperty({
    description: 'The name of the currency',
    example: EXAMPLES.DOM.CURRENCIES[0].name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'The number of decimal places for the currency',
    example: EXAMPLES.DOM.CURRENCIES[0].decimalPlaces,
  })
  readonly decimalPlaces: number;

  @ApiProperty({
    description: 'The code of the rate setting calendar, or null if not provided',
    example: EXAMPLES.DOM.CURRENCIES[0].calendarCode,
    nullable: true,
  })
  readonly calendarCode: string | null;
}
