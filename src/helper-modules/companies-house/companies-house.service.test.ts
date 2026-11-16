import { jest } from '@jest/globals';
import { AxiosError } from 'axios';
import { resetAllWhenMocks, when } from 'jest-when';
import { of, throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { CompaniesHouseService } from './companies-house.service';
import { CompaniesHouseException } from './exception/companies-house.exception';
import { CompaniesHouseInvalidAuthorizationException } from './exception/companies-house-invalid-authorization.exception';
import { CompaniesHouseMalformedAuthorizationHeaderException } from './exception/companies-house-malformed-authorization-header.exception';
import { CompaniesHouseNotFoundException } from './exception/companies-house-not-found.exception';

describe('CompaniesHouseService', () => {
  let httpServiceGet: jest.SpiedFunction<HttpService['get']>;
  let service: CompaniesHouseService;

  const valueGenerator = new RandomValueGenerator();

  const testRegistrationNumber = '00000001';

  const {
    companiesHousePath,
    getCompanyCompaniesHouseResponse,
    getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse,
    getCompanyCompaniesHouseInvalidAuthorizationResponse,
    getCompanyCompaniesHouseNotFoundResponse,
  } = new GetCompanyGenerator(valueGenerator).generate({
    numberToGenerate: 1,
    registrationNumber: testRegistrationNumber,
  });

  const testKey = valueGenerator.string({ length: 40 });
  const encodedTestKey = Buffer.from(testKey).toString('base64');

  const expectedHttpServiceGetArguments: [string, object] = [
    companiesHousePath,
    {
      headers: {
        Authorization: `Basic ${encodedTestKey}`,
      },
    },
  ];

  const expectedHttpServiceGetResponse = of({
    data: getCompanyCompaniesHouseResponse,
    status: 200,
    statusText: 'OK',
    config: undefined,
    headers: undefined,
  });

  beforeAll(() => {
    const httpService = new HttpService();

    httpServiceGet = jest.spyOn(httpService, 'get').mockReset();

    const configService = new ConfigService();

    jest.spyOn(configService, 'get').mockReset().mockReturnValue({ key: testKey });

    const logger = new PinoLogger({});
    logger.info = jest.fn();
    logger.warn = jest.fn();
    logger.error = jest.fn();

    service = new CompaniesHouseService(httpService, configService, logger);
  });

  beforeEach(() => {
    resetAllWhenMocks();
  });

  describe('getCompanyByRegistrationNumber', () => {
    it('should call the Companies House API with the correct arguments', async () => {
      // Arrange
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(expectedHttpServiceGetResponse);

      // Act
      await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(httpServiceGet).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArguments);
    });

    it('should return the results when the Companies House API returns a 200 response with results', async () => {
      // Arrange
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(expectedHttpServiceGetResponse);

      // Act
      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(response).toBe(getCompanyCompaniesHouseResponse);
    });

    it(`should throw a CompaniesHouseMalformedAuthorizationHeaderException when the Companies House API returns a 400 response containing the error string 'Invalid Authorization header'`, async () => {
      // Arrange
      const axiosError = new AxiosError();

      axiosError.response = {
        data: getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse,
        status: 400,
        statusText: 'Bad Request',
        config: undefined,
        headers: undefined,
      };

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(throwError(() => axiosError));

      // Act & Assert
      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseMalformedAuthorizationHeaderException);
      await expect(getCompanyPromise).rejects.toThrow(`Invalid 'Authorization' header. Check that your 'Authorization' header is well-formed.`);
      await expect(getCompanyPromise).rejects.toHaveProperty('innerError', axiosError);
    });

    it(`should throw a CompaniesHouseInvalidAuthorizationException when the Companies House API returns a 401 response containing the error string 'Invalid Authorization'`, async () => {
      // Arrange
      const axiosError = new AxiosError();

      axiosError.response = {
        data: getCompanyCompaniesHouseInvalidAuthorizationResponse,
        status: 401,
        statusText: 'Unauthorized',
        config: undefined,
        headers: undefined,
      };

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(throwError(() => axiosError));

      // Act & Assert
      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseInvalidAuthorizationException);
      await expect(getCompanyPromise).rejects.toThrow('Invalid authorization. Check your Companies House API key.');
      await expect(getCompanyPromise).rejects.toHaveProperty('innerError', axiosError);
    });

    it(`should throw a CompaniesHouseNotFoundException when the Companies House API returns a 404 response status'`, async () => {
      // Arrange
      const axiosError = new AxiosError();

      axiosError.response = {
        data: getCompanyCompaniesHouseNotFoundResponse,
        status: 404,
        statusText: 'Not Found',
        config: undefined,
        headers: undefined,
      };

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(throwError(() => axiosError));

      // Act & Assert
      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseNotFoundException);
      await expect(getCompanyPromise).rejects.toThrow(`Company with registration number ${testRegistrationNumber} was not found.`);
      await expect(getCompanyPromise).rejects.toHaveProperty('innerError', axiosError);
    });

    it('should throw a CompaniesHouseException if the Companies House API returns an unknown error response', async () => {
      // Arrange
      const axiosError = new AxiosError();

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(throwError(() => axiosError));

      // Act & Assert
      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(CompaniesHouseException);
      await expect(getCompanyPromise).rejects.toThrow('Failed to get response from Companies House API.');
      await expect(getCompanyPromise).rejects.toHaveProperty('innerError', axiosError);
    });
  });
});
