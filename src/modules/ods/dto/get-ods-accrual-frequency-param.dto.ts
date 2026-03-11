import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsString } from 'class-validator';

export class GetOdsAccrualFrequencyParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.ACCRUAL_FREQUENCY.CODE,
    description: 'Unique accrual frequency code',
  })
  @IsString()
  public frequencyCode: string;
}
