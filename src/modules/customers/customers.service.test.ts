import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';
import { ConfigService } from '@nestjs/config';
import { CustomersService } from './customers.service';

import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { GetCustomersSalesforceResponse } from './dto/get-customers-salesforce-response.dto';
import { CUSTOMERS } from '@ukef/constants';
import { GetCustomersSalesforceResponseItems } from '../salesforce/dto/get-customers-salesforce-response.dto';

jest.mock('@ukef/modules/informatica/informatica.service');

describe('CustomerService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CustomersService;

  let informaticaServiceGetCustomers: jest.Mock;

  let salesforceConfigServiceGet: jest.Mock;
  let salesforceServiceGetCustomers: jest.Mock;

  beforeEach(() => {
    informaticaServiceGetCustomers = jest.fn();
    const informaticaService = new InformaticaService(null);
    informaticaService.getCustomers = informaticaServiceGetCustomers;

    const salesforceConfigService = new ConfigService();
    salesforceConfigServiceGet = jest.fn().mockReturnValue({ clientId: 'TEST_CLIENT_ID', clientSecret: 'TEST_CLIENT_SECRET', username: 'TEST_USERNAME', password: 'TEST_PASSWORD', accessUrl: 'TEST_ACCESS_URL' });
    salesforceConfigService.get = salesforceConfigServiceGet;
    salesforceServiceGetCustomers = jest.fn();
    const salesforceService = new SalesforceService(null, salesforceConfigService);
    salesforceService.getCustomers = salesforceServiceGetCustomers;

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
});  