import { ConfigService } from '@nestjs/config';
import { CompaniesHouseService } from '@ukef/helper-modules/companies-house/companies-house.service';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks } from 'jest-when';

import { SectorIndustriesService } from '../sector-industries/sector-industries.service';
import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: CompaniesService; // eslint-disable-line unused-imports/no-unused-vars
  let configServiceGet: jest.Mock;
  let companiesHouseServiceGetCompanyByRegistrationNumber: jest.Mock;
  let sectorIndustriesServiceFind: jest.Mock;

  beforeEach(() => {
    const configService = new ConfigService();
    configServiceGet = jest.fn().mockReturnValue({ key: valueGenerator.word() });
    configService.get = configServiceGet;

    companiesHouseServiceGetCompanyByRegistrationNumber = jest.fn();
    const companiesHouseService = new CompaniesHouseService(null, configService);
    companiesHouseService.getCompanyByRegistrationNumber = companiesHouseServiceGetCompanyByRegistrationNumber;

    sectorIndustriesServiceFind = jest.fn();
    const sectorIndustriesService = new SectorIndustriesService(null, null);
    sectorIndustriesService.find = sectorIndustriesServiceFind;

    resetAllWhenMocks();

    service = new CompaniesService(companiesHouseService, sectorIndustriesService);
  });

  describe('getCompanyByRegistrationNumber()', () => {});
});
