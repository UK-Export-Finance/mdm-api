import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EXAMPLES } from '@ukef/constants';

export class GetOdsAccrualFrequencyParamDto {
  @ApiProperty({
    required: true,
    example: EXAMPLES.ACCRUAL_FREQUENCY.CODE,
    description: 'Unique accrual frequency code',
  })
  @IsString()
  public frequencyCode: string;
}
