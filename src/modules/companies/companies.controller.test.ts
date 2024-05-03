import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

describe('CompaniesController', () => {
  let companiesServiceGetCompanyByRegistrationNumber: jest.Mock;
  let controller: CompaniesController;

  const valueGenerator = new RandomValueGenerator();

  const testRegistrationNumber = '00000001';

  const { getCompanyResponse } = new GetCompanyGenerator(valueGenerator).generate({
    numberToGenerate: 1,
    registrationNumber: testRegistrationNumber,
  });

  beforeEach(() => {
    resetAllWhenMocks();

    const companiesService = new CompaniesService(null);
    companiesServiceGetCompanyByRegistrationNumber = jest.fn();
    companiesService.getCompanyByRegistrationNumber = companiesServiceGetCompanyByRegistrationNumber;

    controller = new CompaniesController(companiesService);
  });

  describe('getCompanyByRegistrationNumber', () => {
    it('calls getCompanyByRegistrationNumber on the CompaniesService with the registration number', async () => {
      when(companiesServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyResponse);

      await controller.getCompanyByRegistrationNumber({ registrationNumber: testRegistrationNumber });

      expect(companiesServiceGetCompanyByRegistrationNumber).toHaveBeenCalledTimes(1);
      expect(companiesServiceGetCompanyByRegistrationNumber).toHaveBeenCalledWith(testRegistrationNumber);
    });

    it('returns the company from the service', async () => {
      when(companiesServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyResponse);

      const response = await controller.getCompanyByRegistrationNumber({ registrationNumber: testRegistrationNumber });

      expect(response).toEqual(getCompanyResponse);
    });
  });
});
