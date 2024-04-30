import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosError } from 'axios';
import { when } from 'jest-when';
import { of, throwError } from 'rxjs';
import expectedResponseData = require('./examples/example-response-for-get-company-by-registration-number.json');
import noResultResponseData = require('./examples/example-response-for-get-company-by-registration-number-no-result.json'); // eslint-disable-line unused-imports/no-unused-vars
import { CompaniesHouseService } from './companies-house.service';
import { CompaniesHouseException } from './exception/companies-house.exception';
import { CompaniesHouseNotFoundException } from './exception/companies-house-not-found.exception';

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

    it('throws a CompaniesHouseNotFoundException when the Companies House API returns a 404', async () => {
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(
          of({
            data: noResultResponseData,
            status: 404,
            statusText: 'Not Found',
            config: undefined,
            headers: undefined,
          }),
        );

      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseNotFoundException);
      await expect(getCompanyPromise).rejects.toThrow(`Company with registration number ${testRegistrationNumber} was not found.`);
    });

    it('throws a CompaniesHouseException if the request to the Companies House API fails', async () => {
      const axiosRequestError = new AxiosError();
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(throwError(() => axiosRequestError));

      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseException);
      await expect(getCompanyPromise).rejects.toThrow('Failed to get response from Companies House API.');
      await expect(getCompanyPromise).rejects.toHaveProperty('innerError', axiosRequestError);
    });
  });
});
