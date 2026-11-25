import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

/**
 * The response received from the ODS query for DOM currencies.
 */
export class GetDomCurrencyOdsResponseDto {
  @ApiProperty({
    description: 'The code of the currency',
    example: EXAMPLES.ODS.CURRENCIES[0].currency_code,
  })
  readonly currency_code: string;

  @ApiProperty({
    description: 'The ISO code of the currency',
    example: EXAMPLES.ODS.CURRENCIES[0].currency_iso_code,
  })
  readonly currency_iso_code: string;

  @ApiProperty({
    description: 'The name of the currency',
    example: EXAMPLES.ODS.CURRENCIES[0].currency_name,
  })
  readonly currency_name: string;

  @ApiProperty({
    description: 'The number of decimal places for the currency',
    example: EXAMPLES.ODS.CURRENCIES[0].currency_decimal_place,
  })
  readonly currency_decimal_place: number;

  @ApiProperty({
    description: 'The code of the rate setting calendar',
    example: EXAMPLES.ODS.CURRENCIES[0].rate_setting_calendar_code,
    nullable: true,
    required: false,
  })
  readonly rate_setting_calendar_code?: string | null;

  @ApiProperty({
    description: 'Whether the currency is active',
    example: EXAMPLES.ODS.CURRENCIES[0].currency_active_flag,
  })
  readonly currency_active_flag: boolean;
}
