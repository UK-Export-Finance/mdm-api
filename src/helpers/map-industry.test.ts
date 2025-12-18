import { EXAMPLES } from '@ukef/constants';

import { mapIndustry } from './map-industry';

describe('mapIndustry', () => {
  it('should return a mapped ODS industry', () => {
    // Arrange
    const mockIndustry = EXAMPLES.ODS.INDUSTRY;

    // Act
    const result = mapIndustry(mockIndustry);

    // Assert
    const expected = {
      id: mockIndustry.industry_id,
      code: mockIndustry.industry_code,
      description: mockIndustry.industry_description,
      groupCode: mockIndustry.industry_group_code,
      groupDescription: mockIndustry.industry_group_description,
      category: mockIndustry.industry_category,
    };

    expect(result).toEqual(expected);
  });
});
