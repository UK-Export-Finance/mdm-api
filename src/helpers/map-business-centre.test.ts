import { DOM_BUSINESS_CENTRES } from '@ukef/constants';

import { mapBusinessCentre } from './map-business-centre';

describe('mapBusinessCentre', () => {
  it('should return a mapped DOM business centre', () => {
    // Arrange
    const mockBusinessCentre = DOM_BUSINESS_CENTRES.AE_DXB;

    // Act
    const result = mapBusinessCentre(mockBusinessCentre);

    // Assert
    const expected = {
      code: mockBusinessCentre.CODE,
      name: mockBusinessCentre.NAME,
    };

    expect(result).toEqual(expected);
  });
});
