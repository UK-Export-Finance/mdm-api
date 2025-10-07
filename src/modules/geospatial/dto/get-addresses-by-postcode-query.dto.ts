import { ApiProperty } from '@nestjs/swagger';
import { GEOSPATIAL } from '@ukef/constants';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class GetAddressesByPostcodeQueryDto {
  @ApiProperty({
    example: GEOSPATIAL.EXAMPLES.ENGLISH_POSTCODE,
    description: 'Postcode to search for',
    minLength: 5,
    maxLength: 8,
    pattern: GEOSPATIAL.REGEX.UK_POSTCODE.source,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(8)
  @Matches(GEOSPATIAL.REGEX.UK_POSTCODE)
  public postcode: string;
}
