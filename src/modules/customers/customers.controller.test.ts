import { BadRequestException } from '@nestjs/common';
import { ENUMS, EXAMPLES } from '@ukef/constants';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { validate } from 'class-validator';
import { Response } from 'express';
import { when } from 'jest-when';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { GetCustomersResponse } from './dto/get-customers-response.dto';

const mockResponseObject = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
} as any as Response;

describe('CustomersController', () => {
  const valueGenerator = new RandomValueGenerator();

  let customersServiceGetCustomers: jest.Mock;
  let customersServiceGetOrCreateCustomer: jest.Mock;
  let customersServiceGetDunAndBradstreetNumber: jest.Mock;

  let controller: CustomersController;

  beforeEach(() => {
    const customersService = new CustomersService(null, null, null, null);
    customersServiceGetCustomers = jest.fn();
    customersServiceGetOrCreateCustomer = jest.fn();
    customersService.getCustomers = customersServiceGetCustomers;
    customersService.getOrCreateCustomer = customersServiceGetOrCreateCustomer;
    customersServiceGetDunAndBradstreetNumber = jest.fn();
    customersService.getDunAndBradstreetNumber = customersServiceGetDunAndBradstreetNumber;

    controller = new CustomersController(customersService);
  });

  describe('getCustomers', () => {
    it.each([
      {
        query: { name: EXAMPLES.CUSTOMER.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { companyReg: EXAMPLES.CUSTOMER.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { partyUrn: EXAMPLES.CUSTOMER.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
      },
      {
        query: { name: EXAMPLES.CUSTOMER.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
      },
      {
        query: { companyReg: EXAMPLES.CUSTOMER.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
      },
      {
        query: { partyUrn: EXAMPLES.CUSTOMER.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
      },
      {
        query: { name: EXAMPLES.CUSTOMER.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
      },
      {
        query: { companyReg: EXAMPLES.CUSTOMER.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
      },
      {
        query: { partyUrn: EXAMPLES.CUSTOMER.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
      },
      {
        query: { name: EXAMPLES.CUSTOMER.NAME },
      },
      {
        query: { companyReg: EXAMPLES.CUSTOMER.COMPANYREG },
      },
      {
        query: { partyUrn: EXAMPLES.CUSTOMER.PARTYURN },
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
        query: { incorrectField: EXAMPLES.CUSTOMER.NAME },
      },
      {
        query: { name: EXAMPLES.CUSTOMER.NAME, companyReg: EXAMPLES.CUSTOMER.COMPANYREG },
      },
      {
        query: { name: EXAMPLES.CUSTOMER.NAME, partyUrn: EXAMPLES.CUSTOMER.PARTYURN },
      },
      {
        query: { companyReg: EXAMPLES.CUSTOMER.COMPANYREG, partyUrn: EXAMPLES.CUSTOMER.PARTYURN },
      },
      {
        query: { name: EXAMPLES.CUSTOMER.NAME, companyReg: EXAMPLES.CUSTOMER.COMPANYREG, partyUrn: EXAMPLES.CUSTOMER.PARTYURN },
      },
    ])('throws BadRequestException if there is more than 1 search parameter (name, companyReg, partyUrn)', ({ query }) => {
      const getCustomers = (query) => () => controller.getCustomers(query);

      expect(getCustomers(query)).toThrow('One and just one search parameter is required');
      expect(getCustomers(query)).toThrow(BadRequestException);
    });
  });

  describe('getOrCreateCustomer', () => {
    const DTFSCustomerDtoWithProbabilityOfDefault: DTFSCustomerDto = {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: 'TEST NAME',
      probabilityOfDefault: 3,
    };

    const DTFSCustomerDtoWithFalsyProbabilityOfDefault: DTFSCustomerDto = {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: 'TEST NAME',
      probabilityOfDefault: undefined,
    };

    const DTFSCustomerDtoWithoutProbabilityOfDefault: DTFSCustomerDto = {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: 'TEST NAME',
    };

    const getOrCreateCustomerResponse: GetCustomersResponse = [
      {
        partyUrn: 'string',
        name: 'string',
        sfId: 'string',
        companyRegNo: 'string',
        type: 'Association',
        subtype: 'Alternative Finance Provider',
        isLegacyRecord: true,
      },
    ];

    it('creates a customer successfully and returns the response when probabilityOfDefault is present', async () => {
      when(customersServiceGetOrCreateCustomer)
        .calledWith(mockResponseObject, DTFSCustomerDtoWithProbabilityOfDefault)
        .mockResolvedValueOnce(getOrCreateCustomerResponse);

      const response = await controller.getOrCreateCustomer(mockResponseObject, DTFSCustomerDtoWithProbabilityOfDefault);

      expect(customersServiceGetOrCreateCustomer).toHaveBeenCalledTimes(1);
      expect(response).toEqual(getOrCreateCustomerResponse);
    });

    it('throws an error if the service fails to create a customer', async () => {
      when(customersServiceGetOrCreateCustomer)
        .calledWith(mockResponseObject, DTFSCustomerDtoWithProbabilityOfDefault)
        .mockRejectedValueOnce(new Error('Service Error'));

      await expect(controller.getOrCreateCustomer(mockResponseObject, DTFSCustomerDtoWithProbabilityOfDefault)).rejects.toThrow('Service Error');
    });

    it('creates a customer successfully and returns the response when probabilityOfDefault is falsy', async () => {
      when(customersServiceGetOrCreateCustomer)
        .calledWith(mockResponseObject, DTFSCustomerDtoWithFalsyProbabilityOfDefault)
        .mockResolvedValueOnce(getOrCreateCustomerResponse);

      const response = await controller.getOrCreateCustomer(mockResponseObject, DTFSCustomerDtoWithFalsyProbabilityOfDefault);

      expect(customersServiceGetOrCreateCustomer).toHaveBeenCalledTimes(1);
      expect(response).toEqual(getOrCreateCustomerResponse);
    });

    it('creates a customer successfully and returns the response when probabilityOfDefault is not provided', async () => {
      when(customersServiceGetOrCreateCustomer)
        .calledWith(mockResponseObject, DTFSCustomerDtoWithoutProbabilityOfDefault)
        .mockResolvedValueOnce(getOrCreateCustomerResponse);

      const response = await controller.getOrCreateCustomer(mockResponseObject, DTFSCustomerDtoWithoutProbabilityOfDefault);

      expect(customersServiceGetOrCreateCustomer).toHaveBeenCalledTimes(1);
      expect(response).toEqual(getOrCreateCustomerResponse);
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
      expect(customersServiceGetDunAndBradstreetNumber).toHaveBeenCalledWith(query.companyRegistrationNumber);
    });
  });
});
