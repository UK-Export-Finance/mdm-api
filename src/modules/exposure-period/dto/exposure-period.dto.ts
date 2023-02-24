import { ApiProperty } from '@nestjs/swagger';

export class ExposurePeriodDto {
  @ApiProperty({ example: 12, description: 'Exposure in months' })
  public exposurePeriod: number;
}
