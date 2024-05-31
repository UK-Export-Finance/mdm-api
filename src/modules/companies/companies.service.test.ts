import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompaniesHouseService } from '@ukef/helper-modules/companies-house/companies-house.service';
import { CompaniesHouseException } from '@ukef/helper-modules/companies-house/exception/companies-house.exception';
import { CompaniesHouseInvalidAuthorizationException } from '@ukef/helper-modules/companies-house/exception/companies-house-invalid-authorization.exception';
import { CompaniesHouseMalformedAuthorizationHeaderException } from '@ukef/helper-modules/companies-house/exception/companies-house-malformed-authorization-header.exception';
import { CompaniesHouseNotFoundException } from '@ukef/helper-modules/companies-house/exception/companies-house-not-found.exception';
import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { SectorIndustriesService } from '../sector-industries/sector-industries.service';
import { CompaniesService } from './companies.service';
import { CompaniesOverseasCompanyException } from './exception/companies-overseas-company-exception.exception';

describe('CompaniesService', () => {
  let configServiceGet: jest.Mock;
  let companiesHouseServiceGetCompanyByRegistrationNumber: jest.Mock;
  let sectorIndustriesServiceFind: jest.Mock;
  let service: CompaniesService;

  const valueGenerator = new RandomValueGenerator();

  const testRegistrationNumber = '00000001';

  const { getCompanyCompaniesHouseResponse, findSectorIndustriesResponse, getCompanyResponse, getCompanyCompaniesHouseOverseasCompanyResponse } =
    new GetCompanyGenerator(valueGenerator).generate({
      numberToGenerate: 1,
      registrationNumber: testRegistrationNumber,
    });

  beforeAll(() => {
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

  beforeEach(() => {
    resetAllWhenMocks();
    jest.clearAllMocks();
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

    it('throws a NotFoundException if the call to getCompanyByRegistrationNumber on the CompaniesHouseService throws a CompaniesHouseNotFoundException', async () => {
      const companiesHouseNotFoundException = new CompaniesHouseNotFoundException(`Company with registration number ${testRegistrationNumber} was not found.`);
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockRejectedValueOnce(companiesHouseNotFoundException);

      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(NotFoundException);
      await expect(getCompanyPromise).rejects.toThrow('Not found');
      await expect(getCompanyPromise).rejects.toHaveProperty('cause', companiesHouseNotFoundException);
    });

    it('throws an UnprocessableEntityException if the CompaniesHouseService returns an overseas company', async () => {
      const companiesOverseasCompanyException = new CompaniesOverseasCompanyException(
        `Company with registration number ${testRegistrationNumber} is an overseas company. UKEF can only process applications from companies based in the UK.`,
      );
      when(companiesHouseServiceGetCompanyByRegistrationNumber)
        .calledWith(testRegistrationNumber)
        .mockReturnValueOnce(getCompanyCompaniesHouseOverseasCompanyResponse);

      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      await expect(getCompanyPromise).rejects.toBeInstanceOf(UnprocessableEntityException);
      await expect(getCompanyPromise).rejects.toThrow('Unprocessable entity');
      await expect(getCompanyPromise).rejects.toHaveProperty('cause', companiesOverseasCompanyException);
    });

    it.each([
      {
        exceptionName: 'CompaniesHouseMalformedAuthorizationHeaderException',
        exceptionInstance: new CompaniesHouseMalformedAuthorizationHeaderException(
          `Invalid 'Authorization' header. Check that your 'Authorization' header is well-formed.`,
        ),
      },
      {
        exceptionName: 'CompaniesHouseInvalidAuthorizationException',
        exceptionInstance: new CompaniesHouseInvalidAuthorizationException('Invalid authorization. Check your Companies House API key.'),
      },
      {
        exceptionName: 'CompaniesHouseException',
        exceptionInstance: new CompaniesHouseException('Failed to get response from Companies House API.'),
      },
    ])(
      'rethrows the error if the call to getCompanyByRegistrationNumber on the CompaniesHouseService throws a $exceptionName',
      async ({ exceptionInstance }) => {
        when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockRejectedValueOnce(exceptionInstance);

        const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

        await expect(getCompanyPromise).rejects.toBe(exceptionInstance);
      },
    );
  });
});
