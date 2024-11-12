import { CUSTOMERS } from '@ukef/constants';
import { when } from 'jest-when';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { GetCustomersSalesforceResponse } from './dto/get-customers-salesforce-response.dto';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';

describe('CustomersController', () => {
  let customersServiceGetCustomers: jest.Mock;
  let customersServiceGetCustomersSalesforce: jest.Mock;

  let controller: CustomersController;

  beforeEach(() => {
    const customersService = new CustomersService(null);
    customersServiceGetCustomers = jest.fn();
    customersServiceGetCustomersSalesforce = jest.fn();
    customersService.getCustomersSalesforce = customersServiceGetCustomersSalesforce;

    controller = new CustomersController(customersService);
  });

  describe('getCustomersSalesforce', () => {
    const companyRegNoDto: CompanyRegistrationNumberDto = { companyRegistrationNumber: CUSTOMERS.EXAMPLES.COMPANYREG };
    const expectedResponse: GetCustomersSalesforceResponse = [{
      partyUrn: CUSTOMERS.EXAMPLES.PARTYURN,
      name: CUSTOMERS.EXAMPLES.NAME,
      sfId: 'TEST_SALESFORCE_ID',
      companyRegNo: CUSTOMERS.EXAMPLES.COMPANYREG,
    }];

    it('returns customers directly from Salesforce', async () => {
      when(customersServiceGetCustomersSalesforce).calledWith(companyRegNoDto).mockResolvedValueOnce(expectedResponse);

      const response = await controller.getCustomersSalesforce(companyRegNoDto);

      expect(response).toEqual(expectedResponse);
    });
  });
});
