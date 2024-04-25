import { ConfigService } from '@nestjs/config';
import { OrdnanceSurveyService } from '@ukef/helper-modules/ordnance-survey/ordnance-survey.service';
import { GetGeospatialAddressesGenerator } from '@ukef-test/support/generator/get-geospatial-addresses-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { GeospatialService } from './geospatial.service';

jest.mock('@ukef/modules/informatica/informatica.service');

describe('GeospatialService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: GeospatialService;
  let configServiceGet: jest.Mock;
  let informaticaServiceGetAddressesByPostcode: jest.Mock;

  beforeEach(() => {
    const configService = new ConfigService();
    configServiceGet = jest.fn().mockReturnValue({ key: valueGenerator.word() });
    configService.get = configServiceGet;

    informaticaServiceGetAddressesByPostcode = jest.fn();
    const ordnanceSurveyService = new OrdnanceSurveyService(null, configService);
    ordnanceSurveyService.getAddressesByPostcode = informaticaServiceGetAddressesByPostcode;
    resetAllWhenMocks();

    service = new GeospatialService(ordnanceSurveyService);
  });

  describe('getAddressesByPostcode', () => {
    const {
      getAddressByPostcodeResponse,
      getAddressByPostcodeMultipleResponse,
      getAddressOrdnanceSurveyResponse,
      getAddressOrdnanceSurveyMultipleResponse,
      getAddressOrdnanceSurveyEmptyResponse,
    } = new GetGeospatialAddressesGenerator(valueGenerator).generate({
      numberToGenerate: 2,
    });
    const postcode = getAddressByPostcodeResponse[0][0].postalCode;

    it('returns a single address from the backend service', async () => {
      when(informaticaServiceGetAddressesByPostcode).calledWith(postcode).mockResolvedValueOnce(getAddressOrdnanceSurveyResponse[0]);

      const response = await service.getAddressesByPostcode(postcode);

      expect(response).toEqual(getAddressByPostcodeResponse[0]);
    });

    it('returns multiple addressess from the backend service', async () => {
      when(informaticaServiceGetAddressesByPostcode).calledWith(postcode).mockResolvedValueOnce(getAddressOrdnanceSurveyMultipleResponse);

      const response = await service.getAddressesByPostcode(postcode);

      expect(response).toEqual(getAddressByPostcodeMultipleResponse);
    });

    it('can handle empty backend response', async () => {
      when(informaticaServiceGetAddressesByPostcode).calledWith(postcode).mockResolvedValueOnce(getAddressOrdnanceSurveyEmptyResponse[0]);

      const response = await service.getAddressesByPostcode(postcode);

      expect(response).toEqual([]);
    });

    it('returns addressLine1 formatted correctly even if middle value is missing', async () => {
      const [modifiedOrdnanceSurveyResponse] = structuredClone(getAddressOrdnanceSurveyResponse);
      modifiedOrdnanceSurveyResponse.results[0].DPA.BUILDING_NUMBER = null;
      const address = modifiedOrdnanceSurveyResponse.results[0].DPA;
      when(informaticaServiceGetAddressesByPostcode).calledWith(postcode).mockResolvedValueOnce(modifiedOrdnanceSurveyResponse);

      const response = await service.getAddressesByPostcode(postcode);

      expect(response[0].addressLine1).toBe(`${address.BUILDING_NAME} ${address.THOROUGHFARE_NAME}`);
    });
  });
});
