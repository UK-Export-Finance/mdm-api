import { EXAMPLES } from '@ukef/constants';

import { mapBusinessCentre } from './map-business-centre';

describe('mapBusinessCentre', () => {
  it('should return a mapped DOM business centre', () => {
    // Arrange
    const [mockBusinessCentre] = EXAMPLES.DOM.BUSINESS_CENTRES;

    // Act
    const result = mapBusinessCentre(mockBusinessCentre);

    // Assert
    const expected = {
      code: EXAMPLES.BUSINESS_CENTRE.CODE,
      name: EXAMPLES.BUSINESS_CENTRE.NAME,
      description: EXAMPLES.BUSINESS_CENTRE.DESCRIPTION,
      isActive: EXAMPLES.BUSINESS_CENTRE.IS_ACTIVE,
    };

    expect(result).toEqual(expected);
  });
});
