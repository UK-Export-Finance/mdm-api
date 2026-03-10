import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetAccrualFrequencyOdsResponseDto {
  @ApiProperty({
    description: 'Accrual frequency code',
    example: EXAMPLES.ODS.CONFIGURATION_FREQUENCY.code,
  })
  readonly code: string;

  @ApiProperty({
    description: 'Accrual frequency name',
    example: EXAMPLES.ODS.CONFIGURATION_FREQUENCY.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Accrual frequency order ID',
    example: EXAMPLES.ODS.CONFIGURATION_FREQUENCY.orderId,
  })
  readonly orderId: number;

  @ApiProperty({
    description: 'Accrual frequency number of units',
    example: EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyNumberOfUnits,
  })
  readonly frequencyNumberOfUnits: number;

  @ApiProperty({
    description: 'Accrual schedule frequency unit',
    example: EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyUnits,
  })
  readonly frequencyUnits: string;

  @ApiProperty({
    description: 'Accrual frequency active flag',
    example: EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyActive,
  })
  readonly frequencyActive: boolean;
}
