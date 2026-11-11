import { jest } from '@jest/globals';
import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GetCustomersQueryDto } from '../customers/dto/get-customers-query.dto';
import { SalesforceException } from './exception/salesforce.exception';
import { SalesforceService } from './salesforce.service';
import { PinoLogger } from 'nestjs-pino';

describe('SalesforceService', () => {
  let service: SalesforceService;
  let logger: PinoLogger;

  beforeEach(() => {
    const httpService = new HttpService();
    const configService = new ConfigService();
    jest.spyOn(configService, 'get').mockReturnValue({
      clientId: 'TEST_CLIENT_ID',
      clientSecret: 'TEST_CLIENT_SECRET',
      accessUrl: 'TEST_ACCESS_URL',
    });

    logger = new PinoLogger({});
    logger.info = jest.fn();
    logger.warn = jest.fn();
    logger.error = jest.fn();

    service = new SalesforceService(httpService, configService, logger);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const searchMethods = [
    {
      method: 'getCustomers' as const,
      objectName: 'Account',
      companyField: 'Company_Registration_Number__c',
      partyField: 'Party_URN__c',
      nameField: 'Name',
      limit: 100,
    },
    {
      method: 'getLegacyCustomers' as const,
      objectName: 'M2_1_MCD_Legacy_Data_Party__c',
      companyField: 'M2_1_MCD_Company_Reg_Number__c',
      partyField: 'M2_1_MCD_Party_URN__c',
      nameField: 'M2_1_MCD_Party_Name__c',
      limit: 200,
    },
  ];

  const queries: { query: GetCustomersQueryDto; where: string }[] = [
    {
      query: { companyReg: '01234567' },
      where: "Company_Registration_Number__c = '01234567'",
    },
    { query: { partyUrn: '00312345' }, where: "Party_URN__c = '00312345'" },
    { query: { name: 'Example' }, where: "Name LIKE '%Example%'" },
    {
      query: { companyReg: '01234567', partyUrn: '00312345', name: 'Example' },
      where: "Company_Registration_Number__c = '01234567' AND Party_URN__c = '00312345' AND Name LIKE '%Example%'",
    },
    {
      query: { companyReg: "reg\\'number", partyUrn: "urn\\'value", name: "O'Brien\\Company" },
      where: "Company_Registration_Number__c = 'reg\\\\\\'number' AND Party_URN__c = 'urn\\\\\\'value' AND Name LIKE '%O\\'Brien\\\\Company%'",
    },
    { query: { companyReg: '', partyUrn: '00312345' }, where: "Party_URN__c = '00312345'" },
  ];

  describe.each(searchMethods)('$method', ({ method, objectName, companyField, partyField, nameField, limit }) => {
    const search = (query: GetCustomersQueryDto) => (method === 'getCustomers' ? service.getCustomers(query) : service.getLegacyCustomers(query));
    const methodQueries = queries.map(({ query, where }) => ({
      query,
      where: where
        .replace('Company_Registration_Number__c', companyField)
        .replace('Party_URN__c', partyField)
        .replace(/\bName\b/g, nameField),
    }));

    it.each(methodQueries)('builds a SOQL query for $where', async ({ query, where }) => {
      const records = [{ Id: 'customer-id' }];
      const runSoqlMock = jest.spyOn(service as any, 'runSoql').mockResolvedValue({ records });

      const result = await search(query);

      expect(runSoqlMock).toHaveBeenCalledTimes(1);
      expect(runSoqlMock).toHaveBeenCalledWith(`SELECT FIELDS(ALL)
      FROM ${objectName}
      WHERE ${where}
      LIMIT ${limit}`);
      expect(result).toBe(records);
    });

    it.each([{}, { companyReg: '', partyUrn: '', name: undefined }])('rejects a query without search parameters: %j', async (query) => {
      const runSoqlMock = jest.spyOn(service as any, 'runSoql');

      await expect(search(query)).rejects.toBeInstanceOf(BadRequestException);
      await expect(search(query)).rejects.toThrow('At least one search parameter is required');
      expect(runSoqlMock).not.toHaveBeenCalled();
    });

    it('propagates SOQL query errors', async () => {
      const error = new SalesforceException('Failed to get customer in Salesforce');
      jest.spyOn(service as any, 'runSoql').mockRejectedValue(error);

      await expect(search({ partyUrn: '00312345' })).rejects.toBe(error);
    });
  });

  describe('runSoql', () => {
    it('requests the encoded query with a bearer token and returns the response data', async () => {
      const accessToken = 'TEST_ACCESS_TOKEN';
      const records = [{ Id: 'customer-id' }];
      const soql = "SELECT Id FROM Account WHERE Name = 'Example & Co'";
      const getAccessTokenMock = jest.spyOn(service as any, 'getAccessToken').mockResolvedValue(accessToken);
      const httpClientGetMock = jest.fn().mockResolvedValue({ data: { records } });
      (service as any).httpClient.get = httpClientGetMock;

      const result = await (service as any).runSoql(soql);

      expect(getAccessTokenMock).toHaveBeenCalledTimes(1);
      expect(httpClientGetMock).toHaveBeenCalledWith({
        path: `/query?q=${encodeURIComponent(soql)}`,
        headers: { Authorization: `Bearer ${accessToken}` },
        onError: expect.any(Function),
      });
      expect(result).toEqual({ records });
    });

    it('propagates HTTP client errors', async () => {
      const error = new SalesforceException('Failed to get customer in Salesforce');
      jest.spyOn(service as any, 'getAccessToken').mockResolvedValue('TEST_ACCESS_TOKEN');
      (service as any).httpClient.get = jest.fn().mockRejectedValue(error);

      await expect((service as any).runSoql('SELECT Id FROM Account')).rejects.toBe(error);
    });
  });

  describe('sanitizeSalesforceSoqlInput', () => {
    it.each([
      { input: 'Example Company', expected: 'Example Company' },
      { input: "O'Brien", expected: "O\\'Brien" },
      { input: 'North\\South', expected: 'North\\\\South' },
      { input: "O'Brien\\Company", expected: "O\\'Brien\\\\Company" },
    ])('escapes SOQL special characters in $input', ({ input, expected }) => {
      expect((service as any).sanitizeSalesforceSoqlInput(input)).toBe(expected);
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
          .mockReturnValueOnce(of({ data: { access_token: expectedAccessToken } } as AxiosResponse))
          .mockReturnValueOnce(of({ data: { id: 'customer-id', success: true, errors: null } } as AxiosResponse));

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
        // Arrange
        httpServicePost.mockReturnValueOnce(of({ data: {} } as AxiosResponse)).mockReturnValueOnce(of({ data: { success: false } } as AxiosResponse));

        // Act
        await service.createCustomer(customer);

        // Assert
        expect(logger.warn).toHaveBeenCalledWith('Salesforce authentication response did not include an access token');
        expect(logger.info).not.toHaveBeenCalledWith('Received Salesforce access token');
      });

      it('requests a token using "client credentials" grant and uses it to get Salesforce access token', async () => {
        // Arrange
        const returnedAccessToken = 'RETURNED_ACCESS_TOKEN';
        const getAccessTokenSpy = jest.spyOn(service as any, 'getAccessToken');
        const createdCustomer = { id: 'customer-id', success: true, errors: null };

        httpServicePost
          .mockReturnValueOnce(of({ data: { access_token: returnedAccessToken } } as AxiosResponse))
          .mockReturnValueOnce(of({ data: createdCustomer } as AxiosResponse));

        // Act
        const response = await service.createCustomer(customer);

        // Assert
        expect(getAccessTokenSpy).toHaveBeenCalledTimes(1);
        await expect(getAccessTokenSpy.mock.results[0].value).resolves.toBe(returnedAccessToken);
        expect(httpServicePost).toHaveBeenCalledTimes(2);

        const [tokenPath, tokenBody, tokenConfig] = httpServicePost.mock.calls[0];
        expect(tokenPath).toBe('TEST_ACCESS_URL');
        expect(tokenBody).toEqual({
          grant_type: 'client_credentials',
          client_id: 'TEST_CLIENT_ID',
          client_secret: 'TEST_CLIENT_SECRET',
        });
        expect(tokenBody).not.toHaveProperty('username');
        expect(tokenBody).not.toHaveProperty('password');
        expect(tokenConfig).toEqual({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        expect(httpServicePost).toHaveBeenNthCalledWith(2, customerBasePath, customer, {
          headers: { Authorization: `Bearer ${returnedAccessToken}` },
        });
        expect(response).toEqual(createdCustomer);
      });
    });
  });
});
