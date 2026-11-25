import { GetObligationSubtypeOdsResponseDto, GetObligationSubtypeResponseDto } from '@ukef/modules/ods/dto';

import { mapObligationSubtype } from './map-obligation-subtype';

describe('mapObligationSubtype', () => {
  it('should map the ODS obligation subtype response DTO to the API obligation subtype response DTO', () => {
    // Arrange
    const mockObligationSubtype: GetObligationSubtypeOdsResponseDto = {
      code: 'OST001',
      name: 'Obligation Subtype 1',
      balanceCategory: 'Category A',
      obligationSubtypeActive: true,
    };

    // Act
    const result = mapObligationSubtype(mockObligationSubtype);

    // Assert
    const expected: GetObligationSubtypeResponseDto = {
      code: 'OST001',
      description: 'Obligation Subtype 1',
      balanceCategory: 'Category A',
      isActive: true,
    };

    expect(result).toEqual(expected);
  });
});
