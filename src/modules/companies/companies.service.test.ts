import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { resetAllWhenMocks, when } from 'jest-when';
import { CompaniesHouseService } from '@ukef/helper-modules/companies-house/companies-house.service';
import { CompaniesHouseException } from '@ukef/helper-modules/companies-house/exception/companies-house.exception';
import { CompaniesHouseInvalidAuthorizationException } from '@ukef/helper-modules/companies-house/exception/companies-house-invalid-authorization.exception';
import { CompaniesHouseMalformedAuthorizationHeaderException } from '@ukef/helper-modules/companies-house/exception/companies-house-malformed-authorization-header.exception';
import { CompaniesHouseNotFoundException } from '@ukef/helper-modules/companies-house/exception/companies-house-not-found.exception';
import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { SectorIndustriesService } from '@ukef/modules/sector-industries/sector-industries.service';
import { CompaniesService } from './companies.service';
import { GetCompanyResponse } from './dto/get-company-response.dto';
import { CompaniesOverseasCompanyException } from './exception/companies-overseas-company-exception.exception';

describe('CompaniesService', () => {
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
    companiesHouseServiceGetCompanyByRegistrationNumber = jest.fn();
    const companiesHouseService = {} as jest.Mocked<CompaniesHouseService>;
    companiesHouseService.getCompanyByRegistrationNumber = companiesHouseServiceGetCompanyByRegistrationNumber;

    sectorIndustriesServiceFind = jest.fn();
    const sectorIndustriesService = {} as jest.Mocked<SectorIndustriesService>;
    sectorIndustriesService.find = sectorIndustriesServiceFind;

    service = new CompaniesService(companiesHouseService, sectorIndustriesService);
  });

  beforeEach(() => {
    resetAllWhenMocks();
    jest.clearAllMocks();
  });

  describe('getCompanyByRegistrationNumber', () => {
    it('calls getCompanyByRegistrationNumber on the CompaniesHouseService with the registration number', async () => {
      // Arrange
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyCompaniesHouseResponse);
      when(sectorIndustriesServiceFind).calledWith().mockReturnValueOnce(findSectorIndustriesResponse);

      // Act
      await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(companiesHouseServiceGetCompanyByRegistrationNumber).toHaveBeenCalledTimes(1);
      expect(companiesHouseServiceGetCompanyByRegistrationNumber).toHaveBeenCalledWith(testRegistrationNumber);
    });

    it('calls find on the SectorIndustriesService with no arguments', async () => {
      // Arrange
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyCompaniesHouseResponse);
      when(sectorIndustriesServiceFind).calledWith().mockReturnValueOnce(findSectorIndustriesResponse);

      // Act
      await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(sectorIndustriesServiceFind).toHaveBeenCalledTimes(1);
      expect(sectorIndustriesServiceFind).toHaveBeenCalledWith();
    });

    it('returns a mapped form of the company returned by the CompaniesHouseService', async () => {
      // Arrange
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyCompaniesHouseResponse);
      when(sectorIndustriesServiceFind).calledWith().mockReturnValueOnce(findSectorIndustriesResponse);

      // Act
      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(response).toEqual(getCompanyResponse);
    });

    it('returns a mapped form of the company returned by the CompaniesHouseService when it has no type', async () => {
      // Arrange
      const { type: removed, ...getCompanyCompaniesHouseResponseNoType } = getCompanyCompaniesHouseResponse;

      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockReturnValueOnce(getCompanyCompaniesHouseResponseNoType);
      when(sectorIndustriesServiceFind).calledWith().mockReturnValueOnce(findSectorIndustriesResponse);

      // Act
      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(response).toEqual(getCompanyResponse);
    });

    it('returns a mapped form of the company returned by the CompaniesHouseService when it has no SIC codes', async () => {
      // Arrange
      const { sic_codes: removed, ...getCompanyCompaniesHouseResponseNoSicCodes } = getCompanyCompaniesHouseResponse;
      const { industries: removed2, ...getCompanyResponseNoIndustries } = getCompanyResponse;
      (getCompanyResponseNoIndustries as GetCompanyResponse).industries = [];

      when(companiesHouseServiceGetCompanyByRegistrationNumber)
        .calledWith(testRegistrationNumber)
        .mockReturnValueOnce(getCompanyCompaniesHouseResponseNoSicCodes);
      when(sectorIndustriesServiceFind).calledWith().mockReturnValueOnce(findSectorIndustriesResponse);

      // Act
      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(response).toEqual(getCompanyResponseNoIndustries);
    });

    it('returns a mapped form of the company returned by the CompaniesHouseService when it has no registered office address', async () => {
      // Arrange
      const { registered_office_address: removed, ...getCompanyCompaniesHouseResponseNoRegisteredOfficeAddress } = getCompanyCompaniesHouseResponse;
      const { registeredAddress: removed2, ...getCompanyResponseNoRegisteredAddress } = getCompanyResponse;
      (getCompanyResponseNoRegisteredAddress as GetCompanyResponse).registeredAddress = {};

      when(companiesHouseServiceGetCompanyByRegistrationNumber)
        .calledWith(testRegistrationNumber)
        .mockReturnValueOnce(getCompanyCompaniesHouseResponseNoRegisteredOfficeAddress);
      when(sectorIndustriesServiceFind).calledWith().mockReturnValueOnce(findSectorIndustriesResponse);

      // Act
      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(response).toEqual(getCompanyResponseNoRegisteredAddress);
    });

    it('returns a mapped form of the company returned by the CompaniesHouseService when it has no last accounts', async () => {
      // Arrange
      const { last_accounts: removed, ...accountsNoLastAccounts } = getCompanyCompaniesHouseResponse.accounts;
      const getCompanyCompaniesHouseResponseNoLastAccounts = { ...getCompanyCompaniesHouseResponse, accounts: accountsNoLastAccounts };

      const getCompanyResponseNoLastAccounts: GetCompanyResponse = {
        ...getCompanyResponse,
        accounts: {
          ...getCompanyResponse.accounts,
          lastAccounts: { madeUpTo: undefined, periodEndOn: undefined, periodStartOn: undefined, type: undefined },
        },
      };

      when(companiesHouseServiceGetCompanyByRegistrationNumber)
        .calledWith(testRegistrationNumber)
        .mockReturnValueOnce(getCompanyCompaniesHouseResponseNoLastAccounts);
      when(sectorIndustriesServiceFind).calledWith().mockReturnValueOnce(findSectorIndustriesResponse);

      // Act
      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(response).toEqual(getCompanyResponseNoLastAccounts);
    });

    it('returns a mapped form of the company returned by the CompaniesHouseService when it has no next accounts', async () => {
      // Arrange
      const { next_accounts: removed, ...accountsNoNextAccounts } = getCompanyCompaniesHouseResponse.accounts;
      const getCompanyCompaniesHouseResponseNoNextAccounts = { ...getCompanyCompaniesHouseResponse, accounts: accountsNoNextAccounts };

      const getCompanyResponseNoNextAccounts: GetCompanyResponse = {
        ...getCompanyResponse,
        accounts: {
          ...getCompanyResponse.accounts,
          nextAccounts: { dueOn: undefined, overdue: undefined, periodEndOn: undefined, periodStartOn: undefined },
        },
      };

      when(companiesHouseServiceGetCompanyByRegistrationNumber)
        .calledWith(testRegistrationNumber)
        .mockReturnValueOnce(getCompanyCompaniesHouseResponseNoNextAccounts);
      when(sectorIndustriesServiceFind).calledWith().mockReturnValueOnce(findSectorIndustriesResponse);

      // Act
      const response = await service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(response).toEqual(getCompanyResponseNoNextAccounts);
    });

    it('throws a NotFoundException if the call to getCompanyByRegistrationNumber on the CompaniesHouseService throws a CompaniesHouseNotFoundException', async () => {
      // Arrange
      const companiesHouseNotFoundException = new CompaniesHouseNotFoundException(`Company with registration number ${testRegistrationNumber} was not found.`);
      when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockRejectedValueOnce(companiesHouseNotFoundException);

      // Act
      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Assert
      await expect(getCompanyPromise).rejects.toBeInstanceOf(NotFoundException);
      await expect(getCompanyPromise).rejects.toThrow('Not found');
      await expect(getCompanyPromise).rejects.toHaveProperty('cause', companiesHouseNotFoundException);
    });

    it('throws an UnprocessableEntityException if the CompaniesHouseService returns an overseas company', async () => {
      // Arrange
      const companiesOverseasCompanyException = new CompaniesOverseasCompanyException(
        `Company with registration number ${testRegistrationNumber} is an overseas company. UKEF can only process applications from companies based in the UK.`,
      );

      when(companiesHouseServiceGetCompanyByRegistrationNumber)
        .calledWith(testRegistrationNumber)
        .mockReturnValueOnce(getCompanyCompaniesHouseOverseasCompanyResponse);

      const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

      // Act & Assert
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
        // Arrange
        when(companiesHouseServiceGetCompanyByRegistrationNumber).calledWith(testRegistrationNumber).mockRejectedValueOnce(exceptionInstance);

        const getCompanyPromise = service.getCompanyByRegistrationNumber(testRegistrationNumber);

        // Act & Assert
        await expect(getCompanyPromise).rejects.toBe(exceptionInstance);
      },
    );
  });
});
