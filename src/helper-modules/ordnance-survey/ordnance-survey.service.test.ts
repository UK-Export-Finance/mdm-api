import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosError } from 'axios';
import { when } from 'jest-when';
import { of, throwError } from 'rxjs';
import expectedResponseData = require('./examples/example-response-for-search-places-v1-postcode.json');
import noResultsResponseData = require('./examples/example-response-for-search-places-v1-postcode-no-results.json');

import { GEOSPATIAL } from '@ukef/constants';

import { OrdnanceSurveyException } from './exception/ordnance-survey.exception';
import { OrdnanceSurveyService } from './ordnance-survey.service';

describe('OrdnanceSurveyService', () => {
  const valueGenerator = new RandomValueGenerator();

  let httpServiceGet: jest.Mock;
  let configServiceGet: jest.Mock;
  let service: OrdnanceSurveyService;

  const testPostcode = GEOSPATIAL.EXAMPLES.POSTCODE;
  const testKey = valueGenerator.string({ length: 10 });
  const basePath = '/search/places/v1/postcode';

  const expectedResponse = of({
    data: expectedResponseData,
    status: 200,
    statusText: 'OK',
    config: undefined,
    headers: undefined,
  });

  beforeEach(() => {
    const httpService = new HttpService();
    const configService = new ConfigService();
    httpServiceGet = jest.fn();
    httpService.get = httpServiceGet;

    configServiceGet = jest.fn().mockReturnValue({ key: testKey });
    configService.get = configServiceGet;

    service = new OrdnanceSurveyService(httpService, configService);
  });

  describe('getAddressesByPostcode', () => {
    const expectedPath = `${basePath}?postcode=${encodeURIComponent(testPostcode)}&lr=EN&key=${encodeURIComponent(testKey)}`;

    const expectedHttpServiceGetArgs: [string, object] = [expectedPath, { headers: { 'Content-Type': 'application/json' } }];

    describe.each([
      {
        postcode: testPostcode,
        expectedUrlQueryPart: `?postcode=${encodeURIComponent(testPostcode)}`,
      },
      {
        postcode: 'W1A 1AA',
        expectedUrlQueryPart: `?postcode=W1A%201AA`,
      },
      {
        postcode: 'W1A1AA',
        expectedUrlQueryPart: '?postcode=W1A1AA',
      },
    ])('test postcode $postcode', ({ postcode, expectedUrlQueryPart }) => {
      it('calls Ordnance Survey with the correct arguments', async () => {
        const expectedPath = `${basePath}${expectedUrlQueryPart}&lr=EN&key=${encodeURIComponent(testKey)}`;
        const expectedHttpServiceGetArgs: [string, object] = [expectedPath, { headers: { 'Content-Type': 'application/json' } }];

        when(httpServiceGet)
          .calledWith(...expectedHttpServiceGetArgs)
          .mockReturnValueOnce(expectedResponse);
        await service.getAddressesByPostcode(postcode);

        expect(httpServiceGet).toHaveBeenCalledTimes(1);
        expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArgs);
      });

      it('call Ordnance Survey returns expectedResponse', async () => {
        const expectedPath = `${basePath}${expectedUrlQueryPart}&lr=EN&key=${encodeURIComponent(testKey)}`;
        const expectedHttpServiceGetArgs: [string, object] = [expectedPath, { headers: { 'Content-Type': 'application/json' } }];

        when(httpServiceGet)
          .calledWith(...expectedHttpServiceGetArgs)
          .mockReturnValueOnce(expectedResponse);

        const response = await service.getAddressesByPostcode(postcode);

        expect(response).toBe(expectedResponseData);
      });
    });

    it('returns a 200 response without results when Ordnance Survey returns no results', async () => {
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(
          of({
            data: noResultsResponseData,
            status: 200,
            statusText: 'OK',
            config: undefined,
            headers: undefined,
          }),
        );

      const results = await service.getAddressesByPostcode(testPostcode);

      expect(httpServiceGet).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArgs);
      expect(results).toBe(noResultsResponseData);
    });

    it('throws an OrdnanceSurveyException if the request to Ordnance Survey fails', async () => {
      const axiosRequestError = new AxiosError();
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(throwError(() => axiosRequestError));

      const getCustomersPromise = service.getAddressesByPostcode(testPostcode);

      await expect(getCustomersPromise).rejects.toBeInstanceOf(OrdnanceSurveyException);
      await expect(getCustomersPromise).rejects.toThrow('Failed to get response from Ordnance Survey API.');
      await expect(getCustomersPromise).rejects.toHaveProperty('innerError', axiosRequestError);
    });
  });
});
