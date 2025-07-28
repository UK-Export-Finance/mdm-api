import { DOM_BUSINESS_CENTRES, EXAMPLES, ODS_BUSINESS_CENTRES } from '@ukef/constants';
import { GetOdsBusinessCentreResponse } from '@ukef/modules/ods/dto';

import { GetDomBusinessCentreResponse } from '../modules/dom/dto';
import { mapBusinessCentres } from './map-business-centres';

describe('mapBusinessCentres', () => {
  it('should return an array of mapped DOM business centres', () => {
    // Act
    const result = mapBusinessCentres(EXAMPLES.ODS.BUSINESS_CENTRES);

    // Assert
    const expected: GetDomBusinessCentreResponse[] = [
      {
        code: DOM_BUSINESS_CENTRES.JO_AMM.CODE,
        name: DOM_BUSINESS_CENTRES.JO_AMM.NAME,
      },
      {
        code: DOM_BUSINESS_CENTRES.ZA_JNB.CODE,
        name: DOM_BUSINESS_CENTRES.ZA_JNB.NAME,
      },
      {
        code: DOM_BUSINESS_CENTRES.SE_STO.CODE,
        name: DOM_BUSINESS_CENTRES.SE_STO.NAME,
      },
    ];

    expect(result).toEqual(expected);
  });

  describe('when the provided business centres are not found in DOM_BUSINESS_CENTRES', () => {
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
          code: DOM_BUSINESS_CENTRES.JO_AMM.CODE,
          name: DOM_BUSINESS_CENTRES.JO_AMM.NAME,
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
