import { mockObligationSubtype, mockObligationSubtypes, mockProductConfigs } from '@ukef/modules/ods/test-helpers';

import { mapObligationSubtypesWithProductCode } from './map-obligation-subtypes-with-product-code';

describe('mapObligationSubtypesWithProductCode', () => {
  it('should map obligation subtypes with product type code', () => {
    // Act
    const result = mapObligationSubtypesWithProductCode({
      productConfigs: mockProductConfigs,
      obligationSubtypes: mockObligationSubtypes,
    });

    // Assert
    const expected = [
      {
        ...mockObligationSubtype,
        code: 'OST001',
        productTypeCode: 'PRT001',
      },
      {
        ...mockObligationSubtype,
        code: 'OST003',
        productTypeCode: 'PRT001',
      },
      {
        ...mockObligationSubtype,
        code: 'OST006',
        productTypeCode: 'PRT001',
      },
      {
        ...mockObligationSubtype,
        code: 'OST001',
        productTypeCode: 'PRT002',
      },
      {
        ...mockObligationSubtype,
        code: 'OST002',
        productTypeCode: 'PRT002',
      },
      {
        ...mockObligationSubtype,
        code: 'OST004',
        productTypeCode: 'PRT002',
      },
      {
        ...mockObligationSubtype,
        code: 'OST005',
        productTypeCode: 'PRT002',
      },
    ];

    expect(result).toEqual(expected);
  });

  describe('when an obligation subtype code in a product config is not found in the obligation subtypes list', () => {
    it('should throw an error', () => {
      // Arrange
      const mockSubtypeCode = 'OST_UNKNOWN';

      const productConfigWithUnknownSubtype = [
        {
          ...mockProductConfigs[0],
          obligationSubtypes: [mockSubtypeCode],
        },
      ];

      // Act & Assert
      expect(() =>
        mapObligationSubtypesWithProductCode({
          productConfigs: productConfigWithUnknownSubtype,
          obligationSubtypes: mockObligationSubtypes,
        }),
      ).toThrow(`Obligation subtype with code "${mockSubtypeCode}" not found for product type "${mockProductConfigs[0].productType}".`);
    });
  });
});
