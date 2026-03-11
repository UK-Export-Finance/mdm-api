import { EXAMPLES } from '@ukef/constants';

import { mapAccrualFrequencies } from './map-accrual-frequencies';
import { mapAccrualFrequency } from './map-accrual-frequency';

describe('mapAccrualFrequencies', () => {
  it('should return an array of accrual frequencies', () => {
    // Arrange
    const mockFrequencies = [EXAMPLES.ODS.CONFIGURATION_FREQUENCY, EXAMPLES.ODS.CONFIGURATION_FREQUENCY, EXAMPLES.ODS.CONFIGURATION_FREQUENCY];

    // Act
    const result = mapAccrualFrequencies(mockFrequencies);

    // Assert
    const expected = [mapAccrualFrequency(mockFrequencies[0]), mapAccrualFrequency(mockFrequencies[1]), mapAccrualFrequency(mockFrequencies[2])];

    expect(result).toEqual(expected);
  });
});
