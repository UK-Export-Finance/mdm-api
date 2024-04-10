import { ApiProperty } from '@nestjs/swagger';

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
    example: 'SW1A 2AQ',
  })
  readonly postalCode: string | null;

  @ApiProperty({
    description: 'Country of address record',
    example: null,
  })
  readonly country: string | null;
}
