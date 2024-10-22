import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';
import { ConfigService } from '@nestjs/config';

import { CustomersService } from './customers.service';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { GetCustomersDirectResponse } from './dto/get-customers-direct-response.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { CUSTOMERS } from '@ukef/constants';

jest.mock('@ukef/modules/informatica/informatica.service');

describe('CustomerService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CustomersService;
  let informaticaServiceGetCustomers: jest.Mock;
  let salesforceServiceGetCustomers: jest.Mock;
  let salesforceServiceCreateCustomer: jest.Mock;
  let configServiceGet: jest.Mock;

  beforeEach(() => {
    informaticaServiceGetCustomers = jest.fn();
    const informaticaService = new InformaticaService(null);
    informaticaService.getCustomers = informaticaServiceGetCustomers;
    salesforceServiceGetCustomers = jest.fn();
    salesforceServiceCreateCustomer = jest.fn();
    const salesforceConfigService = new ConfigService();
    configServiceGet = jest.fn().mockReturnValue({ clientId: 'TEST_CLIENT_ID', clientSecret: 'TEST_CLIENT_SECRET', username: 'TEST_USERNAME', password: 'TEST_PASSWORD', accessUrl: 'TEST_ACCESS_URL' });
    salesforceConfigService.get = configServiceGet;
    const salesforceService = new SalesforceService(null, salesforceConfigService);
    salesforceService.getCustomers = salesforceServiceGetCustomers;
    salesforceService.createCustomer = salesforceServiceCreateCustomer;

    resetAllWhenMocks();

    service = new CustomersService(informaticaService, salesforceService);
  });

  describe('getCustomers', () => {
    const { informaticaRequest, getCustomersResponse } = new GetCustomersGenerator(valueGenerator).generate({ numberToGenerate: 1 });

    it('returns customers from the service', async () => {
      when(informaticaServiceGetCustomers).calledWith(informaticaRequest[0]).mockResolvedValueOnce(getCustomersResponse[0]);

      const response = await service.getCustomers(informaticaRequest[0]);

      expect(response).toEqual(getCustomersResponse[0]);
    });
  });

  describe('getCustomersDirect', () => {
    const companyRegNoDto: CompanyRegistrationNumberDto = { companyRegistrationNumber: '12345678' };
    const expectedResponse: GetCustomersDirectResponse = [{
      partyUrn: CUSTOMERS.EXAMPLES.PARTYURN,
      name: CUSTOMERS.EXAMPLES.NAME,
      sfId: 'TEST_SF_ID',
      companyRegNo: CUSTOMERS.EXAMPLES.COMPANYREG,
    }];

    it('returns customers directly from Salesforce', async () => {
      when(salesforceServiceGetCustomers).calledWith(companyRegNoDto).mockResolvedValueOnce(expectedResponse);

      const response = await service.getCustomersDirect(companyRegNoDto);

      expect(response).toEqual(expectedResponse);
    });

    it('throws an error if Salesforce service fails', async () => {
      when(salesforceServiceGetCustomers).calledWith(companyRegNoDto).mockRejectedValueOnce(new Error('Service Error'));

      await expect(service.getCustomersDirect(companyRegNoDto)).rejects.toThrow('Service Error');
    });
  });

  describe('createCustomer', () => {
    const DTFSCustomerDto: DTFSCustomerDto = { companyRegistrationNumber: '12345678', companyName: 'TEST NAME'};
    const createCustomerResponse: CreateCustomerSalesforceResponseDto = { 
      id: 'customer-id', 
      errors: null,
      success: true 
    };

    it('creates a customer successfully and returns the response', async () => {
      when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(createCustomerResponse);

      const response = await service.createCustomer(DTFSCustomerDto);

      expect(response).toEqual(createCustomerResponse);
      expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
        // TODO: update this with correct values
        Name: DTFSCustomerDto.companyName,
        D_B_Number__c: DTFSCustomerDto.companyRegistrationNumber,
      }));
    });

    it('throws an error if Salesforce service fails to create a customer', async () => {
      when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockRejectedValueOnce(new Error('Service Error'));

      await expect(service.createCustomer(DTFSCustomerDto)).rejects.toThrow('Service Error');
    });
  });
});
