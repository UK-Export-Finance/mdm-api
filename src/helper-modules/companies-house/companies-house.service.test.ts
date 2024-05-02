import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosError } from 'axios';
import { when } from 'jest-when';
import { of, throwError } from 'rxjs';
import badRequestInvalidAuthorizationHeaderResponseData = require('./examples/example-response-for-get-company-by-registration-number-bad-request-invalid-authorization-header.json');
import expectedResponseData = require('./examples/example-response-for-get-company-by-registration-number.json');
import notFoundResponseData = require('./examples/example-response-for-get-company-by-registration-number-not-found.json');
import unauthorizedResponseData = require('./examples/example-response-for-get-company-by-registration-number-unauthorized.json');
import { CompaniesHouseService } from './companies-house.service';
import { CompaniesHouseException } from './exception/companies-house.exception';
import { CompaniesHouseNotFoundException } from './exception/companies-house-not-found.exception';
import { CompaniesHouseUnauthorizedException } from './exception/companies-house-unauthorized.exception';

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

    it(`throws a CompaniesHouseNotFoundException when the Companies House API returns a 404 response containing the error string 'company-profile-not-found'`, async () => {
      const axiosError = new AxiosError();
      axiosError.response = {
        data: notFoundResponseData,
        status: 404,
        statusText: 'Not Found',
        config: undefined,
        headers: undefined,
      };

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(throwError(() => axiosError));

      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseNotFoundException);
      await expect(getCompanyPromise).rejects.toThrow(`Company with registration number ${testRegistrationNumber} was not found.`);
      await expect(getCompanyPromise).rejects.toHaveProperty('innerError', axiosError);
    });

    it('throws a CompaniesHouseUnauthorizedException when the Companies House API returns a 401', async () => {
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(
          of({
            data: unauthorizedResponseData,
            status: 401,
            statusText: 'Unauthorized',
            config: undefined,
            headers: undefined,
          }),
        );

      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseUnauthorizedException);
      await expect(getCompanyPromise).rejects.toThrow(`Invalid authorization. Check your Companies House API key and 'Authorization' header.`);
    });

    it(`throws a CompaniesHouseUnauthorizedException when the Companies House API returns a 400 with an 'Invalid Authorization header' error field`, async () => {
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(
          of({
            data: badRequestInvalidAuthorizationHeaderResponseData,
            status: 400,
            statusText: 'Bad Request',
            config: undefined,
            headers: undefined,
          }),
        );

      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseUnauthorizedException);
      await expect(getCompanyPromise).rejects.toThrow(`Invalid authorization. Check your Companies House API key and 'Authorization' header.`);
    });

    it('throws a CompaniesHouseException if the request to the Companies House API fails', async () => {
      const axiosError = new AxiosError();
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(throwError(() => axiosError));

      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseException);
      await expect(getCompanyPromise).rejects.toThrow('Failed to get response from Companies House API.');
      await expect(getCompanyPromise).rejects.toHaveProperty('innerError', axiosError);
    });
  });
});
