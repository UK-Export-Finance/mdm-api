import { EXAMPLES } from '@ukef/constants';
import { GetFeeTypeOdsResponseDto } from '@ukef/modules/ods/dto';

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
      balanceCategory: mockFeeType.balanceCategory,
      baseBalanceCategory: mockFeeType.baseBalanceCategory,
      nonFacilityCurrencySettlement: mockFeeType.nonFacilityCurrencySettlement,
      cappedBaseBalance: mockFeeType.feeTypeCappedBaseBalanceIndicator,
      effectiveDateDefault: mockFeeType.feeEffectiveDateDefault,
      maturityDateDefault: mockFeeType.feeMaturityDateDefault,
    };

    expect(result).toEqual(expected);
  });

  it('should map missing date defaults to null', () => {
    // Arrange
    const mockFeeType = {
      ...EXAMPLES.ODS.CONFIGURATION_FEE,
      feeEffectiveDateDefault: undefined,
      feeMaturityDateDefault: null,
    } as unknown as GetFeeTypeOdsResponseDto;

    // Act
    const result = mapFeeType(mockFeeType);

    // Assert
    expect(result).toMatchObject({
      effectiveDateDefault: null,
      maturityDateDefault: null,
    });
  });
});
