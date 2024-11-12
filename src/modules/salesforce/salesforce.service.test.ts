import { HttpService } from '@nestjs/axios';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosError } from 'axios';
import { when } from 'jest-when';
import { of, throwError } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import { SalesforceException } from './exception/salesforce.exception';
import { SalesforceService } from './salesforce.service';
import { CompanyRegistrationNumberDto } from '../customers/dto/company-registration-number.dto';

describe('SalesforceService', () => {
  const valueGenerator = new RandomValueGenerator();

  let httpServiceGet: jest.Mock;
  let httpServicePost: jest.Mock;
  let configServiceGet: jest.Mock;
  let service: SalesforceService;

  beforeEach(() => {
    const httpService = new HttpService();
    httpServiceGet = jest.fn();
    httpService.get = httpServiceGet;
    httpServicePost = jest.fn();
    httpService.post = httpServicePost;

    const configService = new ConfigService();
    configServiceGet = jest.fn().mockReturnValue({ clientId: 'TEST_CLIENT_ID', clientSecret: 'TEST_CLIENT_SECRET', username: 'TEST_USERNAME', password: 'TEST_PASSWORD', accessUrl: 'TEST_ACCESS_URL' });
    configService.get = configServiceGet;


    service = new SalesforceService(httpService, configService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const companyRegNo = '0' + valueGenerator.stringOfNumericCharacters({ length: 7 });
  const expectedAccessToken = 'TEST_ACCESS_TOKEN';
  const getAccessTokenMethodMock = jest
  .spyOn(SalesforceService.prototype as any, 'getAccessToken')
  .mockImplementation(() => Promise.resolve(expectedAccessToken))

  describe('getCustomers', () => {

    const customerBasePath = '/query';
    const expectedResponse = {
      totalSize: 1,
      data: [
        {
          Id: companyRegNo
        },
      ]
    };

    const query: CompanyRegistrationNumberDto = {
      companyRegistrationNumber: companyRegNo,
    };

    const expectedPath = `${customerBasePath}/?q=SELECT+FIELDS(ALL)+FROM+Account+WHERE+Company_Registration_Number__c='${encodeURIComponent(companyRegNo)}'+LIMIT+200`;

    const expectedHttpServiceGetArgs: [string, object] = [expectedPath, { headers: { 'Authorization': 'Bearer ' + expectedAccessToken } }];

    it('sends a GET to the Salesforce /query endpoint with the specified request', async () => {
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(
          of({
            data: expectedResponse,
            status: 200,
            statusText: 'OK',
            config: undefined,
            headers: undefined,
          }),
        );

      await service.getCustomers(query);

      expect(getAccessTokenMethodMock).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArgs);
    });

    it.each([
      {
        query: { companyRegistrationNumber: '12345678' },
        expectedUrlQueryPart: `/?q=SELECT+FIELDS(ALL)+FROM+Account+WHERE+Company_Registration_Number__c='12345678'+LIMIT+200`,
      },

      {
        query: { companyRegistrationNumber: 'AB123456' },
        expectedUrlQueryPart: `/?q=SELECT+FIELDS(ALL)+FROM+Account+WHERE+Company_Registration_Number__c='AB123456'+LIMIT+200`,
      },
    ])('calls salesforce with correct and safe query parameters "$expectedUrlQueryPart"', async ({ query, expectedUrlQueryPart }) => {
      const expectedPath = `${customerBasePath}${expectedUrlQueryPart}`;

      const expectedHttpServiceGetArgs: [string, object] = [expectedPath, { headers: { 'Authorization': 'Bearer ' + expectedAccessToken } }];

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(
          of({
            data: expectedResponse,
            status: 200,
            statusText: 'OK',
            config: undefined,
            headers: undefined,
          }),
        );

      await service.getCustomers(query);

      expect(httpServiceGet).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArgs);
    });

    it.each([
      {
        query: { companyRegistrationNumber: '123456789' },
        expectedUrlQueryPart: `/?q=SELECT+FIELDS(ALL)+FROM+Account+WHERE+Company_Registration_Number__c='123456789'+LIMIT+200`,
      },

      {
        query: { companyRegistrationNumber: '%26@/;%<>=' },
        expectedUrlQueryPart: `/?q=SELECT+FIELDS(ALL)+FROM+Account+WHERE+Company_Registration_Number__c='%2526%40%2F%3B%25%3C%3E%3D'+LIMIT+200`,
      },
    ])('rejects incorrect or non alphanumeric query parameters "$expectedUrlQueryPart"', async ({ query, expectedUrlQueryPart }) => {
      const expectedPath = `${customerBasePath}${expectedUrlQueryPart}`;

      const expectedHttpServiceGetArgs: [string, object] = [expectedPath, { headers: { 'Authorization': 'Bearer ' + expectedAccessToken } }];

      await expect(service.getCustomers(query)).rejects.toBeInstanceOf(BadRequestException);
      await expect(service.getCustomers(query)).rejects.toThrow('Invalid Company Registration Number');
      
      expect(httpServiceGet).toHaveBeenCalledTimes(0);
    });

    it('returns 404 Not Found if Salesforce response has totalSize = 0 (no customers match the query)', async () => {
      const expectedResponse = {
        totalSize: 0,
        data: []
      };

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(of({
          data: expectedResponse,
          status: 200,
          statusText: 'OK',
          config: undefined,
          headers: undefined,
        }));

      const getCustomersPromise = service.getCustomers(query);

      await expect(getCustomersPromise).rejects.toBeInstanceOf(NotFoundException);
      await expect(getCustomersPromise).rejects.toThrow('Customer not found');
    });

    it('throws a SalesforceException if the request to Salesforce fails', async () => {
      const axiosRequestError = new AxiosError();
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(throwError(() => axiosRequestError));
      const getCustomersPromise = service.getCustomers(query);

      await expect(getCustomersPromise).rejects.toBeInstanceOf(SalesforceException);
      await expect(getCustomersPromise).rejects.toThrow('Failed to get customers in Salesforce');
      await expect(getCustomersPromise).rejects.toHaveProperty('innerError', axiosRequestError);
    });
  });
});
