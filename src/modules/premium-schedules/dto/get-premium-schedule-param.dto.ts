import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetPremiumScheduleParamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '10588388' })
  @Matches(/^\d{8,10}$/)
  public facilityId: string;
}
