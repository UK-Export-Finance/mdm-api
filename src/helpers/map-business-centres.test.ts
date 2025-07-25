import { DOM_BUSINESS_CENTRES, MOCK_ODS_BUSINESS_CENTRES, ODS_BUSINESS_CENTRES } from '@ukef/constants';
import { GetOdsBusinessCentreResponse } from '@ukef/modules/ods/dto';

import { GetDomBusinessCentreMappedResponse } from '../modules/dom/dto';
import { mapBusinessCentres } from './map-business-centres';

describe('mapBusinessCentres', () => {
  it('should return an array of mapped ODS business centres', () => {
    // Act
    const result = mapBusinessCentres(MOCK_ODS_BUSINESS_CENTRES);

    // Assert
    const expected: GetDomBusinessCentreMappedResponse[] = [
      {
        code: DOM_BUSINESS_CENTRES.AaB.CODE,
        name: DOM_BUSINESS_CENTRES.AaB.NAME,
      },
      {
        code: DOM_BUSINESS_CENTRES.JoB.CODE,
        name: DOM_BUSINESS_CENTRES.JoB.NAME,
      },
      {
        code: DOM_BUSINESS_CENTRES.StB.CODE,
        name: DOM_BUSINESS_CENTRES.StB.NAME,
      },
    ];

    expect(result).toEqual(expected);
  });

  describe('when provided business centres are not found in DOM_BUSINESS_CENTRES', () => {
    it('should return an array with only the business centres that have been found/mapped by code', () => {
      // Arrange
      const mockOdsBusinessCentres: GetOdsBusinessCentreResponse[] = [
        {
          business_centre_code: ODS_BUSINESS_CENTRES.AaB,
          business_centre_name: 'Mock name A',
        },
        {
          business_centre_code: 'Mock code B',
          business_centre_name: 'Mock name B',
        },
        {
          business_centre_code: 'Mock code C',
          business_centre_name: 'Mock name C',
        },
      ];

      // Act
      const result = mapBusinessCentres(mockOdsBusinessCentres);

      // Assert
      const expected = [
        {
          code: DOM_BUSINESS_CENTRES.AaB.CODE,
          name: DOM_BUSINESS_CENTRES.AaB.NAME,
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
