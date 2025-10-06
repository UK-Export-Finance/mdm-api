import { NotFoundException } from '@nestjs/common';
import { EXAMPLES } from '@ukef/constants';
import { GetGeospatialAddressesGenerator } from '@ukef-test/support/generator/get-geospatial-addresses-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { GeospatialController } from './geospatial.controller';
import { GeospatialService } from './geospatial.service';

describe('GeospatialController', () => {
  let geospatialServiceGetAddressesByPostcode: jest.Mock;

  let controller: GeospatialController;

  const valueGenerator = new RandomValueGenerator();
  const { getAddressesByPostcodeResponse, getAddressesByPostcodeMultipleResponse } = new GetGeospatialAddressesGenerator(valueGenerator).generate({
    numberToGenerate: 1,
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
    const postcode = EXAMPLES.GEOSPATIAL.ENGLISH_POSTCODE;

    it('returns a single address for the postcode when the service returns a single address', async () => {
      when(geospatialServiceGetAddressesByPostcode).calledWith(postcode).mockResolvedValueOnce(getAddressesByPostcodeResponse[0]);

      const response = await controller.getAddressesByPostcode({ postcode });

      expect(geospatialServiceGetAddressesByPostcode).toHaveBeenCalledTimes(1);
      expect(response).toEqual(getAddressesByPostcodeResponse[0]);
    });

    it('returns multiple addresses for the postcode when the service returns multiple addresses', async () => {
      when(geospatialServiceGetAddressesByPostcode).calledWith(postcode).mockResolvedValueOnce(getAddressesByPostcodeMultipleResponse);

      const response = await controller.getAddressesByPostcode({ postcode });

      expect(geospatialServiceGetAddressesByPostcode).toHaveBeenCalledTimes(1);
      expect(response).toEqual(getAddressesByPostcodeMultipleResponse);
    });

    it('passes NotFoundException when it is thrown by geospatialService', async () => {
      const errorMessage = valueGenerator.sentence();
      when(geospatialServiceGetAddressesByPostcode).calledWith(postcode).mockRejectedValueOnce(new NotFoundException(errorMessage));

      const responsePromise = controller.getAddressesByPostcode({ postcode });

      expect(geospatialServiceGetAddressesByPostcode).toHaveBeenCalledTimes(1);

      await expect(responsePromise).rejects.toBeInstanceOf(NotFoundException);
      await expect(responsePromise).rejects.toThrow(errorMessage);
    });
  });
});
