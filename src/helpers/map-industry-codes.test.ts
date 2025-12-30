import { EXAMPLES } from '@ukef/constants';

import { mapIndustryCodes } from './map-industry-codes';

describe('mapIndustryCodes', () => {
  it('should return an array of industry codes', () => {
    // Arrange
    const mockIndustries = [EXAMPLES.ODS.INDUSTRY, EXAMPLES.ODS.INDUSTRY, EXAMPLES.ODS.INDUSTRY];

    // Act
    const result = mapIndustryCodes(mockIndustries);

    // Assert
    const expected = [mockIndustries[0].industry_code, mockIndustries[1].industry_code, mockIndustries[2].industry_code];

    expect(result).toEqual(expected);
  });
});
