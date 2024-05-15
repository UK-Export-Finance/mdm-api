import { ConfigService } from '@nestjs/config';
import { CompaniesHouseService } from '@ukef/helper-modules/companies-house/companies-house.service';
import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { SectorIndustriesService } from '../sector-industries/sector-industries.service';
import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let configServiceGet: jest.Mock;
  let companiesHouseServiceGetCompanyByRegistrationNumber: jest.Mock;
  let sectorIndustriesServiceFind: jest.Mock;
  let service: CompaniesService;

  const valueGenerator = new RandomValueGenerator();

  const testRegistrationNumber = '00000001';

  const { getCompanyCompaniesHouseResponse, findSectorIndustriesResponse, getCompanyResponse } = new GetCompanyGenerator(valueGenerator).generate({
    numberToGenerate: 1,
    registrationNumber: testRegistrationNumber,
  });

  beforeEach(() => {
    resetAllWhenMocks();

    const configService = new ConfigService();
    configServiceGet = jest.fn().mockReturnValue({ key: valueGenerator.word() });
    configService.get = configServiceGet;

    companiesHouseServiceGetCompanyByRegistrationNumber = jest.fn();
    const companiesHouseService = new CompaniesHouseService(null, configService);
    companiesHouseService.getCompanyByRegistrationNumber = companiesHouseServiceGetCompanyByRegistrationNumber;

    sectorIndustriesServiceFind = jest.fn();
    const sectorIndustriesService = new SectorIndustriesService(null, null);
    sectorIndustriesService.find = sectorIndustriesServiceFind;

    service = new CompaniesService(companiesHouseService, sectorIndustriesService);
  });

  describe('getCompanyByRegistrationNumber', () => {
    it('calls getCompanyByRegistrationNumber on the CompaniesHouseService with the registration number', async () => {
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyCompaniesHouseResponse);
      when(sectorIndustriesServiceFind).calledWith(null, null).mockReturnValueOnce(findSectorIndustriesResponse);

      await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      expect(companiesHouseServiceGetCompanyByRegistrationNumber).toHaveBeenCalledTimes(1);
      expect(companiesHouseServiceGetCompanyByRegistrationNumber).toHaveBeenCalledWith(testRegistrationNumber);
    });

    it(`calls find on the SectorIndustriesService with both arguments as 'null'`, async () => {
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyCompaniesHouseResponse);
      when(sectorIndustriesServiceFind).calledWith(null, null).mockReturnValueOnce(findSectorIndustriesResponse);

      await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      expect(sectorIndustriesServiceFind).toHaveBeenCalledTimes(1);
      expect(sectorIndustriesServiceFind).toHaveBeenCalledWith(null, null);
    });

    it('returns a mapped form of the company returned by the CompaniesHouseService', async () => {
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyCompaniesHouseResponse);
      when(sectorIndustriesServiceFind).calledWith(null, null).mockReturnValueOnce(findSectorIndustriesResponse);

      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      expect(response).toEqual(getCompanyResponse);
    });
  });
});
