import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetPremiumScheduleParamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '30000425',
    description: 'UKEF id for Facility, but without 00 at beginning',
  })
  @Matches(/^\d{8,10}$/)
  public facilityId: string;
}
