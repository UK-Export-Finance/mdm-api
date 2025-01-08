import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { CustomersService } from './customers.service';

jest.mock('@ukef/modules/informatica/informatica.service');

describe('CustomerService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CustomersService;
  let informaticaServiceGetCustomers: jest.Mock;
  let dunAndBradstreetServiceGetDunsNumber: jest.Mock;
  let configServiceGet: jest.Mock;

  const testKey = valueGenerator.string({ length: 40 });

  beforeEach(() => {
    informaticaServiceGetCustomers = jest.fn();
    const informaticaService = new InformaticaService(null);
    informaticaService.getCustomers = informaticaServiceGetCustomers;

    const configService = new ConfigService();
    configServiceGet = jest.fn().mockReturnValue({ key: testKey });
    configService.get = configServiceGet;

    dunAndBradstreetServiceGetDunsNumber = jest.fn();
    const dunAndBradstreetService = new DunAndBradstreetService(null, configService);
    dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber = dunAndBradstreetServiceGetDunsNumber;

    resetAllWhenMocks();

    service = new CustomersService(informaticaService, dunAndBradstreetService);
  });

  describe('getCustomers', () => {
    const { informaticaRequest, getCustomersResponse } = new GetCustomersGenerator(valueGenerator).generate({ numberToGenerate: 1 });

    it('returns customers from the service', async () => {
      when(informaticaServiceGetCustomers).calledWith(informaticaRequest[0]).mockResolvedValueOnce(getCustomersResponse[0]);

      const response = await service.getCustomers(informaticaRequest[0]);

      expect(response).toEqual(getCustomersResponse[0]);
    });
  });

  describe('getDunAndBradstreetNumberByRegistrationNumber', () => {
    const companyRegistrationNumber = '12341234';
    const dunsNumber = '56785678';

    it('returns duns number for the registration number', async () => {
      when(dunAndBradstreetServiceGetDunsNumber).calledWith(companyRegistrationNumber).mockResolvedValueOnce(dunsNumber);

      const response = await service.getDunAndBradstreetNumber(companyRegistrationNumber);

      expect(response).toEqual(dunsNumber);
    });

    it('returns a NotFoundException when no a DUNS number was not found', async () => {
      when(dunAndBradstreetServiceGetDunsNumber).calledWith(companyRegistrationNumber).mockRejectedValueOnce(new NotFoundException());

      const responsePromise = service.getDunAndBradstreetNumber(companyRegistrationNumber);

      await expect(responsePromise).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
