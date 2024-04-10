import { ApiProperty } from '@nestjs/swagger';
import { GEOSPATIAL } from '@ukef/constants';
import { Matches, MaxLength, MinLength } from 'class-validator';

const UK_POSTCODE = /^[A-Za-z]{1,2}[\dRr][\dA-Za-z]?\s?\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/;

export class GetAddressByPostcodeQueryDto {
  @ApiProperty({
    example: GEOSPATIAL.EXAMPLES.POSTCODE,
    description: 'Postcode to search for',
  })
  @MinLength(5)
  @MaxLength(8)
  @Matches(UK_POSTCODE)
  public postcode: string;
}