import { ConfigService } from '@nestjs/config';
import { CompaniesHouseService } from '@ukef/helper-modules/companies-house/companies-house.service';
import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CompaniesService; // eslint-disable-line unused-imports/no-unused-vars
  let configServiceGet: jest.Mock;
  let companiesHouseServiceGetCompanyByRegistrationNumber: jest.Mock;

  beforeEach(() => {
    const configService = new ConfigService();
    configServiceGet = jest.fn().mockReturnValue({ key: valueGenerator.word() });
    configService.get = configServiceGet;

    companiesHouseServiceGetCompanyByRegistrationNumber = jest.fn();
    const companiesHouseService = new CompaniesHouseService(null, configService);
    companiesHouseService.getCompanyByRegistrationNumber = companiesHouseServiceGetCompanyByRegistrationNumber;

    resetAllWhenMocks();

    service = new CompaniesService(companiesHouseService);
  });

  describe('getCompanyByRegistrationNumber', () => {
    const testRegistrationNumber = '00000001';
    const { getCompanyCompaniesHouseResponse, getCompanyResponse } = new GetCompanyGenerator(valueGenerator).generate({
      numberToGenerate: 1,
      registrationNumber: testRegistrationNumber,
    });

    it('calls getCompanyByRegistrationNumber on the CompaniesHouseService with the registration number', async () => {
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyCompaniesHouseResponse);

      await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      expect(companiesHouseServiceGetCompanyByRegistrationNumber).toHaveBeenCalledTimes(1);
      expect(companiesHouseServiceGetCompanyByRegistrationNumber).toHaveBeenCalledWith(testRegistrationNumber);
    });

    it('returns a reduced form of the company returned by the CompaniesHouseService, with fewer fields', async () => {
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyCompaniesHouseResponse);

      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      expect(response).toEqual(getCompanyResponse);
    });
  });
});
