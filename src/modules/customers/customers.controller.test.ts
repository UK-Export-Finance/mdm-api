import { BadRequestException } from '@nestjs/common';
import { CUSTOMERS, ENUMS } from '@ukef/constants';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { validate } from 'class-validator';
import { when } from 'jest-when';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';

describe('CustomersController', () => {
  const valueGenerator = new RandomValueGenerator();

  let customersServiceGetCustomers: jest.Mock;
  let customersServiceGetDunAndBradstreetNumber: jest.Mock;

  let controller: CustomersController;

  beforeEach(() => {
    const customersService = new CustomersService(null, null);
    customersServiceGetCustomers = jest.fn();
    customersService.getCustomers = customersServiceGetCustomers;
    customersServiceGetDunAndBradstreetNumber = jest.fn();
    customersService.getDunAndBradstreetNumber = customersServiceGetDunAndBradstreetNumber;

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

  describe('getDunAndBradstreetNumber', () => {
    it.each([
      {
        query: { companyRegistrationNumber: 'TEST' },
      },
      {
        query: { companyRegistrationNumber: '' },
      },
      {
        query: { companyRegistrationNumber: 'more_than_10_chars_long' },
      },
    ])('returns false if the request is invalid', async ({ query }) => {
      const dto = new CompanyRegistrationNumberDto();
      dto.companyRegistrationNumber = query.companyRegistrationNumber;

      const validationErrors = await validate(dto);

      expect(validationErrors.length).toBeGreaterThan(0);
    });

    it('calls service method if the request is valid', async () => {
      const query = { companyRegistrationNumber: '12345678' };
      const duns_number = '56785678';
      when(customersServiceGetDunAndBradstreetNumber).calledWith(query.companyRegistrationNumber).mockResolvedValueOnce(duns_number);

      const response = await controller.getDunAndBradstreetNumber(query);

      expect(response).toEqual(duns_number);
      expect(controller.getDunAndBradstreetNumber).toHaveBeenCalledWith(query.companyRegistrationNumber);
    });
  });
});
