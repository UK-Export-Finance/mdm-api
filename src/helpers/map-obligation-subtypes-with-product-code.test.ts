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
        productTypeCode: 'BIP',
      },
    ];

    expect(result).toEqual(expected);
  });
});
