import { ApiProperty } from '@nestjs/swagger';
import { ENUMS, GEOSPATIAL } from '@ukef/constants';

export type GetSearchAddressesResponse = GetSearchAddressesResponseItem[];

export class GetSearchAddressesResponseItem {
  @ApiProperty({
    description: 'Organisation name if available',
    example: 'CHURCHILL MUSEUM & CABINET WAR ROOMS',
  })
  readonly organisationName: string | null;

  @ApiProperty({
    description: 'Address line 1',
    example: 'CLIVE STEPS  KING CHARLES STREET',
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
    example: 'LONDON',
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
