import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError, HttpStatusCode } from 'axios';
import { when } from 'jest-when';
import { of, throwError } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { EXAMPLES } from '@ukef/constants';

import { CreateCustomerDto } from '@ukef/modules/customers/dto/create-customer.dto';
import { SalesforceException } from './exception/salesforce.exception';
import { SalesforceService } from './salesforce.service';

describe('SalesforceService', () => {
  const valueGenerator = new RandomValueGenerator();

  let httpServiceGet: jest.Mock;
  let httpServicePost: jest.Mock;
  let configServiceGet: jest.Mock;
  let service: SalesforceService;
  let logger: PinoLogger;

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

    logger = new PinoLogger({});
    logger.info = jest.fn();
    logger.warn = jest.fn();
    logger.error = jest.fn();

    service = new SalesforceService(httpService, configService, logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const companyRegNo = `0${valueGenerator.stringOfNumericCharacters({ length: 7 })}`;
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
      CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
      CCM_Customer_Type__c: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
      CCM_Probability_of_Default__c: 3,
    };
    const baseExpectedHttpServicePostArgs: [string, body: CreateCustomerDto, object] = [
      customerBasePath,
      baseQuery,
      { headers: { Authorization: `Bearer ${expectedAccessToken}` } },
    ];

    it.each([
      baseQuery,
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
        CCM_Customer_Type__c: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
        CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: 0.0,
      },
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
        CCM_Customer_Type__c: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
        CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: undefined,
      },
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
        CCM_Customer_Type__c: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
        CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
      },
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
        CCM_Customer_Type__c: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
        CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: 100.0,
      },
      {
        Name: companyRegNo,
        Party_URN__c: '00312345',
        D_B_Number__c: '12341234',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: 'A+++',
        CCM_Customer_Type__c: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
        CCM_Loss_Given_Default__c: 100,
        CCM_Probability_of_Default__c: 14.1,
      },
    ])('sends a POST to the Salesforce /sobjects/Account endpoint with the specified request', async (query) => {
      // Arrange
      const expectedHttpServicePostArgs: [string, body: CreateCustomerDto, object] = [
        customerBasePath,
        query,
        { headers: { Authorization: `Bearer ${expectedAccessToken}` } },
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

      // Act
      await service.createCustomer(query);

      // Assert
      expect(getAccessTokenMethodMock).toHaveBeenCalledTimes(1);
      expect(httpServicePost).toHaveBeenCalledTimes(1);
      expect(httpServicePost).toHaveBeenCalledWith(...expectedHttpServicePostArgs);
      expect(logger.info).toHaveBeenCalledWith('Sending customer creation request to Salesforce %s for company %s', customerBasePath, companyRegNo);
      expect(logger.info).toHaveBeenCalledWith('Salesforce confirmed customer creation for company %s', companyRegNo);
    });

    it('throws a SalesforceException if the request to Salesforce fails', async () => {
      // Arrange
      const axiosRequestError = new AxiosError();
      when(httpServicePost)
        .calledWith(...baseExpectedHttpServicePostArgs)
        .mockReturnValueOnce(throwError(() => axiosRequestError));

      const getCustomersPromise = service.createCustomer(baseQuery);

      // Act & Assert
      await expect(getCustomersPromise).rejects.toBeInstanceOf(SalesforceException);
      await expect(getCustomersPromise).rejects.toThrow('Failed to create customer in Salesforce');
      await expect(getCustomersPromise).rejects.toHaveProperty('innerError', axiosRequestError);
      expect(logger.error).toHaveBeenCalledWith('Salesforce customer creation request failed for company %s', companyRegNo);
      expect(logger.info).not.toHaveBeenCalledWith('Salesforce confirmed customer creation for company %s', companyRegNo);
    });

    it('warns when Salesforce does not confirm creation and preserves the response', async () => {
      // Arrange
      const response = { ...expectedResponse, success: false };
      httpServicePost.mockReturnValueOnce(of({ data: response }));

      // Act & Assert
      await expect(service.createCustomer(baseQuery)).resolves.toEqual(response);

      expect(logger.warn).toHaveBeenCalledWith('Salesforce did not confirm customer creation for company %s', companyRegNo);
      expect(logger.info).not.toHaveBeenCalledWith('Salesforce confirmed customer creation for company %s', companyRegNo);
    });

    it.each([
      {
        Name: companyRegNo,
        Party_URN__c: null,
        D_B_Number__c: null,
        Company_Registration_Number__c: '12341234',
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: null,
        CCM_Customer_Type__c: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
        CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: null,
      },
      {
        Name: companyRegNo,
        Party_URN__c: null,
        D_B_Number__c: null,
        Company_Registration_Number__c: '12341234',
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
        CCM_Customer_Type__c: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
        CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: 101,
      },
      {
        Name: companyRegNo,
        Party_URN__c: null,
        D_B_Number__c: null,
        Company_Registration_Number__c: '12341234',
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
        CCM_Customer_Type__c: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
        CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
        CCM_Probability_of_Default__c: -1,
      },
    ])('throws a TypeError if the request is malformed', async (malformedQuery) => {
      // Arrange
      const typeError = new TypeError("Cannot read properties of undefined (reading 'pipe')");
      const getCustomersPromise = service.createCustomer(malformedQuery);

      // Act & Assert
      await expect(getCustomersPromise).rejects.toBeInstanceOf(TypeError);
      await expect(getCustomersPromise).rejects.toEqual(typeError);
    });

    describe('authentication logging', () => {
      beforeAll(() => {
        getAccessTokenMethodMock.mockRestore();
      });

      const customer: CreateCustomerDto = {
        Name: 'Test customer',
        Company_Registration_Number__c: companyRegNo,
        CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
        CCM_Credit_Risk_Rating_Date__c: '2007-03-27',
        CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
        D_B_Number__c: '12341234',
        Party_URN__c: '00312345',
      };

      it('logs authentication without exposing the access token or credentials', async () => {
        // Arrange
        httpServicePost
          .mockReturnValueOnce(of({ data: { access_token: expectedAccessToken } }))
          .mockReturnValueOnce(of({ data: { id: 'customer-id', success: true, errors: null } }));

        // Act
        await service.createCustomer(customer);

        // Assert
        expect(logger.info).toHaveBeenCalledWith('Requesting Salesforce access token');
        expect(logger.info).toHaveBeenCalledWith('Received Salesforce access token');
        expect(logger.info).not.toHaveBeenCalledWith(expect.any(String), expectedAccessToken);
        expect(logger.error).not.toHaveBeenCalled();
      });

      it('logs authentication failures without logging the HTTP error containing credentials', async () => {
        // Arrange
        const error = new AxiosError('Authentication failed');
        httpServicePost.mockReturnValueOnce(throwError(() => error));

        // Act
        const response = service.createCustomer(customer);

        // Assert
        await expect(response).rejects.toBeInstanceOf(SalesforceException);
        await expect(response).rejects.toHaveProperty('innerError', error);

        expect(logger.error).toHaveBeenCalledWith('Failed to retrieve Salesforce access token');
        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(httpServicePost).toHaveBeenCalledTimes(1);
        expect(logger.info).not.toHaveBeenCalledWith('Received Salesforce access token');
      });

      it('warns when authentication returns no token without changing the existing behaviour', async () => {
        -(
          // Arrange
          httpServicePost.mockReturnValueOnce(of({ data: {} })).mockReturnValueOnce(of({ data: { success: false } }))
        );

        // Act
        await service.createCustomer(customer);

        // Assert
        expect(logger.warn).toHaveBeenCalledWith('Salesforce authentication response did not include an access token');
        expect(logger.info).not.toHaveBeenCalledWith('Received Salesforce access token');
      });
    });
  });
});
