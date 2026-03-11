import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetAccrualFrequencyResponseDto {
  @ApiProperty({
    description: 'Accrual frequency code',
    example: EXAMPLES.ACCRUAL_FREQUENCY.CODE,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Accrual frequency name',
    example: EXAMPLES.ACCRUAL_FREQUENCY.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Accrual frequency order ID',
    example: EXAMPLES.ACCRUAL_FREQUENCY.ORDER_ID,
  })
  readonly orderId: number;

  @ApiProperty({
    description: 'Accrual frequency number of units',
    example: EXAMPLES.ACCRUAL_FREQUENCY.FREQUENCY_NUMBER_OF_UNITS,
  })
  readonly frequencyNumberOfUnits: number;

  @ApiProperty({
    description: 'Accrual schedule frequency unit',
    example: EXAMPLES.ACCRUAL_FREQUENCY.FREQUENCY_UNIT,
  })
  readonly frequencyUnit: string;

  @ApiProperty({
    description: 'Accrual frequency active flag',
    example: EXAMPLES.ACCRUAL_FREQUENCY.IS_ACTIVE,
  })
  readonly isActive: boolean;
}
