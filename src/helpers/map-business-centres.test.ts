import { EXAMPLES } from '@ukef/constants';

import { mapBusinessCentre } from './map-business-centre';
import { mapBusinessCentres } from './map-business-centres';

describe('mapBusinessCentres', () => {
  it('should return an array of mapped DOM business centres', () => {
    // Arrange
    const mockBusinessCentres = EXAMPLES.DOM.BUSINESS_CENTRES;

    // Act
    const result = mapBusinessCentres(mockBusinessCentres);

    // Assert
    const expected = mockBusinessCentres.map((centre) => mapBusinessCentre(centre));

    expect(result).toEqual(expected);
  });
});
