import { BadRequestException } from '@nestjs/common';
import { COMPANIES, CUSTOMERS, ENUMS } from '@ukef/constants';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { when } from 'jest-when';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { GetCustomersDirectResponseItems } from './dto/get-customers-direct-response.dto';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';

describe('CustomersController', () => {
  const valueGenerator = new RandomValueGenerator();

  let customersServiceGetCustomers: jest.Mock;
  let customersServiceGetCustomersDirect: jest.Mock;

  let controller: CustomersController;

  beforeEach(() => {
    const customersService = new CustomersService(null, null);
    customersServiceGetCustomers = jest.fn();
    customersServiceGetCustomersDirect = jest.fn();
    customersService.getCustomers = customersServiceGetCustomers;
    customersService.getCustomersDirect = customersServiceGetCustomersDirect;

    controller = new CustomersController(customersService);
  });

  describe('getCustomers', () => {
    it.each([
      {
        query: { name: CUSTOMERS.EXAMPLES.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { name: CUSTOMERS.EXAMPLES.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
      },
      {
        query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
      },
      {
        query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
      },
      {
        query: { name: CUSTOMERS.EXAMPLES.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
      },
      {
        query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
      },
      {
        query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
      },
      {
        query: { name: CUSTOMERS.EXAMPLES.NAME },
      },
      {
        query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG },
      },
      {
        query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN },
      },
    ])('get customers with query $query', async ({ query }) => {
      const { request, informaticaRequest, getCustomersResponse } = new GetCustomersGenerator(valueGenerator).generate({ numberToGenerate: 1, query });

      when(customersServiceGetCustomers).calledWith(informaticaRequest[0]).mockResolvedValueOnce(getCustomersResponse[0]);

      const customers = await controller.getCustomers(request[0]);

      expect(customers).toEqual(getCustomersResponse[0]);
    });

    it.each([
      {
        query: {},
      },
      {
        query: { fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { incorrectField: CUSTOMERS.EXAMPLES.NAME },
      },
      {
        query: { name: CUSTOMERS.EXAMPLES.NAME, companyReg: CUSTOMERS.EXAMPLES.COMPANYREG },
      },
      {
        query: { name: CUSTOMERS.EXAMPLES.NAME, partyUrn: CUSTOMERS.EXAMPLES.PARTYURN },
      },
      {
        query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, partyUrn: CUSTOMERS.EXAMPLES.PARTYURN },
      },
      {
        query: { name: CUSTOMERS.EXAMPLES.NAME, companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, partyUrn: CUSTOMERS.EXAMPLES.PARTYURN },
      },
    ])('throws BadRequestException if there is more than 1 search parameter (name, companyReg, partyUrn)', ({ query }) => {
      const getCustomers = (query) => () => controller.getCustomers(query);

      expect(getCustomers(query)).toThrow('One and just one search parameter is required');
      expect(getCustomers(query)).toThrow(BadRequestException);
    });
  });

  describe('getCustomersDirect', () => {
    const companyRegNoDto: CompanyRegistrationNumberDto = { companyRegistrationNumber: CUSTOMERS.EXAMPLES.COMPANYREG };
    const expectedResponse: GetCustomersDirectResponseItems = [{ Id: CUSTOMERS.EXAMPLES.COMPANYREG }];

    it('returns customers directly from Salesforce', async () => {
      when(customersServiceGetCustomersDirect).calledWith(companyRegNoDto).mockResolvedValueOnce(expectedResponse);

      const response = await controller.getCustomersDirect(companyRegNoDto);

      expect(response).toEqual(expectedResponse);
    });
  });
});
