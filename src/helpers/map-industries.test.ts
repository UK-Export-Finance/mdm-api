import { EXAMPLES } from '@ukef/constants';

import { mapIndustries } from './map-industries';
import { mapIndustry } from './map-industry';

describe('mapIndustries', () => {
  it('should return an array of mapped industries', () => {
    // Arrange
    const mockIndustries = [EXAMPLES.ODS.INDUSTRY, EXAMPLES.ODS.INDUSTRY];

    // Act
    const result = mapIndustries(mockIndustries);

    // Assert
    const expected = [mapIndustry(EXAMPLES.ODS.INDUSTRY), mapIndustry(EXAMPLES.ODS.INDUSTRY)];

    expect(result).toEqual(expected);
  });
});
