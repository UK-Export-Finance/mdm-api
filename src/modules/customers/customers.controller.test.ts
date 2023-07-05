import { BadRequestException } from '@nestjs/common';
import { ENUMS } from '@ukef/constants';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { when } from 'jest-when';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  const valueGenerator = new RandomValueGenerator();

  let customersServiceGetCustomers: jest.Mock;

  let controller: CustomersController;

  beforeEach(() => {
    const customersService = new CustomersService(null);
    customersServiceGetCustomers = jest.fn();
    customersService.getCustomers = customersServiceGetCustomers;

    controller = new CustomersController(customersService);
  });

  describe('getCustomers', () => {
    it.each([
      {
        query: { name: 'test', fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { companyreg: '06012345', fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { partyUrn: '00302069', fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { name: 'test', fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
      },
      {
        query: { companyreg: '06012345', fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
      },
      {
        query: { partyUrn: '00302069', fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
      },
      {
        query: { name: 'test', fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
      },
      {
        query: { companyreg: '06012345', fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
      },
      {
        query: { partyUrn: '00302069', fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
      },
      {
        query: { name: 'test' },
      },
      {
        query: { companyreg: '06012345' },
      },
      {
        query: { partyUrn: '00302069' },
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
        query: { incorrectField: 'test' },
      },
      {
        query: { name: 'test', companyreg: '06012345' },
      },
      {
        query: { name: 'test', partyUrn: '00302069' },
      },
      {
        query: { companyreg: '06012345', partyUrn: '00302069' },
      },
      {
        query: { name: 'test', companyreg: '06012345', partyUrn: '00302069' },
      },
    ])('throws BadRequestException if search parameter (name, companyreg, partyUrn) number is not 1', ({ query }) => {
      const getCustomers = (query) => () => controller.getCustomers(query);

      expect(getCustomers(query)).toThrow('One and just one search parameter is required');
      expect(getCustomers(query)).toThrow(BadRequestException);
    });
  });
});
