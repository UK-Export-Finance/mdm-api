import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks } from 'jest-when'; // eslint-disable-line unused-imports/no-unused-vars

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

describe('CompaniesController', () => {
  let companiesServiceGetCompanyByRegistrationNumber: jest.Mock;

  let controller: CompaniesController; // eslint-disable-line unused-imports/no-unused-vars

  const valueGenerator = new RandomValueGenerator();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { getCompanyResponse } = new GetCompanyGenerator(valueGenerator).generate({
    numberToGenerate: 2,
  });

  beforeEach(() => {
    resetAllWhenMocks();
    const companiesService = new CompaniesService(null, null);
    companiesServiceGetCompanyByRegistrationNumber = jest.fn();
    companiesService.getCompanyByRegistrationNumber = companiesServiceGetCompanyByRegistrationNumber;

    controller = new CompaniesController(companiesService);
  });

  it('should be defined', () => {
    expect(CompaniesController).toBeDefined();
  });

  describe('getCompanyByRegistrationNumber()', () => {});
});
