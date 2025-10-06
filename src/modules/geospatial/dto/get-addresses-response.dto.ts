import { ApiProperty } from '@nestjs/swagger';
import { ENUMS, EXAMPLES } from '@ukef/constants';

export type GetAddressesResponse = GetAddressesResponseItem[];

export class GetAddressesResponseItem {
  @ApiProperty({
    description: 'Organisation name, if available',
    example: EXAMPLES.GEOSPATIAL.ORGANISATION_NAME,
    nullable: true,
  })
  readonly organisationName: string | null;

  @ApiProperty({
    description: 'Address line 1',
    example: EXAMPLES.GEOSPATIAL.ADDRESS_LINE_1,
  })
  readonly addressLine1: string;

  @ApiProperty({
    description: 'Address line 2',
    example: null,
    nullable: true,
  })
  readonly addressLine2: string | null;

  @ApiProperty({
    description: 'Address line 3',
    example: null,
    nullable: true,
  })
  readonly addressLine3: string | null;

  @ApiProperty({
    description: 'Locality or town',
    example: EXAMPLES.GEOSPATIAL.LOCALITY,
    nullable: true,
  })
  readonly locality: string | null;

  @ApiProperty({
    description: 'Postcode',
    example: EXAMPLES.GEOSPATIAL.ENGLISH_POSTCODE,
    nullable: true,
  })
  readonly postalCode: string | null;

  @ApiProperty({
    description: 'Country of address record',
    example: ENUMS.GEOSPATIAL_COUNTRIES.E,
    enum: ENUMS.GEOSPATIAL_COUNTRIES,
    nullable: true,
  })
  readonly country: string | null;
}
