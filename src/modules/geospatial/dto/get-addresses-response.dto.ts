import { ApiProperty } from '@nestjs/swagger';
import { ENUMS, GEOSPATIAL } from '@ukef/constants';

export type GetAddressesResponse = GetAddressesResponseItem[];

export class GetAddressesResponseItem {
  @ApiProperty({
    description: 'Organisation name if available',
    example: GEOSPATIAL.EXAMPLES.ORGANISATION_NAME,
  })
  readonly organisationName: string | null;

  @ApiProperty({
    description: 'Address line 1',
    example: GEOSPATIAL.EXAMPLES.ADDRESS_LINE_1,
  })
  readonly addressLine1: string;

  @ApiProperty({
    description: 'Address line 2',
    example: null,
  })
  readonly addressLine2: string | null;

  @ApiProperty({
    description: 'Address line 3',
    example: null,
  })
  readonly addressLine3: string | null;

  @ApiProperty({
    description: 'Locality, Town',
    example: GEOSPATIAL.EXAMPLES.LOCALITY,
  })
  readonly locality: string | null;

  @ApiProperty({
    description: 'Postcode',
    example: GEOSPATIAL.EXAMPLES.POSTCODE,
  })
  readonly postalCode: string | null;

  @ApiProperty({
    description: 'Country of address record',
    example: ENUMS.GEOSPATIAL_COUNTRIES.E,
    enum: ENUMS.GEOSPATIAL_COUNTRIES,
  })
  readonly country: string | null;
}
