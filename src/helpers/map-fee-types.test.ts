import { EXAMPLES } from '@ukef/constants';

import { mapFeeType } from './map-fee-type';
import { mapFeeTypes } from './map-fee-types';

describe('mapFeeTypes', () => {
  it('should return an array of fee types', () => {
    // Arrange
    const mockFeeTypes = [EXAMPLES.ODS.CONFIGURATION_FEE, EXAMPLES.ODS.CONFIGURATION_FEE];

    // Act
    const result = mapFeeTypes(mockFeeTypes);

    // Assert
    const expected = [mapFeeType(mockFeeTypes[0]), mapFeeType(mockFeeTypes[1])];

    expect(result).toEqual(expected);
  });
});
