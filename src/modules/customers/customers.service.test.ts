import { jest } from '@jest/globals';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { resetAllWhenMocks, when } from 'jest-when';
import { PinoLogger } from 'nestjs-pino';
import * as util from 'util';
import { EXAMPLES } from '@ukef/constants';
import { FallbackToLegacyDataEnum } from '@ukef/constants/enums/fallbackToLegacyData';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { salesforceFormattedCurrentDate } from '@ukef/helpers/date-formatter.helper';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { GetSalesforceAccountResponseDto } from '@ukef/modules/salesforce/dto/get-salesforce-account-response.dto';
import { GetSalesforceLegacyAccountResponseDto } from '@ukef/modules/salesforce/dto/get-salesforce-legacy-account-response.dto';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { UkefId } from '@ukef/modules/numbers/entities/ukef-id.entity';
import { NumbersService } from '@ukef/modules/numbers/numbers.service';
import { CreateCustomerSalesforceResponseDto } from '@ukef/modules/salesforce/dto/create-customer-salesforce-response.dto';
import { CustomersService } from './customers.service';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { GetCustomersQueryDto } from './dto/get-customers-query.dto';
import { GetCustomersResponseItem } from './dto/get-customers-response.dto';

const mockResponseObject = {
  json: jest.fn<Response['json']>(),
  status: jest.fn<Response['status']>().mockReturnThis(),
} as any as Response;

// Test constants
const companyRegistrationNumber = EXAMPLES.CUSTOMER.COMPANYREG;
const companyName = EXAMPLES.CUSTOMER.COMPANY_NAME;
const customerType = EXAMPLES.CUSTOMER.CUSTOMER_TYPE;
const dunsNumber = '56785678';
const probabilityOfDefault = 14.1;

// Payloads
const salesForceDate = salesforceFormattedCurrentDate();

const basePayload = {
  companyRegistrationNumber,
  companyName,
};

const customerWithPod: DTFSCustomerDto = {
  ...basePayload,
  probabilityOfDefault,
};

const customerWithoutPod: DTFSCustomerDto = {
  ...basePayload,
};

const customerWithCustomerType: DTFSCustomerDto = {
  ...basePayload,
  probabilityOfDefault,
  customerType,
};

const customerWithoutCustomerType: DTFSCustomerDto = {
  ...basePayload,
};

const customerWithFullPayload: DTFSCustomerDto = {
  ...basePayload,
  probabilityOfDefault,
  ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
  ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
  ukefSectorName: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
};

// Responses
const salesforceCreateCustomerResponse: CreateCustomerSalesforceResponseDto = {
  id: 'customer-id',
  errors: null,
  success: true,
};

const createUkefIdResponse: UkefId[] = [{ maskedId: 'TEST PARTY_URN', type: null, createdBy: null, createdDatetime: null, requestingSystem: null }];
const dunAndBradstreetGetDunsNumberResponse = 'TEST DUNS_NUMBER';

// Legacy Salesforce customer which has a party URN
const createLegacyCustomerWithUrn: GetCustomersResponseItem[] = [
  {
    customerType,
    partyUrn: 'SOME_LEGACY_URN',
    name: companyName,
    sfId: 'customer-id',
    companyRegNo: companyRegistrationNumber,
    type: null,
    subtype: null,
    isLegacyRecord: true,
    probabilityOfDefault,
    ukEntity: undefined,
    ukefIndustryName: undefined,
    ukefSectorName: undefined,
    riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
    creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
    creditClassificationDate: salesForceDate,
  },
];

// Legacy Salesforce customer which has URN generated
const createLegacyCustomerWithNoUrn: GetCustomersResponseItem[] = [
  {
    customerType,
    partyUrn: 'TEST PARTY_URN',
    name: companyName,
    sfId: 'customer-id',
    companyRegNo: companyRegistrationNumber,
    type: null,
    subtype: null,
    isLegacyRecord: false,
    probabilityOfDefault,
    ukEntity: undefined,
    ukefIndustryName: undefined,
    ukefSectorName: undefined,
    riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
    creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
    creditClassificationDate: salesForceDate,
  },
];

