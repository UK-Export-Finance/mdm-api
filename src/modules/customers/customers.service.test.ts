import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { NumbersService } from '../numbers/numbers.service';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';
import { ConfigService } from '@nestjs/config';
import { CustomersService } from './customers.service';

import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { GetCustomersSalesforceResponse } from './dto/get-customers-salesforce-response.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { CUSTOMERS } from '@ukef/constants';
import { GetCustomersSalesforceResponseItems } from '../salesforce/dto/get-customers-salesforce-response.dto';
import { UkefId } from '../numbers/entities/ukef-id.entity';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('@ukef/modules/informatica/informatica.service');

describe('CustomerService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CustomersService;

  let informaticaServiceGetCustomers: jest.Mock;

  let salesforceConfigServiceGet: jest.Mock;
  let salesforceServiceGetCustomers: jest.Mock;
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
    salesforceServiceGetCustomers = jest.fn();
    salesforceServiceCreateCustomer = jest.fn();
    const salesforceService = new SalesforceService(null, salesforceConfigService);
    salesforceService.getCustomers = salesforceServiceGetCustomers;
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

  describe('getCustomersSalesforce', () => {
    const companyRegNoDto: CompanyRegistrationNumberDto = { companyRegistrationNumber: CUSTOMERS.EXAMPLES.PARTYURN };
    const expectedSalesforceResponse: GetCustomersSalesforceResponseItems = [{
      Party_URN__c: CUSTOMERS.EXAMPLES.PARTYURN,
      Name: CUSTOMERS.EXAMPLES.NAME,
      Id: 'TEST_SF_ID',
      Company_Registration_Number__c: CUSTOMERS.EXAMPLES.COMPANYREG,
    }];

    const expectedResponse: GetCustomersSalesforceResponse = [{
      partyUrn: CUSTOMERS.EXAMPLES.PARTYURN,
      name: CUSTOMERS.EXAMPLES.NAME,
      sfId: 'TEST_SF_ID',
      companyRegNo: CUSTOMERS.EXAMPLES.COMPANYREG,
    }];

    it('returns customers directly from Salesforce', async () => {
      when(salesforceServiceGetCustomers).calledWith(companyRegNoDto).mockResolvedValueOnce(expectedSalesforceResponse);

      const response = await service.getCustomersSalesforce(companyRegNoDto);

      expect(response).toEqual(expectedResponse);
    });

    it('throws an error if Salesforce service fails', async () => {
      when(salesforceServiceGetCustomers).calledWith(companyRegNoDto).mockRejectedValueOnce(new Error('Service Error'));

      await expect(service.getCustomersSalesforce(companyRegNoDto)).rejects.toThrow('Service Error');
    });
  });

  describe('createCustomer', () => {
    const DTFSCustomerDto: DTFSCustomerDto = { companyRegistrationNumber: '12345678', companyName: 'TEST NAME'};
    const salesforceCreateCustomerResponse: CreateCustomerSalesforceResponseDto = { 
      id: 'customer-id', 
      errors: null,
      success: true 
    };
    const createUkefIdResponse: UkefId[] = [{"maskedId": "TEST PARTY_URN", "type": null, "createdBy": null, "createdDatetime": null, "requestingSystem": null}];
    const dunAndBradstreetGetDunsNumberResponse: string = "TEST DUNS_NUMBER";
    const createCustomerResponse: GetCustomersSalesforceResponse = [{"companyRegNo": "12345678", "name": "TEST NAME", "partyUrn": "TEST PARTY_URN", "sfId": "customer-id"}];
    const createCustomerResponseWithNoPartyUrn: GetCustomersSalesforceResponse = [{"companyRegNo": "12345678", "name": "TEST NAME", "partyUrn": null, "sfId": "customer-id"}];

    it('creates a customer successfully and returns the response', async () => {
      when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
      when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
      when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);

      const response = await service.createCustomer(DTFSCustomerDto);

      expect(response).toEqual(createCustomerResponse);
      expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
        Name: DTFSCustomerDto.companyName,
        D_B_Number__c: "TEST DUNS_NUMBER",
        Party_URN__c: "TEST PARTY_URN",
        Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
      }));
    });

    it('throws an error if Salesforce service fails to create a customer', async () => {
      when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockRejectedValueOnce(new Error('Service Error'));
      when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
      when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);

      await expect(service.createCustomer(DTFSCustomerDto)).rejects.toThrow('Service Error');
    });

    it('continues creating customer with null PartyURN if numbers service fails to create a party urn', async () => {
      when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
      when(numbersServiceCreate).calledWith(expect.any(Object)).mockRejectedValueOnce(new InternalServerErrorException());
      when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockResolvedValueOnce(dunAndBradstreetGetDunsNumberResponse);

      const response = await service.createCustomer(DTFSCustomerDto);

      expect(response).toEqual(createCustomerResponseWithNoPartyUrn);
      expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
        Name: DTFSCustomerDto.companyName,
        D_B_Number__c: "TEST DUNS_NUMBER",
        Party_URN__c: null,
        Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
      }));
    });

    it('continues creating customer with null DUNS number if Dun and Bradstreet service fails to return one', async () => {
      when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(salesforceCreateCustomerResponse);
      when(numbersServiceCreate).calledWith(expect.any(Object)).mockResolvedValueOnce(createUkefIdResponse);
      when(dunAndBradstreetServiceGetDunsNumber).calledWith(expect.any(String)).mockRejectedValueOnce(new InternalServerErrorException());

      const response = await service.createCustomer(DTFSCustomerDto);

      expect(response).toEqual(createCustomerResponse);
      expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
        Name: DTFSCustomerDto.companyName,
        D_B_Number__c: null,
        Party_URN__c: "TEST PARTY_URN",
        Company_Registration_Number__c: DTFSCustomerDto.companyRegistrationNumber,
      }));
    });
  });
});  