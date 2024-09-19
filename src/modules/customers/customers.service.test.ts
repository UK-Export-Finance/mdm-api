import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { CustomersService } from './customers.service';

jest.mock('@ukef/modules/informatica/informatica.service');

describe('CustomerService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CustomersService;
  let informaticaServiceGetCustomers: jest.Mock;
  let salesforceServiceCreateCustomer: jest.Mock;

  beforeEach(() => {
    informaticaServiceGetCustomers = jest.fn();
    const informaticaService = new InformaticaService(null);
    informaticaService.getCustomers = informaticaServiceGetCustomers;
    salesforceServiceCreateCustomer = jest.fn();
    const salesforceService = new SalesforceService(null);
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
});