// New customer creation
const createNewCustomerWithUrn: GetCustomersResponseItem[] = [
  {
    customerType,
    partyUrn: 'TEST PARTY_URN',
    name: companyName,
    sfId: 'customer-id',
    companyRegNo: companyRegistrationNumber,
    type: null,
    subtype: null,
    isLegacyRecord: false,
    probabilityOfDefault,
    ukEntity: 'Yes',
    ukefIndustryName: 'AGRICULTURE, HORTICULTURE & FISHERIES',
    ukefSectorName: 'CIVIL: AGRICULTURE, HORTICULTURE & FISHERIES',
    riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
    creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
    creditClassificationDate: salesForceDate,
  },
];

const salesforceAccount: GetSalesforceAccountResponseDto = {
  Id: 'customer-id',
  Name: companyName,
  Party_URN__c: '00312345',
  Company_Registration_Number__c: companyRegistrationNumber,
  CCM_Probability_of_Default__c: probabilityOfDefault,
  CCM_Citizenship_Class__c: EXAMPLES.CUSTOMER.UK_ENTITY,
  CCM_Industry__c: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
  CCM_Industry_Group__c: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
  Account_Type__c: null,
  Account_Sub_Type__c: null,
  CCM_Risk_Entity__c: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
  CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
  CCM_Credit_Risk_Rating_Date__c: salesForceDate,
} as GetSalesforceAccountResponseDto;

const legacySalesforceAccount: GetSalesforceLegacyAccountResponseDto = {
  Id: 'legacy-customer-id',
  M2_1_MCD_Party_URN__c: 'SOME_LEGACY_URN',
  M2_1_MCD_Party_Name__c: companyName,
  M2_1_MCD_Company_Reg_Number__c: companyRegistrationNumber,
  M2_1_MCD_UK_or_Overseas__c: EXAMPLES.CUSTOMER.UK_ENTITY,
  M2_1_MCD_Party_Type__c: null,
  M2_1_MCD_Party_Sub_Type__c: null,
} as GetSalesforceLegacyAccountResponseDto;

const mappedSalesforceCustomer: GetCustomersResponseItem = {
  partyUrn: salesforceAccount.Party_URN__c,
  name: salesforceAccount.Name,
  sfId: salesforceAccount.Id,
  companyRegNo: salesforceAccount.Company_Registration_Number__c,
  probabilityOfDefault: salesforceAccount.CCM_Probability_of_Default__c,
  ukEntity: salesforceAccount.CCM_Citizenship_Class__c,
  ukefIndustryName: salesforceAccount.CCM_Industry__c,
  ukefSectorName: salesforceAccount.CCM_Industry_Group__c,
  type: salesforceAccount.Account_Type__c,
  subtype: salesforceAccount.Account_Sub_Type__c,
  isLegacyRecord: false,
  riskEntity: salesforceAccount.CCM_Risk_Entity__c,
  creditClassificationStatus: salesforceAccount.CCM_Credit_Risk_Rating__c,
  creditClassificationDate: salesforceAccount.CCM_Credit_Risk_Rating_Date__c,
};

const mappedLegacySalesforceCustomer: GetCustomersResponseItem = {
  partyUrn: legacySalesforceAccount.M2_1_MCD_Party_URN__c,
  name: legacySalesforceAccount.M2_1_MCD_Party_Name__c,
  sfId: legacySalesforceAccount.Id,
  companyRegNo: legacySalesforceAccount.M2_1_MCD_Company_Reg_Number__c,
  probabilityOfDefault: null,
  ukEntity: legacySalesforceAccount.M2_1_MCD_UK_or_Overseas__c,
  ukefIndustryName: null,
  ukefSectorName: null,
  type: legacySalesforceAccount.M2_1_MCD_Party_Type__c,
  subtype: legacySalesforceAccount.M2_1_MCD_Party_Sub_Type__c,
  isLegacyRecord: true,
  riskEntity: null,
  creditClassificationStatus: null,
  creditClassificationDate: null,
};

const queryForCustomer = (customer: DTFSCustomerDto): GetCustomersQueryDto => ({
  companyReg: customer.companyRegistrationNumber,
  fallbackToLegacyData: FallbackToLegacyDataEnum.YES,
});

