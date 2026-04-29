import { EXAMPLES } from '@ukef/constants';

import { mapFeeType } from './map-fee-type';

describe('mapFeeType', () => {
  it('should return a mapped fee type', () => {
    // Arrange
    const mockFeeType = EXAMPLES.ODS.CONFIGURATION_FEE;

    // Act
    const result = mapFeeType(mockFeeType);

    // Assert
    const expected = {
      feeType: mockFeeType.feeType,
      name: mockFeeType.name,
      classification: mockFeeType.feeTypeClassification,
      expenseIncome: mockFeeType.feeTypeExpenseIncome,
      isActive: mockFeeType.feeTypeActive,
    };

    expect(result).toEqual(expected);
  });
});
