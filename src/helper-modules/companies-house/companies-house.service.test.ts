import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { when } from 'jest-when';
import { of } from 'rxjs';
import expectedResponseData = require('./examples/example-response-for-get-company-by-registration-number.json');
import noResultsResponseData = require('./examples/example-response-for-get-company-by-registration-number-no-results.json'); // eslint-disable-line unused-imports/no-unused-vars
import { CompaniesHouseService } from './companies-house.service';

describe('CompaniesHouseService', () => {
  let httpServiceGet: jest.Mock;
  let configServiceGet: jest.Mock;
  let service: CompaniesHouseService;

  const basePath = '/company';
  const testRegistrationNumber = '00000001';
  const expectedPath = `${basePath}/${testRegistrationNumber}`;
  const valueGenerator = new RandomValueGenerator();
  const testKey = valueGenerator.string({ length: 40 });
  const encodedTestKey = Buffer.from(testKey).toString('base64');
  const expectedHttpServiceGetArgs: [string, object] = [
    expectedPath,
    {
      headers: {
        Authorization: `Basic ${encodedTestKey}`,
        'Content-Type': 'application/json',
      },
    },
  ];
  const expectedResponse = of({
    data: expectedResponseData,
    status: 200,
    statusText: 'OK',
    config: undefined,
    headers: undefined,
  });

  beforeEach(() => {
    const httpService = new HttpService();
    httpServiceGet = jest.fn();
    httpService.get = httpServiceGet;

    const configService = new ConfigService();
    configServiceGet = jest.fn().mockReturnValue({ key: testKey });
    configService.get = configServiceGet;

    service = new CompaniesHouseService(httpService, configService);
  });

  describe('getCompanyByRegistrationNumber', () => {
    it('calls the Companies House API with the correct arguments', async () => {
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(expectedResponse);

      await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      expect(httpServiceGet).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArgs);
    });

    it('returns the results when the Companies House API returns a 200 with results', async () => {
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(expectedResponse);

      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      expect(response).toBe(expectedResponseData);
    });
  });
});
