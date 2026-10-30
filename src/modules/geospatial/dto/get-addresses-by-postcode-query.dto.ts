import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { EXAMPLES, REGEX } from '@ukef/constants';

export class GetAddressesByPostcodeQueryDto {
  @ApiProperty({
    example: EXAMPLES.GEOSPATIAL.ENGLISH_POSTCODE,
    description: 'Postcode to search for',
    minLength: 5,
    maxLength: 8,
    pattern: REGEX.UK_POSTCODE.source,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(8)
  @Matches(REGEX.UK_POSTCODE)
  public postcode: string;
}
