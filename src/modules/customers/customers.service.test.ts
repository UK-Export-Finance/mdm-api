import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CREDIT_CLASSIFICATION_STATUS, EXAMPLES, RISK_ENTITY } from '@ukef/constants';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { salesforceFormattedCurrentDate } from '@ukef/helpers/date-formatter.helper';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { resetAllWhenMocks, when } from 'jest-when';

import { GetCustomersInformaticaResponseItem } from '../informatica/dto/get-customers-informatica-response.dto';
import { InformaticaException } from '../informatica/exception/informatica.exception';
import { UkefId } from '../numbers/entities/ukef-id.entity';
import { NumbersService } from '../numbers/numbers.service';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { CustomersService } from './customers.service';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';

jest.mock('@ukef/modules/informatica/informatica.service');

const mockResponseObject = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
} as any as Response;

// Test constants
const companyRegistrationNumber = '12345678';
const companyName = 'TEST NAME';
const dunsNumber = '56785678';
const probabilityOfDefault = 14.1;

// Payloads
const salesForceDate = salesforceFormattedCurrentDate();

const baseCustomerPayload = {
  companyRegistrationNumber,
  companyName,
};

const customerWithPod: DTFSCustomerDto = {
  ...baseCustomerPayload,
  probabilityOfDefault,
};
const customerWithoutPod: DTFSCustomerDto = {
  ...baseCustomerPayload,
};
const customerWithFullPayload: DTFSCustomerDto = {
  ...baseCustomerPayload,
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
const dunAndBradstreetGetDunsNumberResponse: string = 'TEST DUNS_NUMBER';

// Legacy Salesforce customer which has a party URN
const createLegacyCustomerWithUrn: GetCustomersInformaticaResponseItem[] = [
  {
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
    riskEntity: RISK_ENTITY.CORPORATE,
    creditClassificationStatus: CREDIT_CLASSIFICATION_STATUS.GOOD,
    creditClassificationDate: salesForceDate,
  },
];

// Legacy Salesforce customer which has URN generated
const createLegacyCustomerWithNoUrn: GetCustomersInformaticaResponseItem[] = [
  {
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
    riskEntity: RISK_ENTITY.CORPORATE,
    creditClassificationStatus: CREDIT_CLASSIFICATION_STATUS.GOOD,
    creditClassificationDate: salesForceDate,
  },
];

// New customer creation
const createNewCustomerWithUrn: GetCustomersInformaticaResponseItem[] = [
  {
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
    riskEntity: RISK_ENTITY.CORPORATE,
    creditClassificationStatus: CREDIT_CLASSIFICATION_STATUS.GOOD,
    creditClassificationDate: salesForceDate,
  },
];

describe('CustomerService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CustomersService;

  let informaticaServiceGetCustomers: jest.Mock;

  let salesforceConfigServiceGet: jest.Mock;
  let salesforceServiceCreateCustomer: jest.Mock;

  let numbersServiceCreate: jest.Mock;

  let dunAndBradstreetConfigServiceGet: jest.Mock;
  let dunAndBradstreetServiceGetDunsNumber: jest.Mock;

  beforeEach(() => {
    informaticaServiceGetCustomers = jest.fn();
    const informaticaService = new InformaticaService(null);
    informaticaService.getCustomers = informaticaServiceGetCustomers;

    const salesforceConfigService = new ConfigService();
    salesforceConfigServiceGet = jest.fn().mockReturnValue({
      clientId: 'TEST_CLIENT_ID',
      clientSecret: 'TEST_CLIENT_SECRET',
      username: 'TEST_USERNAME',
      password: 'TEST_PASSWORD',
      accessUrl: 'TEST_ACCESS_URL',
    });
    salesforceConfigService.get = salesforceConfigServiceGet;
    salesforceServiceCreateCustomer = jest.fn();
    const salesforceService = new SalesforceService(null, salesforceConfigService);
    salesforceService.createCustomer = salesforceServiceCreateCustomer;

    numbersServiceCreate = jest.fn();
    const numbersService = new NumbersService(null, null);
    numbersService.create = numbersServiceCreate;

    const dunAndBradstreetConfigService = new ConfigService();
    dunAndBradstreetConfigServiceGet = jest.fn().mockReturnValue({ key: 'TEST_KEY' });
    dunAndBradstreetConfigService.get = dunAndBradstreetConfigServiceGet;
    dunAndBradstreetServiceGetDunsNumber = jest.fn();
    const dunAndBradstreetService = new DunAndBradstreetService(null, dunAndBradstreetConfigService);
    dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber = dunAndBradstreetServiceGetDunsNumber;

    resetAllWhenMocks();
    jest.clearAllMocks();

    service = new CustomersService(informaticaService, salesforceService, numbersService, dunAndBradstreetService);
  });

  describe('getCustomers', () => {
    const { informaticaRequest, getCustomersResponse } = new GetCustomersGenerator(valueGenerator).generate({ numberToGenerate: 1 });

    it('returns customers from the service', async () => {
      // Arrange
      when(informaticaServiceGetCustomers).calledWith(informaticaRequest[0]).mockResolvedValueOnce(getCustomersResponse[0]);

      // Act
      const response = await service.getCustomers(informaticaRequest[0]);

      // Assert
      expect(response).toEqual(getCustomersResponse[0]);
      expect(informaticaServiceGetCustomers).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOrCreateCustomer', () => {
    describe('when the customer exists in salesforce', () => {
      // Non-legacy customers will always have a URN
      describe('Non-legacy customer', () => {
        const getInformaticaCustomersResponse = [
          [
            {
              partyUrn: '00312345',
              name: companyName,
              sfId: 'customer-id',
              companyRegNo: companyRegistrationNumber,
              type: null,
              subtype: null,
              isLegacyRecord: false,
            },
          ],
        ];

        it.each([
          {
            DTFSCustomerDto: customerWithPod,
            pod: customerWithPod.probabilityOfDefault,
          },
          {
            DTFSCustomerDto: customerWithoutPod,
            pod: customerWithoutPod.probabilityOfDefault,
          },
        ])('should get the existing customer from Informatica when PoD is `$pod`', async ({ DTFSCustomerDto }) => {
          // Arrange
          when(informaticaServiceGetCustomers)
            .calledWith({
              companyreg: DTFSCustomerDto.companyRegistrationNumber,
            })
            .mockResolvedValueOnce(getInformaticaCustomersResponse[0]);

          // Act
          await service.getOrCreateCustomer(mockResponseObject, DTFSCustomerDto);

          // Assert
          expect(mockResponseObject.json).toHaveBeenCalledTimes(1);
          expect(mockResponseObject.json).toHaveBeenCalledWith(getInformaticaCustomersResponse[0]);
          expect(mockResponseObject.status).toHaveBeenCalledWith(HttpStatusCode.Ok);

          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(0);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
        });
      });

      // Legacy customers may or may not have a URN
      describe('Legacy customer with party URN', () => {
        const getCustomersResponse = [
          [
            {
              partyUrn: 'SOME_LEGACY_URN',
              name: companyName,
              sfId: 'customer-id',
              companyRegNo: companyRegistrationNumber,
              type: null,
              subtype: null,
              isLegacyRecord: true,
            },
          ],
        ];

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
          'should creates a new customer using the legacy URN and returns the response if there are no errors when when PoD is `$pod`',
          async ({ DTFSCustomerDto }) => {
            // Arrange
            const mockSalesforceResponse = [
              {
                ...createLegacyCustomerWithUrn[0],
                probabilityOfDefault: DTFSCustomerDto.probabilityOfDefault,
              },
            ];

            when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
            when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
            when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
            when(informaticaServiceGetCustomers)
              .calledWith({
                companyreg: DTFSCustomerDto.companyRegistrationNumber,
              })
              .mockResolvedValueOnce(getCustomersResponse[0]);

            // Act
            await service.getOrCreateCustomer(mockResponseObject, DTFSCustomerDto);

            // Assert
            expect(mockResponseObject.json).toHaveBeenCalledTimes(1);
            expect(mockResponseObject.json).toHaveBeenCalledWith(mockSalesforceResponse);
            expect(mockResponseObject.status).toHaveBeenCalledWith(HttpStatusCode.Created);

            expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(
              expect.objectContaining({
                Name: DTFSCustomerDto.companyName,
                D_B_Number__c: 'TEST DUNS_NUMBER',
                Party_URN__c: 'SOME_LEGACY_URN',
                Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
                CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
                CCM_Credit_Risk_Rating_Date__c: salesforceFormattedCurrentDate(),
                CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
                CCM_Probability_of_Default__c: DTFSCustomerDto.probabilityOfDefault,
                CCM_Citizenship_Class__c: DTFSCustomerDto.ukEntity,
                CCM_Primary_Industry__c: DTFSCustomerDto.ukefIndustryName,
                CCM_Primary_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
                CCM_Industry__c: DTFSCustomerDto.ukefIndustryName,
                CCM_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
                CCM_Assigned_Rating__c: RISK_ENTITY.CORPORATE,
                CCM_Watch_List__c: CREDIT_CLASSIFICATION_STATUS.GOOD,
                CCM_Watch_List_Date__c: salesForceDate,
              }),
            );

            expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
            expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
            expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
          },
        );

        it('throws an error if Salesforce service fails to create a customer', async () => {
          // Arrange
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockRejectedValueOnce(new Error('Service Error'));
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
          when(informaticaServiceGetCustomers)
            .calledWith({
              companyreg: customerWithPod.companyRegistrationNumber,
            })
            .mockRejectedValueOnce(new NotFoundException('Customer not found.'));

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
          when(informaticaServiceGetCustomers)
            .calledWith({
              companyreg: customerWithPod.companyRegistrationNumber,
            })
            .mockRejectedValueOnce(new NotFoundException('Customer not found.'));

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
        const getCustomersResponse = [
          [
            {
              partyUrn: null,
              name: companyName,
              sfId: 'customer-id',
              companyRegNo: companyRegistrationNumber,
              type: null,
              subtype: null,
              isLegacyRecord: true,
            },
          ],
        ];

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
          async ({ DTFSCustomerDto }) => {
            // Arrange
            const mockSalesforceResponse = [
              {
                ...createLegacyCustomerWithNoUrn[0],
                probabilityOfDefault: DTFSCustomerDto.probabilityOfDefault,
              },
            ];

            when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
            when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
            when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
            when(informaticaServiceGetCustomers)
              .calledWith({
                companyreg: DTFSCustomerDto.companyRegistrationNumber,
              })
              .mockResolvedValueOnce(getCustomersResponse[0]);

            // Act
            await service.getOrCreateCustomer(mockResponseObject, DTFSCustomerDto);

            // Assert
            expect(mockResponseObject.json).toHaveBeenCalledTimes(1);
            expect(mockResponseObject.json).toHaveBeenCalledWith(mockSalesforceResponse);
            expect(mockResponseObject.status).toHaveBeenCalledWith(HttpStatusCode.Created);

            expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledWith(DTFSCustomerDto.companyRegistrationNumber);

            expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(
              expect.objectContaining({
                Name: DTFSCustomerDto.companyName,
                D_B_Number__c: 'TEST DUNS_NUMBER',
                Party_URN__c: 'TEST PARTY_URN',
                Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
                CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
                CCM_Credit_Risk_Rating_Date__c: salesforceFormattedCurrentDate(),
                CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
                CCM_Probability_of_Default__c: DTFSCustomerDto.probabilityOfDefault,
                CCM_Citizenship_Class__c: DTFSCustomerDto.ukEntity,
                CCM_Primary_Industry__c: DTFSCustomerDto.ukefIndustryName,
                CCM_Primary_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
                CCM_Industry__c: DTFSCustomerDto.ukefIndustryName,
                CCM_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
                CCM_Assigned_Rating__c: RISK_ENTITY.CORPORATE,
                CCM_Watch_List__c: CREDIT_CLASSIFICATION_STATUS.GOOD,
                CCM_Watch_List_Date__c: salesForceDate,
              }),
            );

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

    describe('when the customer does not exists in salesforce', () => {
      describe('creates a new customer with a party URN', () => {
        it.each([
          {
            DTFSCustomerDto: {
              ...customerWithPod,
            },
            response: [
              {
                ...createLegacyCustomerWithNoUrn[0],
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
              },
            ],
          },
        ])('should creates a new customer returns the response if there are no errors', async ({ DTFSCustomerDto, response }) => {
          // Arrange
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
          when(informaticaServiceGetCustomers)
            .calledWith({
              companyreg: DTFSCustomerDto.companyRegistrationNumber,
            })
            .mockRejectedValueOnce(new NotFoundException('Customer not found.'));

          // Act
          await service.getOrCreateCustomer(mockResponseObject, DTFSCustomerDto);

          // Assert
          expect(mockResponseObject.json).toHaveBeenCalledTimes(1);
          expect(mockResponseObject.json).toHaveBeenCalledWith(response);
          expect(mockResponseObject.status).toHaveBeenCalledWith(HttpStatusCode.Created);

          expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(
            expect.objectContaining({
              Name: DTFSCustomerDto.companyName,
              D_B_Number__c: 'TEST DUNS_NUMBER',
              Party_URN__c: 'TEST PARTY_URN',
              Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
              CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
              CCM_Credit_Risk_Rating_Date__c: salesforceFormattedCurrentDate(),
              CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
              CCM_Probability_of_Default__c: DTFSCustomerDto.probabilityOfDefault,
              CCM_Citizenship_Class__c: DTFSCustomerDto.ukEntity,
              CCM_Primary_Industry__c: DTFSCustomerDto.ukefIndustryName,
              CCM_Primary_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
              CCM_Industry__c: DTFSCustomerDto.ukefIndustryName,
              CCM_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
              CCM_Assigned_Rating__c: RISK_ENTITY.CORPORATE,
              CCM_Watch_List__c: CREDIT_CLASSIFICATION_STATUS.GOOD,
              CCM_Watch_List_Date__c: salesForceDate,
            }),
          );

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
                partyUrn: null,
              },
            ],
          },
        ])('should creates a new customer returns the response if there are no errors', async ({ DTFSCustomerDto, response }) => {
          // Arrange
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockRejectedValueOnce(new InternalServerErrorException());
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
          when(informaticaServiceGetCustomers)
            .calledWith({
              companyreg: DTFSCustomerDto.companyRegistrationNumber,
            })
            .mockRejectedValueOnce(new NotFoundException('Customer not found.'));

          // Act
          await service.getOrCreateCustomer(mockResponseObject, DTFSCustomerDto);

          // Assert
          expect(mockResponseObject.json).toHaveBeenCalledTimes(1);
          expect(mockResponseObject.json).toHaveBeenCalledWith(response);
          expect(mockResponseObject.status).toHaveBeenCalledWith(HttpStatusCode.Created);

          expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(
            expect.objectContaining({
              Name: DTFSCustomerDto.companyName,
              D_B_Number__c: 'TEST DUNS_NUMBER',
              Party_URN__c: null,
              Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
              CCM_Credit_Risk_Rating__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
              CCM_Credit_Risk_Rating_Date__c: salesforceFormattedCurrentDate(),
              CCM_Loss_Given_Default__c: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
              CCM_Probability_of_Default__c: DTFSCustomerDto.probabilityOfDefault,
              CCM_Citizenship_Class__c: DTFSCustomerDto.ukEntity,
              CCM_Primary_Industry__c: DTFSCustomerDto.ukefIndustryName,
              CCM_Primary_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
              CCM_Industry__c: DTFSCustomerDto.ukefIndustryName,
              CCM_Industry_Group__c: DTFSCustomerDto.ukefSectorName,
              CCM_Assigned_Rating__c: RISK_ENTITY.CORPORATE,
              CCM_Watch_List__c: CREDIT_CLASSIFICATION_STATUS.GOOD,
              CCM_Watch_List_Date__c: salesForceDate,
            }),
          );

          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('exceptions', () => {
      it('should throws an error if there is an InformaticaException', async () => {
        // Arrange
        when(informaticaServiceGetCustomers)
          .calledWith({
            companyreg: customerWithPod.companyRegistrationNumber,
          })
          .mockRejectedValueOnce(new InformaticaException('Failed to get customers in Informatica'));

        // Act
        await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toThrow('Failed to get customers in Informatica');

        // Assert
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(0);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
      });

      it('should throws an error if the Informatica response does not contain valid customers', async () => {
        // Arrange
        when(informaticaServiceGetCustomers)
          .calledWith({
            companyreg: customerWithPod.companyRegistrationNumber,
          })
          .mockResolvedValueOnce([]);

        // Act
        await expect(service.getOrCreateCustomer(mockResponseObject, customerWithPod)).rejects.toThrow('Internal Server Error');

        // Assert
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(0);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
      });

      it('should throws an error if Salesforce service fails to create a customer', async () => {
        // Arrange
        when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockRejectedValueOnce(new Error('Service Error'));
        when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
        when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
        when(informaticaServiceGetCustomers)
          .calledWith({
            companyreg: customerWithPod.companyRegistrationNumber,
          })
          .mockRejectedValueOnce(new NotFoundException('Customer not found.'));

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
        when(informaticaServiceGetCustomers)
          .calledWith({
            companyreg: customerWithPod.companyRegistrationNumber,
          })
          .mockRejectedValueOnce(new NotFoundException('Customer not found.'));

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
