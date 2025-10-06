import { DOM_BUSINESS_CENTRES } from '@ukef/constants';

import { mapBusinessCentre } from './map-business-centre';
import { mapBusinessCentres } from './map-business-centres';

describe('mapBusinessCentres', () => {
  it('should return an array of mapped DOM business centres', () => {
    // Arrange
    const businessCentres = Object.values(DOM_BUSINESS_CENTRES);

    // Act
    const result = mapBusinessCentres(businessCentres);

    // Assert
    const expected = businessCentres.map((centre) => mapBusinessCentre(centre));

    expect(result).toEqual(expected);
  });
});
