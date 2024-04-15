import { GEOSPATIAL } from '@ukef/constants';
import { GetGeospatialAddressesGenerator } from '@ukef-test/support/generator/get-geospatial-addresses-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { GeospatialController } from './geospatial.controller';
import { GeospatialService } from './geospatial.service';

describe('GeospatialController', () => {
  let geospatialServiceGetAddressesByPostcode: jest.Mock;

  let controller: GeospatialController;

  const valueGenerator = new RandomValueGenerator();
  const { getAddressByPostcodeResponse, getAddressByPostcodeMultipleResponse } = new GetGeospatialAddressesGenerator(valueGenerator).generate({
    numberToGenerate: 2,
  });

  beforeEach(() => {
    resetAllWhenMocks();
    const geospatialService = new GeospatialService(null);
    geospatialServiceGetAddressesByPostcode = jest.fn();
    geospatialService.getAddressesByPostcode = geospatialServiceGetAddressesByPostcode;

    controller = new GeospatialController(geospatialService);
  });

  it('should be defined', () => {
    expect(GeospatialController).toBeDefined();
  });

  describe('getAddressesByPostcode()', () => {
    const postcode = GEOSPATIAL.EXAMPLES.POSTCODE;

    it('returns address for postcode', async () => {
      when(geospatialServiceGetAddressesByPostcode).calledWith(postcode).mockResolvedValueOnce(getAddressByPostcodeResponse[0]);

      const response = await controller.getAddressesByPostcode({ postcode });

      expect(geospatialServiceGetAddressesByPostcode).toHaveBeenCalled();
      expect(response).toEqual(getAddressByPostcodeResponse[0]);
    });

    it('returns multiple addressess for postcode', async () => {
      when(geospatialServiceGetAddressesByPostcode).calledWith(postcode).mockResolvedValueOnce(getAddressByPostcodeMultipleResponse);

      const response = await controller.getAddressesByPostcode({ postcode });

      expect(geospatialServiceGetAddressesByPostcode).toHaveBeenCalled();
      expect(response).toEqual(getAddressByPostcodeMultipleResponse);
    });

    it('returns empty response for postcode', async () => {
      when(geospatialServiceGetAddressesByPostcode).calledWith(postcode).mockResolvedValueOnce([]);

      const response = await controller.getAddressesByPostcode({ postcode });

      expect(geospatialServiceGetAddressesByPostcode).toHaveBeenCalled();
      expect(response).toEqual([]);
    });
  });
});
