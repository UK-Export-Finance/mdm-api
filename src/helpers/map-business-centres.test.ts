import { GetOdsBusinessCentreResponse } from '@ukef/modules/ods/dto';

import { mapBusinessCentres } from './map-business-centres';

const mockBusinessCentres: GetOdsBusinessCentreResponse[] = [
  {
    business_centre_code: 'A',
    business_centre_name: 'Business centre A',
  },
  {
    business_centre_code: 'B',
    business_centre_name: 'Business centre B',
  },
  {
    business_centre_code: 'C',
    business_centre_name: 'Business centre C',
  },
];

describe('mapBusinessCentres', () => {
  it('should return an array of mapped business centres', () => {
    // Act
    const result = mapBusinessCentres(mockBusinessCentres);

    // Assert
    const expected = [
      {
        code: mockBusinessCentres[0].business_centre_code,
        name: mockBusinessCentres[0].business_centre_name,
      },
      {
        code: mockBusinessCentres[1].business_centre_code,
        name: mockBusinessCentres[1].business_centre_name,
      },
      {
        code: mockBusinessCentres[2].business_centre_code,
        name: mockBusinessCentres[2].business_centre_name,
      },
    ];

    expect(result).toEqual(expected);
  });
});
