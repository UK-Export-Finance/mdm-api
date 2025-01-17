import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosError, HttpStatusCode } from 'axios';
import { when } from 'jest-when';
import { of, throwError } from 'rxjs';

import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import { SalesforceException } from './exception/salesforce.exception';
import { SalesforceService } from './salesforce.service';

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
    configServiceGet = jest.fn().mockReturnValue({
      clientId: 'TEST_CLIENT_ID',
      clientSecret: 'TEST_CLIENT_SECRET',
      username: 'TEST_USERNAME',
      password: 'TEST_PASSWORD',
      accessUrl: 'TEST_ACCESS_URL',
    });
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
    .mockImplementation(() => Promise.resolve(expectedAccessToken));

  describe('createCustomer', () => {
    const customerBasePath = '/sobjects/Account';
    const expectedResponse = {
      id: '1234asdf',
      errors: null,
      success: true,
    };

    const query: CreateCustomerDto = {
      Name: companyRegNo,
      Party_URN__c: '00312345',
      D_B_Number__c: '12341234',
      Company_Registration_Number__c: companyRegNo,
    };

    const expectedHttpServicePostArgs: [string, body: CreateCustomerDto, object] = [
      customerBasePath,
      query,
      { headers: { Authorization: 'Bearer ' + expectedAccessToken } },
    ];

    it('sends a POST to the Salesforce /sobjects/Account endpoint with the specified request', async () => {
      when(httpServicePost)
        .calledWith(...expectedHttpServicePostArgs)
        .mockReturnValueOnce(
          of({
            data: expectedResponse,
            status: HttpStatusCode.Created,
            statusText: 'OK',
            config: undefined,
            headers: undefined,
          }),
        );
      await service.createCustomer(query);

      expect(getAccessTokenMethodMock).toHaveBeenCalledTimes(1);
      expect(httpServicePost).toHaveBeenCalledTimes(1);
      expect(httpServicePost).toHaveBeenCalledWith(...expectedHttpServicePostArgs);
    });

    it('throws a SalesforceException if the request to Salesforce fails', async () => {
      const axiosRequestError = new AxiosError();
      when(httpServicePost)
        .calledWith(...expectedHttpServicePostArgs)
        .mockReturnValueOnce(throwError(() => axiosRequestError));
      const getCustomersPromise = service.createCustomer(query);

      await expect(getCustomersPromise).rejects.toBeInstanceOf(SalesforceException);
      await expect(getCustomersPromise).rejects.toThrow('Failed to create customer in Salesforce');
      await expect(getCustomersPromise).rejects.toHaveProperty('innerError', axiosRequestError);
    });

    it('throws a TypeError if the request is malformed', async () => {
      const malformedQuery: CreateCustomerDto = {
        Name: companyRegNo,
        Party_URN__c: null,
        D_B_Number__c: null,
        Company_Registration_Number__c: '12341234',
      };

      const typeError = new TypeError("Cannot read properties of undefined (reading 'pipe')");
      const getCustomersPromise = service.createCustomer(malformedQuery);

      await expect(getCustomersPromise).rejects.toBeInstanceOf(TypeError);
      await expect(getCustomersPromise).rejects.toEqual(typeError);
    });
  });
});
