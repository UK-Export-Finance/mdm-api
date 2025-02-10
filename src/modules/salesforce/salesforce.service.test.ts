import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CUSTOMERS } from '@ukef/constants';
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
    const baseQuery = {
      Name: companyRegNo,
      Party_URN__c: '00312345',
      D_B_Number__c: '12341234',
      Company_Registration_Number__c: companyRegNo,
      CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
      CCM_Credit_Risk_Rating__c: CUSTOMERS.EXAMPLES.CREDIT_RISK_RATING,
      CCM_Loss_Given_Default__c: CUSTOMERS.EXAMPLES.LOSS_GIVEN_DEFAULT,
      CCM_Probability_of_Default__c: 3,
    };
    const baseExpectedHttpServicePostArgs: [string, body: CreateCustomerDto, object] = [
      customerBasePath,
      baseQuery,
      { headers: { Authorization: 'Bearer ' + expectedAccessToken } },
    ];

    it.each([
      baseQuery,
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: CUSTOMERS.EXAMPLES.CREDIT_RISK_RATING,
        CCM_Loss_Given_Default__c: CUSTOMERS.EXAMPLES.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: 0.0,
      },
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: CUSTOMERS.EXAMPLES.CREDIT_RISK_RATING,
        CCM_Loss_Given_Default__c: CUSTOMERS.EXAMPLES.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: undefined,
      },
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: CUSTOMERS.EXAMPLES.CREDIT_RISK_RATING,
        CCM_Loss_Given_Default__c: CUSTOMERS.EXAMPLES.LOSS_GIVEN_DEFAULT,
      },
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: CUSTOMERS.EXAMPLES.CREDIT_RISK_RATING,
        CCM_Loss_Given_Default__c: CUSTOMERS.EXAMPLES.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: 100.0,
      },
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: 'A+++',
        CCM_Loss_Given_Default__c: 100,
        CCM_Probability_of_Default__c: 14.1,
      },
    ])('sends a POST to the Salesforce /sobjects/Account endpoint with the specified request', async (query) => {
      const expectedHttpServicePostArgs: [string, body: CreateCustomerDto, object] = [
        customerBasePath,
        query,
        { headers: { Authorization: 'Bearer ' + expectedAccessToken } },
      ];

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
        .calledWith(...baseExpectedHttpServicePostArgs)
        .mockReturnValueOnce(throwError(() => axiosRequestError));
      const getCustomersPromise = service.createCustomer(baseQuery);

      await expect(getCustomersPromise).rejects.toBeInstanceOf(SalesforceException);
      await expect(getCustomersPromise).rejects.toThrow('Failed to create customer in Salesforce');
      await expect(getCustomersPromise).rejects.toHaveProperty('innerError', axiosRequestError);
    });

    it.each([
      {
        Name: companyRegNo,
        Party_URN__c: null,
        D_B_Number__c: null,
        Company_Registration_Number__c: '12341234',
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: null,
        CCM_Loss_Given_Default__c: CUSTOMERS.EXAMPLES.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: null,
      },
      {
        Name: companyRegNo,
        Party_URN__c: null,
        D_B_Number__c: null,
        Company_Registration_Number__c: '12341234',
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: CUSTOMERS.EXAMPLES.CREDIT_RISK_RATING,
        CCM_Loss_Given_Default__c: CUSTOMERS.EXAMPLES.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: 101,
      },
      {
        Name: companyRegNo,
        Party_URN__c: null,
        D_B_Number__c: null,
        Company_Registration_Number__c: '12341234',
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: CUSTOMERS.EXAMPLES.CREDIT_RISK_RATING,
        CCM_Loss_Given_Default__c: CUSTOMERS.EXAMPLES.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: -1,
      },
    ])('throws a TypeError if the request is malformed', async (malformedQuery) => {
      const typeError = new TypeError("Cannot read properties of undefined (reading 'pipe')");
      const getCustomersPromise = service.createCustomer(malformedQuery);

      await expect(getCustomersPromise).rejects.toBeInstanceOf(TypeError);
      await expect(getCustomersPromise).rejects.toEqual(typeError);
    });
  });
});
