import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { NumbersService } from '../numbers/numbers.service';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';
import { ConfigService } from '@nestjs/config';
import { CustomersService } from './customers.service';

import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { UkefId } from '../numbers/entities/ukef-id.entity';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GetCustomersInformaticaResponseItem } from '../informatica/dto/get-customers-informatica-response.dto';
import { InformaticaException } from '../informatica/exception/informatica.exception';

jest.mock('@ukef/modules/informatica/informatica.service');

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
    salesforceConfigServiceGet = jest.fn().mockReturnValue({ clientId: 'TEST_CLIENT_ID', clientSecret: 'TEST_CLIENT_SECRET', username: 'TEST_USERNAME', password: 'TEST_PASSWORD', accessUrl: 'TEST_ACCESS_URL' });
    salesforceConfigService.get = salesforceConfigServiceGet;
    salesforceServiceCreateCustomer = jest.fn();
    const salesforceService = new SalesforceService(null, salesforceConfigService);
    salesforceService.createCustomer = salesforceServiceCreateCustomer;

    numbersServiceCreate = jest.fn();
    const numbersService = new NumbersService(null, null)
    numbersService.create = numbersServiceCreate;

    const dunAndBradstreetConfigService = new ConfigService();
    dunAndBradstreetConfigServiceGet = jest.fn().mockReturnValue({ key: 'TEST_KEY' });
    dunAndBradstreetConfigService.get = dunAndBradstreetConfigServiceGet;
    dunAndBradstreetServiceGetDunsNumber = jest.fn();
    const dunAndBradstreetService = new DunAndBradstreetService(null, dunAndBradstreetConfigService)
    dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber = dunAndBradstreetServiceGetDunsNumber;

    resetAllWhenMocks();

    service = new CustomersService(informaticaService, salesforceService, numbersService, dunAndBradstreetService);
  });

  describe('getCustomers', () => {
    const { informaticaRequest, getCustomersResponse } = new GetCustomersGenerator(valueGenerator).generate({ numberToGenerate: 1 });

    it('returns customers from the service', async () => {
      when(informaticaServiceGetCustomers).calledWith(informaticaRequest[0]).mockResolvedValueOnce(getCustomersResponse[0]);

      const response = await service.getCustomers(informaticaRequest[0]);

      expect(response).toEqual(getCustomersResponse[0]);
    });
  });

  describe('getOrCreateCustomer', () => {
    const DTFSCustomerDto: DTFSCustomerDto = { companyRegistrationNumber: '12345678', companyName: 'TEST NAME' };
    const salesforceCreateCustomerResponse: CreateCustomerSalesforceResponseDto = {
      id: 'customer-id',
      errors: null,
      success: true
    };
    const createUkefIdResponse: UkefId[] = [{ "maskedId": "TEST PARTY_URN", "type": null, "createdBy": null, "createdDatetime": null, "requestingSystem": null }];
    const dunAndBradstreetGetDunsNumberResponse: string = "TEST DUNS_NUMBER";
    const createCustomerResponse: GetCustomersInformaticaResponseItem[] = [{ "companyRegNo": "12345678", "name": "TEST NAME", "partyUrn": "TEST PARTY_URN", "sfId": "customer-id", "type": null, "subtype": null, "isLegacyRecord": false }];
    const createCustomerResponseWithNoPartyUrn: GetCustomersInformaticaResponseItem[] = [{ "companyRegNo": "12345678", "name": "TEST NAME", "partyUrn": null, "sfId": "customer-id", "type": null, "subtype": null, "isLegacyRecord": false }];
    const createCustomerResponseWithLegacyUrn: GetCustomersInformaticaResponseItem[] = [{ "companyRegNo": "12345678", "name": "TEST NAME", "partyUrn": "SOME_LEGACY_URN", "sfId": "customer-id", "type": null, "subtype": null, "isLegacyRecord": true }];

    describe('when the customer does exist', () => {
      describe('when the customer is non-legacy', () => {
        const getCustomersResponse = [
          [
            {
              partyUrn: '00312345',
              name: 'TEST NAME',
              sfId: 'customer-id',
              companyRegNo: '12345678',
              type: null,
              subtype: null,
              isLegacyRecord: false
            }
          ]
        ]

        it('returns the existing customer', async () => {
          when(informaticaServiceGetCustomers).calledWith({
            companyreg: DTFSCustomerDto.companyRegistrationNumber
          }).mockResolvedValueOnce(getCustomersResponse[0]);

          const response = await service.getOrCreateCustomer(DTFSCustomerDto);
        
          expect(response).toEqual(getCustomersResponse[0]);
          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(0);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
        });
      })

      describe('when the customer is legacy', () => {
        const getCustomersResponse = [
          [
            {
              partyUrn: 'SOME_LEGACY_URN',
              name: 'TEST NAME',
              sfId: 'customer-id',
              companyRegNo: '12345678',
              type: null,
              subtype: null,
              isLegacyRecord: true
            }
          ]
        ]

        it('creates a new customer using the legacy URN and returns the response if there are no errors', async () => {
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
          when(informaticaServiceGetCustomers).calledWith({
            companyreg: DTFSCustomerDto.companyRegistrationNumber
          }).mockResolvedValueOnce(getCustomersResponse[0]);

          const response = await service.getOrCreateCustomer(DTFSCustomerDto);

          expect(response).toEqual(createCustomerResponseWithLegacyUrn);
          expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
            Name: DTFSCustomerDto.companyName,
            D_B_Number__c: "TEST DUNS_NUMBER",
            Party_URN__c: "SOME_LEGACY_URN",
            Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
          }));

          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
        });

        it('throws an error if Salesforce service fails to create a customer', async () => {
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockRejectedValueOnce(new Error('Service Error'));
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
          when(informaticaServiceGetCustomers).calledWith({
            companyreg: DTFSCustomerDto.companyRegistrationNumber
          }).mockRejectedValueOnce(new NotFoundException('Customer not found.'));

          await expect(service.getOrCreateCustomer(DTFSCustomerDto)).rejects.toThrow('Service Error');
          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
        });

        it('continues creating customer with null PartyURN if numbers service fails to create a party urn', async () => {
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockRejectedValueOnce(new InternalServerErrorException());
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
          when(informaticaServiceGetCustomers).calledWith({
            companyreg: DTFSCustomerDto.companyRegistrationNumber
          }).mockRejectedValueOnce(new NotFoundException('Customer not found.'));

          const response = await service.getOrCreateCustomer(DTFSCustomerDto);

          expect(response).toEqual(createCustomerResponseWithNoPartyUrn);
          expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
            Name: DTFSCustomerDto.companyName,
            D_B_Number__c: "TEST DUNS_NUMBER",
            Party_URN__c: null,
            Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
          }));
          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
        });

        it('throws an error if Dun and Bradstreet service fails to return a DUNS number and does not call further services', async () => {
          when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
          when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
          when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockRejectedValueOnce(new InternalServerErrorException());
          when(informaticaServiceGetCustomers).calledWith({
            companyreg: DTFSCustomerDto.companyRegistrationNumber
          }).mockRejectedValueOnce(new NotFoundException('Customer not found.'));


          await expect(service.getOrCreateCustomer(DTFSCustomerDto)).rejects.toThrow('Internal Server Error');
          expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
          expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
          expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
        });
      })
    })

    describe('when the customer does not exist', () => {
      it('creates a customer successfully and returns the response if there are no errors', async () => {
        when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
        when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
        when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
        when(informaticaServiceGetCustomers).calledWith({
          companyreg: DTFSCustomerDto.companyRegistrationNumber
        }).mockRejectedValueOnce(new NotFoundException('Customer not found.'));

        const response = await service.getOrCreateCustomer(DTFSCustomerDto);

        expect(response).toEqual(createCustomerResponse);
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
          Name: DTFSCustomerDto.companyName,
          D_B_Number__c: "TEST DUNS_NUMBER",
          Party_URN__c: "TEST PARTY_URN",
          Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
        }));
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
      });

      it('throws an error if Salesforce service fails to create a customer', async () => {
        when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockRejectedValueOnce(new Error('Service Error'));
        when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
        when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
        when(informaticaServiceGetCustomers).calledWith({
          companyreg: DTFSCustomerDto.companyRegistrationNumber
        }).mockRejectedValueOnce(new NotFoundException('Customer not found.'));

        await expect(service.getOrCreateCustomer(DTFSCustomerDto)).rejects.toThrow('Service Error');
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
      });

      it('continues creating customer with null PartyURN if numbers service fails to create a party urn', async () => {
        when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
        when(numbersServiceCreate).calledWith(expect.any(Object)).mockRejectedValueOnce(new InternalServerErrorException());
        when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);
        when(informaticaServiceGetCustomers).calledWith({
          companyreg: DTFSCustomerDto.companyRegistrationNumber
        }).mockRejectedValueOnce(new NotFoundException('Customer not found.'));

        const response = await service.getOrCreateCustomer(DTFSCustomerDto);

        expect(response).toEqual(createCustomerResponseWithNoPartyUrn);
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
          Name: DTFSCustomerDto.companyName,
          D_B_Number__c: "TEST DUNS_NUMBER",
          Party_URN__c: null,
          Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
        }));
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(1);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(1);
      });

      it('throws an error if Dun and Bradstreet service fails to return a DUNS number and does not call further services', async () => {
        when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
        when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
        when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockRejectedValueOnce(new InternalServerErrorException());
        when(informaticaServiceGetCustomers).calledWith({
          companyreg: DTFSCustomerDto.companyRegistrationNumber
        }).mockRejectedValueOnce(new NotFoundException('Customer not found.'));


        await expect(service.getOrCreateCustomer(DTFSCustomerDto)).rejects.toThrow('Internal Server Error');
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(1);
        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
      });
    });

    describe('when the Informatica service returns an unexpected response', () => {
      it('throws an error if there is an InformaticaException', async () => {
        when(informaticaServiceGetCustomers).calledWith({
          companyreg: DTFSCustomerDto.companyRegistrationNumber
        }).mockRejectedValueOnce(new InformaticaException('Failed to get customers in Informatica'));

        await expect(service.getOrCreateCustomer(DTFSCustomerDto)).rejects.toThrow('Failed to get customers in Informatica');

        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(0);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
      });

      it('throws an error if the Informatica response does not contain valid customers', async () => {
        when(informaticaServiceGetCustomers).calledWith({
          companyreg: DTFSCustomerDto.companyRegistrationNumber
        }).mockResolvedValueOnce([]);

        await expect(service.getOrCreateCustomer(DTFSCustomerDto)).rejects.toThrow('Internal Server Error');

        expect(salesforceServiceCreateCustomer).toHaveBeenCalledTimes(0);
        expect(dunAndBradstreetServiceGetDunsNumber).toHaveBeenCalledTimes(0);
        expect(numbersServiceCreate).toHaveBeenCalledTimes(0);
      });
    })
  });
});  