describe('CustomerService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CustomersService;
  let logger: PinoLogger;

  let salesforceServiceGetCustomers: jest.MockedFunction<SalesforceService['getCustomers']>;
  let salesforceServiceGetLegacyCustomers: jest.MockedFunction<SalesforceService['getLegacyCustomers']>;

  let salesforceServiceCreateCustomer: jest.MockedFunction<SalesforceService['createCustomer']>;

  let numbersServiceCreate: jest.MockedFunction<NumbersService['create']>;

  let dunAndBradstreetServiceGetDunsNumber: jest.MockedFunction<DunAndBradstreetService['getDunAndBradstreetNumberByRegistrationNumber']>;

  /**
   * Asserts the response `getOrCreateCustomer` resolved with, and the status code it set via `res.status(...)`.
   * Centralising this keeps the two response-handling expectations consistent across every success-path test,
   * instead of duplicating (and risking drift of) the same pair of assertions at each call site.
   *
   * `(typeof HttpStatusCode)[keyof typeof HttpStatusCode]` is used instead of `HttpStatusCode` as the parameter
   * type because, under this project's `nodenext` module resolution, a static `import` resolves axios's
   * `require`-conditioned (`.d.cts`) types, which only expose `HttpStatusCode` as a value (via `export =`), not
   * as a type.
   */
  const expectSuccessfulResponse = (result: unknown, expectedBody: unknown, expectedStatusCode: (typeof HttpStatusCode)[keyof typeof HttpStatusCode]) => {
    expect(result).toEqual(expectedBody);
    expect(mockResponseObject.status).toHaveBeenCalledWith(expectedStatusCode);
  };

  /**
   * Asserts the Salesforce customer-creation payload built from a `DTFSCustomerDto`. Only `Party_URN__c` varies
   * between the "legacy URN", "legacy with no URN", and "new customer" scenarios, so it's the only parameter.
   */
  const expectSalesforceCustomerCreationRequest = (dtfsCustomerDto: DTFSCustomerDto, partyUrn: string | null) => {
    expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(
      expect.objectContaining({
        CCM_Assigned_Rating__c: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
        CCM_Citizenship_Class__c: dtfsCustomerDto.ukEntity,
        CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
        CCM_Credit_Risk_Rating_Date__c: salesforceFormattedCurrentDate(),
        CCM_Industry__c: dtfsCustomerDto.ukefIndustryName,
        CCM_Industry_Group__c: dtfsCustomerDto.ukefSectorName,
        CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
        CCM_Primary_Industry__c: dtfsCustomerDto.ukefIndustryName,
        CCM_Primary_Industry_Group__c: dtfsCustomerDto.ukefSectorName,
        CCM_Probability_of_Default__c: dtfsCustomerDto.probabilityOfDefault,
        CCM_Watch_List__c: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
        CCM_Watch_List_Date__c: salesForceDate,
        Company_Registration_Number__c: dtfsCustomerDto.companyRegistrationNumber,
        D_B_Number__c: 'TEST DUNS_NUMBER',
        Name: dtfsCustomerDto.companyName,
        Party_URN__c: partyUrn,
      }),
    );
  };

  beforeEach(() => {
    const salesforceConfigService = new ConfigService();

    jest.spyOn(salesforceConfigService, 'get').mockReset().mockReturnValue({
      clientId: 'TEST_CLIENT_ID',
      clientSecret: 'TEST_CLIENT_SECRET',
      username: 'TEST_USERNAME',
      password: 'TEST_PASSWORD',
      accessUrl: 'TEST_ACCESS_URL',
    });

    salesforceServiceGetCustomers = jest.fn<SalesforceService['getCustomers']>();
    salesforceServiceGetLegacyCustomers = jest.fn<SalesforceService['getLegacyCustomers']>();
    salesforceServiceCreateCustomer = jest.fn<SalesforceService['createCustomer']>();
    const salesforceService = new SalesforceService(null, salesforceConfigService, null);
    salesforceService.getCustomers = salesforceServiceGetCustomers;
    salesforceService.getLegacyCustomers = salesforceServiceGetLegacyCustomers;
    salesforceService.createCustomer = salesforceServiceCreateCustomer;

    numbersServiceCreate = jest.fn<NumbersService['create']>();
    const numbersService = new NumbersService(null, null);
    numbersService.create = numbersServiceCreate;

    const dunAndBradstreetConfigService = new ConfigService();

    jest.spyOn(dunAndBradstreetConfigService, 'get').mockReset().mockReturnValue({ key: 'TEST_KEY' });
    dunAndBradstreetServiceGetDunsNumber = jest.fn<DunAndBradstreetService['getDunAndBradstreetNumberByRegistrationNumber']>();
    const dunAndBradstreetService = new DunAndBradstreetService(null, dunAndBradstreetConfigService);
    dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber = dunAndBradstreetServiceGetDunsNumber;

    resetAllWhenMocks();
    jest.clearAllMocks();

    logger = new PinoLogger({});
    logger.info = jest.fn();
    logger.warn = jest.fn();
    logger.error = jest.fn();

    service = new CustomersService(salesforceService, numbersService, dunAndBradstreetService, logger);
  });

  describe('getCustomers', () => {
    const query: GetCustomersQueryDto = {
      companyReg: companyRegistrationNumber,
      fallbackToLegacyData: FallbackToLegacyDataEnum.YES,
    };

    it('returns mapped Salesforce customers', async () => {
      // Arrange
      salesforceServiceGetCustomers.mockResolvedValueOnce([salesforceAccount]);

      // Act
      const response = await service.getCustomers(query);

      // Assert
      expect(response).toEqual([mappedSalesforceCustomer]);
      expect(salesforceServiceGetCustomers).toHaveBeenCalledWith(query);
      expect(salesforceServiceGetLegacyCustomers).not.toHaveBeenCalled();
    });

    it('falls back to legacy Salesforce customers when no current account matches', async () => {
      salesforceServiceGetCustomers.mockResolvedValueOnce([]);
      salesforceServiceGetLegacyCustomers.mockResolvedValueOnce([legacySalesforceAccount]);

      await expect(service.getCustomers(query)).resolves.toEqual([mappedLegacySalesforceCustomer]);
      expect(salesforceServiceGetCustomers).toHaveBeenCalledWith(query);
      expect(salesforceServiceGetLegacyCustomers).toHaveBeenCalledWith(query);
    });

    it('does not search legacy Salesforce customers when fallback is disabled', async () => {
      const queryWithoutFallback = { ...query, fallbackToLegacyData: FallbackToLegacyDataEnum.NO };
      salesforceServiceGetCustomers.mockResolvedValueOnce([]);

      await expect(service.getCustomers(queryWithoutFallback)).resolves.toEqual([]);

      expect(salesforceServiceGetCustomers).toHaveBeenCalledWith(queryWithoutFallback);
      expect(salesforceServiceGetLegacyCustomers).not.toHaveBeenCalled();
    });
  });

  describe('logging of credential-bearing downstream errors', () => {
    const secret = valueGenerator.string({ length: 20 });
    const query: GetCustomersQueryDto = {
      companyReg: companyRegistrationNumber,
      fallbackToLegacyData: FallbackToLegacyDataEnum.YES,
    };

    const createCredentialBearingError = () => {
      const error = new Error('Downstream failed') as Error & { config: object; serverName: string };
      error.config = { data: `client_secret=${secret}`, headers: { Authorization: `Bearer ${secret}` } };
      error.serverName = secret;

      return error;
    };

    const loggedOutput = () =>
      [logger.info, logger.warn, logger.error]
        .flatMap((method) => (method as jest.Mock).mock.calls)
        .map((call) => util.format(...(call as [string, ...unknown[]])))
        .join('\n');

    it('does not emit secrets when Salesforce customer lookup fails', async () => {
      // Arrange
      salesforceServiceGetCustomers.mockRejectedValueOnce(createCredentialBearingError());

      // Act & Assert
      await expect(service.getCustomers(query)).rejects.toThrow('Downstream failed');

      expect(loggedOutput()).not.toContain(secret);
    });

    it('does not emit secrets when Dun and Bradstreet fails', async () => {
      // Arrange
      dunAndBradstreetServiceGetDunsNumber.mockRejectedValueOnce(createCredentialBearingError());

      // Act & Assert
      await expect(service.getDunAndBradstreetNumber(companyRegistrationNumber)).rejects.toThrow('Downstream failed');

      expect(loggedOutput()).not.toContain(secret);
    });

    it('does not emit secrets when Salesforce, number generation or the outer flow fails', async () => {
      // Arrange
      salesforceServiceGetCustomers.mockRejectedValueOnce(new NotFoundException('Customer not found.'));
      dunAndBradstreetServiceGetDunsNumber.mockResolvedValueOnce(dunsNumber);
      numbersServiceCreate.mockRejectedValueOnce(createCredentialBearingError());
      salesforceServiceCreateCustomer.mockRejectedValueOnce(createCredentialBearingError());

      // Act & Assert
      await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toThrow('Downstream failed');

      expect(logger.error).toHaveBeenCalled();
      expect(loggedOutput()).not.toContain(secret);
    });
  });

  describe('customer creation logging', () => {
    beforeEach(() => {
      salesforceServiceGetCustomers.mockRejectedValueOnce(new NotFoundException('Customer not found.'));
      dunAndBradstreetServiceGetDunsNumber.mockResolvedValueOnce(dunsNumber);
      numbersServiceCreate.mockResolvedValueOnce(createUkefIdResponse);
      salesforceServiceCreateCustomer.mockResolvedValueOnce(salesforceCreateCustomerResponse);
    });

    it('logs downstream operations and successful Salesforce creation without logging the customer payload', async () => {
      // Act
      await service.getOrCreateCustomer(mockResponseObject, customerWithFullPayload);

      // Assert
      expect(logger.info).toHaveBeenCalledWith('Customer for company %s not found in Salesforce; creating in Salesforce', companyRegistrationNumber);
      expect(logger.info).toHaveBeenCalledWith('Finding DUNS number for company %s in Dun and Bradstreet', companyRegistrationNumber);
      expect(logger.info).toHaveBeenCalledWith('Found DUNS number for company %s in Dun and Bradstreet', companyRegistrationNumber);
      expect(logger.info).toHaveBeenCalledWith('Generating party URN for company %s', companyRegistrationNumber);
      expect(logger.info).toHaveBeenCalledWith('Generated party URN for company %s', companyRegistrationNumber);
      expect(logger.info).toHaveBeenCalledWith('Sending customer creation request to Salesforce for company %s', companyRegistrationNumber);
      expect(logger.info).toHaveBeenCalledWith('Created customer in Salesforce for company %s', companyRegistrationNumber);
      expect(logger.info).not.toHaveBeenCalledWith(expect.any(String), customerWithFullPayload);
      expect(logger.warn).not.toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('warns when party URN generation fails and still sends the customer to Salesforce', async () => {
      // Arrange
      const error = new InternalServerErrorException('Number generation failed');
      numbersServiceCreate.mockReset().mockRejectedValueOnce(error);

      // Act
      await service.getOrCreateCustomer(mockResponseObject, customerWithPod);

      // Assert
      expect(logger.warn).toHaveBeenCalledWith(
        'Error generating party URN for company %s; continuing Salesforce creation without a party URN',
        companyRegistrationNumber,
      );
      expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({ Party_URN__c: null }));
    });

    it('logs Salesforce failures and rejects with the original error', async () => {
      // Arrange
      const error = new Error('Salesforce failed');
      salesforceServiceCreateCustomer.mockReset().mockRejectedValueOnce(error);

      // Act & Assert
      await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toBe(error);

      expect(logger.error).toHaveBeenCalledWith('Error creating customer in Salesforce for company %s', companyRegistrationNumber);
      expect(logger.info).not.toHaveBeenCalledWith('Created customer in Salesforce for company %s', companyRegistrationNumber);
    });

    it('warns instead of logging success when Salesforce does not confirm creation', async () => {
      // Arrange
      salesforceServiceCreateCustomer.mockReset().mockResolvedValueOnce({ ...salesforceCreateCustomerResponse, success: false });

      // Act
      await service.getOrCreateCustomer(mockResponseObject, customerWithPod);

      // Assert
      expect(logger.warn).toHaveBeenCalledWith('Salesforce did not confirm customer creation for company %s', companyRegistrationNumber);
      expect(logger.info).not.toHaveBeenCalledWith('Created customer in Salesforce for company %s', companyRegistrationNumber);
    });

    it('logs Dun and Bradstreet failures and does not send the customer to Salesforce', async () => {
      // Arrange
      const error = new Error('Dun and Bradstreet failed');
      dunAndBradstreetServiceGetDunsNumber.mockReset().mockRejectedValueOnce(error);

      // Act
      await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toBe(error);

      // Assert
      expect(logger.error).toHaveBeenCalledWith('Error finding DUNS number for company %s in Dun and Bradstreet', companyRegistrationNumber);
      expect(salesforceServiceCreateCustomer).not.toHaveBeenCalled();
    });
  });

  describe('getOrCreateCustomer', () => {
    describe('when the customer exists in salesforce', () => {
      // Non-legacy customers will always have a URN
      describe('Non-legacy customer', () => {
        it.each([
          {
            DTFSCustomerDto: customerWithPod,
            pod: customerWithPod.probabilityOfDefault,
          },
          {
            DTFSCustomerDto: customerWithoutPod,
            pod: customerWithoutPod.probabilityOfDefault,
          },
        ])('returns the existing Salesforce customer when PoD is `$pod`', async ({ DTFSCustomerDto: dtfsCustomerDto }) => {
          // Arrange
          salesforceServiceGetCustomers.mockResolvedValueOnce([salesforceAccount]);

          // Act
          const response = await service.getOrCreateCustomer(mockResponseObject, dtfsCustomerDto);

          // Assert
          expect(response).toBeUndefined();
          expect(mockResponseObject.status).toHaveBeenCalledWith(HttpStatusCode.Ok);
          expect(mockResponseObject.json).toHaveBeenCalledWith([mappedSalesforceCustomer]);
          expect(salesforceServiceGetCustomers).toHaveBeenCalledWith(queryForCustomer(dtfsCustomerDto));

          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(0);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
          expect(logger.info).toHaveBeenCalledWith('Salesforce customer exists, returning existing customer records');
        });
      });

      // Legacy customers may or may not have a URN
      describe('Legacy customer with party URN', () => {
        it.each([
          {
            DTFSCustomerDto: customerWithPod,
            pod: customerWithPod.probabilityOfDefault,
          },
          {
            DTFSCustomerDto: customerWithoutCustomerType,
            pod: customerWithoutPod.probabilityOfDefault,
          },
        ])(
          'should creates a new customer using the legacy URN and returns the response if there are no errors when when PoD is `$pod`',
          async ({ DTFSCustomerDto: dtfsCustomerDto }) => {
            // Arrange
            const mockSalesforceResponse = [
              {
                ...createLegacyCustomerWithUrn[0],
                customerType: dtfsCustomerDto.customerType,
                probabilityOfDefault: dtfsCustomerDto.probabilityOfDefault,
              },
            ];

            when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
            when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
            when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
            salesforceServiceGetCustomers.mockResolvedValueOnce([]);
            salesforceServiceGetLegacyCustomers.mockResolvedValueOnce([legacySalesforceAccount]);

            // Act
            const response = await service.getOrCreateCustomer(mockResponseObject, dtfsCustomerDto);

            // Assert
            expectSuccessfulResponse(response, mockSalesforceResponse, HttpStatusCode.Created);

            expectSalesforceCustomerCreationRequest(dtfsCustomerDto, 'SOME_LEGACY_URN');

            expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
            expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
            expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
          },
        );

        describe('when customerType is provided', () => {
          it('should call salesforceServiceCreateCustomer with the customerType', async () => {
            // Arrange
            when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
            when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
            when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
            salesforceServiceGetCustomers.mockResolvedValueOnce([]);
            salesforceServiceGetLegacyCustomers.mockResolvedValueOnce([legacySalesforceAccount]);

            // Act
            await service.getOrCreateCustomer(mockResponseObject, customerWithCustomerType);

            // Assert
            expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(
              expect.objectContaining({
                CCM_Customer_Type__c: customerWithCustomerType.customerType,
              }),
            );

            expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
            expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
            expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
          });
        });

        it('throws an error if Salesforce service fails to create a customer', async () => {
          // Arrange
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockRejectedValueOnce(new Error('Service Error'));
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
          salesforceServiceGetCustomers.mockRejectedValueOnce(new NotFoundException('Customer not found.'));

          // Act
          await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toThrow('Service Error');

          // Assert
          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
        });

        it('throws an error if Dun and Bradstreet service fails to return a DUNS number and does not call further services', async () => {
          // Arrange
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockRejectedValueOnce(new InternalServerErrorException());
          salesforceServiceGetCustomers.mockRejectedValueOnce(new NotFoundException('Customer not found.'));

          // Act
          await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toThrow('Internal Server Error');

          // Assert
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
        });
      });

      // Legacy customers may or may not have a URN
      describe('Legacy customer with no party URN', () => {
        const legacySalesforceAccountWithoutUrn = { ...legacySalesforceAccount, M2_1_MCD_Party_URN__c: null };

        it.each([
          {
            DTFSCustomerDto: customerWithPod,
            pod: customerWithPod.probabilityOfDefault,
          },
          {
            DTFSCustomerDto: customerWithoutPod,
            pod: customerWithoutPod.probabilityOfDefault,
          },
        ])(
          'should creates a new customer without a URN and returns the response if there are no errors when when PoD is `$pod`',
          async ({ DTFSCustomerDto: dtfsCustomerDto }) => {
            // Arrange
            const mockSalesforceResponse = [
              {
                ...createLegacyCustomerWithNoUrn[0],
                customerType: dtfsCustomerDto.customerType,
                probabilityOfDefault: dtfsCustomerDto.probabilityOfDefault,
              },
            ];

            when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
            when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
            when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
            salesforceServiceGetCustomers.mockResolvedValueOnce([]);
            salesforceServiceGetLegacyCustomers.mockResolvedValueOnce([legacySalesforceAccountWithoutUrn]);

            // Act
            const response = await service.getOrCreateCustomer(mockResponseObject, dtfsCustomerDto);

            // Assert
            expectSuccessfulResponse(response, mockSalesforceResponse, HttpStatusCode.Created);

            expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledWith(dtfsCustomerDto.companyRegistrationNumber);

            expectSalesforceCustomerCreationRequest(dtfsCustomerDto, 'TEST PARTY_URN');

            expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
            expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
            expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
          },
        );

        it('returns duns number for the registration number', async () => {
          // Arrange
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(companyRegistrationNumber).mockResolvedValueOnce(dunsNumber);

          // Assert
          const response = await service.getDunAndBradstreetNumber(companyRegistrationNumber);

          // Act
          expect(response).toEqual(dunsNumber);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('when the customer does not exist in Salesforce', () => {
      describe('creates a new customer with a party URN', () => {
        it.each([
          {
            DTFSCustomerDto: {
              ...customerWithPod,
            },
            response: [
              {
                ...createLegacyCustomerWithNoUrn[0],
                customerType: customerWithPod.customerType,
              },
            ],
          },
          {
            DTFSCustomerDto: {
              ...customerWithoutPod,
            },
            response: [
              {
                ...createLegacyCustomerWithNoUrn[0],
                customerType: customerWithoutPod.customerType,
                probabilityOfDefault: undefined,
              },
            ],
          },
          {
            DTFSCustomerDto: {
              ...customerWithFullPayload,
            },
            response: [
              {
                ...createNewCustomerWithUrn[0],
                customerType: customerWithFullPayload.customerType,
              },
            ],
          },
        ])('should creates a new customer returns the response if there are no errors', async ({ DTFSCustomerDto: dtfsCustomerDto, response }) => {
          // Arrange
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
          salesforceServiceGetCustomers.mockRejectedValueOnce(new NotFoundException('Customer not found.'));

          // Act
          const result = await service.getOrCreateCustomer(mockResponseObject, dtfsCustomerDto);

          // Assert
          expectSuccessfulResponse(result, response, HttpStatusCode.Created);

          expectSalesforceCustomerCreationRequest(dtfsCustomerDto, 'TEST PARTY_URN');

          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
        });
      });

      describe('creates a new customer without a party URN', () => {
        it.each([
          {
            DTFSCustomerDto: {
              ...customerWithPod,
            },
            response: [
              {
                ...createLegacyCustomerWithNoUrn[0],
                customerType: customerWithPod.customerType,
                partyUrn: null,
              },
            ],
          },
          {
            DTFSCustomerDto: {
              ...customerWithoutPod,
            },
            response: [
              {
                ...createLegacyCustomerWithNoUrn[0],
                customerType: customerWithoutPod.customerType,
                probabilityOfDefault: undefined,
                partyUrn: null,
              },
            ],
          },
          {
            DTFSCustomerDto: {
              ...customerWithFullPayload,
            },
            response: [
              {
                ...createNewCustomerWithUrn[0],
                customerType: customerWithFullPayload.customerType,
                partyUrn: null,
              },
            ],
          },
        ])('should creates a new customer returns the response if there are no errors', async ({ DTFSCustomerDto: dtfsCustomerDto, response }) => {
          // Arrange
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockRejectedValueOnce(new InternalServerErrorException());
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
          salesforceServiceGetCustomers.mockRejectedValueOnce(new NotFoundException('Customer not found.'));

          // Act
          const result = await service.getOrCreateCustomer(mockResponseObject, dtfsCustomerDto);

          // Assert
          expectSuccessfulResponse(result, response, HttpStatusCode.Created);

          expectSalesforceCustomerCreationRequest(dtfsCustomerDto, null);

          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('exceptions', () => {
      it('rejects when Salesforce customer lookup fails', async () => {
        // Arrange
        const error = new Error('Failed to get customers in Salesforce');
        salesforceServiceGetCustomers.mockRejectedValueOnce(error);

        // Act
        await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toBe(error);

        // Assert
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(0);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
      });

      it('rejects when no Salesforce or legacy customers are found', async () => {
        // Arrange
        salesforceServiceGetCustomers.mockResolvedValueOnce([]);
        salesforceServiceGetLegacyCustomers.mockResolvedValueOnce([]);

        // Act
        await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toThrow('Internal Server Error');

        // Assert
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(0);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
      });

      it('uses only legacy Salesforce records when legacy-only fallback is requested', async () => {
        const query = { companyReg: companyRegistrationNumber, fallbackToLegacyData: FallbackToLegacyDataEnum.LEGACY_ONLY };
        salesforceServiceGetLegacyCustomers.mockResolvedValueOnce([legacySalesforceAccount]);

        await expect(service.getCustomers(query)).resolves.toEqual([mappedLegacySalesforceCustomer]);

        expect(salesforceServiceGetCustomers).not.toHaveBeenCalled();
        expect(salesforceServiceGetLegacyCustomers).toHaveBeenCalledWith(query);
      });

      it('should throws an error if Salesforce service fails to create a customer', async () => {
        // Arrange
        when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockRejectedValueOnce(new Error('Service Error'));
        when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
        when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
        salesforceServiceGetCustomers.mockRejectedValueOnce(new NotFoundException('Customer not found.'));

        // Act
        await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toThrow('Service Error');

        // Assert
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
      });

      it('should throws an error if Dun and Bradstreet service fails to return a DUNS number and does not call further services', async () => {
        // Arrange
        when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
        when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
        when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockRejectedValueOnce(new InternalServerErrorException());
        salesforceServiceGetCustomers.mockRejectedValueOnce(new NotFoundException('Customer not found.'));

        // Act
        await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toThrow('Internal Server Error');

        // Asset
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
      });

      it('should returns a NotFoundException when no a DUNS number was not found', async () => {
        // Arrage
        when(dunAndBradstreetServiceGetDunsNumber).calledWith(companyRegistrationNumber).mockRejectedValueOnce(new NotFoundException());

        // Act
        const responsePromise = service.getDunAndBradstreetNumber(companyRegistrationNumber);

        // Assert
        await expect(responsePromise).rejects.toBeInstanceOf(NotFoundException);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
      });
    });
  });
});
