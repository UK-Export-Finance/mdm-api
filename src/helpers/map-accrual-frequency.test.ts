import { EXAMPLES } from '@ukef/constants';

import { mapAccrualFrequency } from './map-accrual-frequency';

describe('mapAccrualFrequency', () => {
  it('should return an mapped accrual frequencies', () => {
    // Arrange
    const mockFrequency = EXAMPLES.ODS.CONFIGURATION_FREQUENCY;

    // Act
    const result = mapAccrualFrequency(mockFrequency);

    // Assert
    const expected = {
      code: mockFrequency.code,
      name: mockFrequency.name,
      orderId: mockFrequency.orderId,
      frequencyNumberOfUnits: mockFrequency.frequencyNumberOfUnits,
      frequencyUnit: mockFrequency.frequencyUnits,
      isActive: mockFrequency.frequencyActive,
    };

    expect(result).toEqual(expected);
  });
});
