import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { CustomersService } from './customers.service';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { GetCustomersDirectResponseItems } from './dto/get-customers-direct-response.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';

jest.mock('@ukef/modules/informatica/informatica.service');

describe('CustomerService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CustomersService;
  let informaticaServiceGetCustomers: jest.Mock;
  let salesforceServiceGetCustomers: jest.Mock;
  let salesforceServiceCreateCustomer: jest.Mock;

  beforeEach(() => {
    informaticaServiceGetCustomers = jest.fn();
    const informaticaService = new InformaticaService(null);
    informaticaService.getCustomers = informaticaServiceGetCustomers;
    salesforceServiceGetCustomers = jest.fn();
    salesforceServiceCreateCustomer = jest.fn();
    const salesforceService = new SalesforceService(null);
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
    const expectedResponse: GetCustomersDirectResponseItems = [{ Id: 'asdf1234' }];

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
    const companyRegNoDto: CompanyRegistrationNumberDto = { companyRegistrationNumber: '12345678' };
    const createCustomerResponse: CreateCustomerSalesforceResponseDto = { 
      id: 'customer-id', 
      errors: null,
      success: true 
    };

    it('creates a customer successfully and returns the response', async () => {
      when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockResolvedValueOnce(createCustomerResponse);

      const response = await service.createCustomer(companyRegNoDto);

      expect(response).toEqual(createCustomerResponse);
      expect(salesforceServiceCreateCustomer).toHaveBeenCalledWith(expect.objectContaining({
        // TODO: update this with correct values
        Name: companyRegNoDto.companyRegistrationNumber,
        D_B_Number__c: companyRegNoDto.companyRegistrationNumber,
      }));
    });

    it('throws an error if Salesforce service fails to create a customer', async () => {
      when(salesforceServiceCreateCustomer).calledWith(expect.any(Object)).mockRejectedValueOnce(new Error('Service Error'));

      await expect(service.createCustomer(companyRegNoDto)).rejects.toThrow('Service Error');
    });
  });
});
