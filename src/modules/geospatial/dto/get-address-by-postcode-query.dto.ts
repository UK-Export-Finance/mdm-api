import { ApiProperty } from '@nestjs/swagger';
import { Matches, MaxLength, MinLength } from 'class-validator';

const UK_POSTCODE = /^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?\s?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/;

export class GetAddressByPostcodeQueryDto {
  @ApiProperty({
    example: 'SW1A 2AQ',
    description: 'Postcode to search for',
  })
  @MinLength(5)
  @MaxLength(8)
  @Matches(UK_POSTCODE)
  public postcode: string;
}

