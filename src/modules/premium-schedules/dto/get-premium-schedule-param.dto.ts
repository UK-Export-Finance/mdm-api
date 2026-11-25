import { ApiProperty } from '@nestjs/swagger';
import { REGEX } from '@ukef/constants';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class GetPremiumScheduleParamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '30000425',
    description: 'UKEF ID for Facility, but without 00 at beginning',
  })
  @Matches(REGEX.EIGHT_TO_TEN_DIGIT_UKEF_ID)
  public facilityId: string;
}
