import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { COMPANIES, EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { GetSicCodeToUkefIndustryResponseDto } from './dto';
import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - findUkefIndustryCodeByCompaniesHouseCode', () => {
  let service: OdsService;
  let odsStoredProcedureService: OdsStoredProcedureService;
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  let mockDataSource: jest.Mocked<DataSource>;
  const mockLogger = new PinoLogger({});

  beforeEach(() => {
    mockQueryRunner = {
      query: jest.fn(),
      release: jest.fn(),
    } as unknown as jest.Mocked<QueryRunner>;

    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
    } as unknown as jest.Mocked<DataSource>;

    odsStoredProcedureService = new OdsStoredProcedureService(mockDataSource);
    service = new OdsService(odsStoredProcedureService, mockLogger);
  });

  const mockStoredProcedureOutput = `{
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 1,
    "results": [
      {
        "sic_section_code": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_section_code}",
        "sic_section_legacy_code": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_section_legacy_code}",
        "sic_section_name": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_section_name}",
        "sic_industry_code": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_industry_code}",
        "sic_industry_description": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_industry_description}",
        "sic_industry_level": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_industry_level}",
        "sic_code_active_flag": ${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.sic_code_active_flag},
        "ukef_industry_code": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_industry_code}",
        "ukef_industry_description": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_industry_description}",
        "ukef_sector_code": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_sector_code}",
        "ukef_sector_description": "${EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_sector_description}"
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  describe(`when an industry code is provided with ${COMPANIES.INDUSTRY_CODE.MODERN_LENGTH} length`, () => {
    it('should call odsStoredProcedureService.call', async () => {
      // Act
      await service.findUkefIndustryCodeByCompaniesHouseCode(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE);

      // Assert
      const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.SIC_CODE_TO_UKEF_INDUSTRY,
        queryPageSize: 1,
        queryParameters: {
          sic_industry_code: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE,
        },
      });

      expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
      expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
    });

    it('should return an UKEF industry code', async () => {
      // Act
      const result = await service.findUkefIndustryCodeByCompaniesHouseCode(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE);

      // Assert
      const expected: GetSicCodeToUkefIndustryResponseDto = {
        ukefIndustryCode: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_industry_code,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when an industry code is provided with ${COMPANIES.INDUSTRY_CODE.LEGACY_LENGTH} length`, () => {
    it('should call odsStoredProcedureService.call', async () => {
      // Act
      await service.findUkefIndustryCodeByCompaniesHouseCode(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE_FOUR_DIGITS);

      // Assert
      const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.SIC_CODE_TO_UKEF_INDUSTRY,
        queryPageSize: 1,
        queryParameters: {
          sic_section_code: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE_FOUR_DIGITS,
        },
      });

      expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
      expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
    });

    it('should return an UKEF industry code', async () => {
      // Act
      const result = await service.findUkefIndustryCodeByCompaniesHouseCode(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE_FOUR_DIGITS);

      // Assert
      const expected: GetSicCodeToUkefIndustryResponseDto = {
        ukefIndustryCode: EXAMPLES.ODS.SIC_CODE_TO_UKEF_INDUSTRY.ukef_industry_code,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when an industry code is provided with ${COMPANIES.INDUSTRY_CODE.LEGACY_LENGTH - 1} length`, () => {
    it('should call odsStoredProcedureService.call', async () => {
      // Arrange
      const mockIndustryCode = '123';

      // Act
      await service.findUkefIndustryCodeByCompaniesHouseCode(mockIndustryCode);

      // Assert
      const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.SIC_CODE_TO_UKEF_INDUSTRY,
        queryPageSize: 1,
        queryParameters: {
          sic_section_code: mockIndustryCode,
        },
      });

      expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
      expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
    });
  });

  describe(`when an industry code is provided with ${COMPANIES.INDUSTRY_CODE.MODERN_LENGTH + 1} length`, () => {
    it('should call odsStoredProcedureService.call', async () => {
      // Arrange
      const mockIndustryCode = '123456';

      // Act
      await service.findUkefIndustryCodeByCompaniesHouseCode(mockIndustryCode);

      // Assert
      const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.SIC_CODE_TO_UKEF_INDUSTRY,
        queryPageSize: 1,
        queryParameters: {
          sic_section_code: mockIndustryCode,
        },
      });

      expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
      expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
    });
  });

  describe('when an industry is not found', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{
        "message": "${STORED_PROCEDURE.SUCCESS}",
        "status": "${STORED_PROCEDURE.SUCCESS}",
        "total_result_count": 0,
        "results": []
      }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findUkefIndustryCodeByCompaniesHouseCode(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No UKEF industry by Companies House industry code ${EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE} found in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response in ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act
      const promise = service.findUkefIndustryCodeByCompaniesHouseCode(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding UKEF industry code by Companies House industry code ${EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE} in ODS`,
        cause: {
          message: `Error finding UKEF industry code by Companies House industry code ${EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE} in ODS stored procedure`,
        },
      });
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue(mockStoredProcedureOutput);

      // Act
      const promise = service.findUkefIndustryCodeByCompaniesHouseCode(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding UKEF industry code by Companies House industry code ${EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE} in ODS`,
        cause: mockStoredProcedureOutput,
      });
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockError = 'Mock ODS error';

      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue(mockError);

      // Act
      const promise = service.findUkefIndustryCodeByCompaniesHouseCode(EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding UKEF industry code by Companies House industry code ${EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE} in ODS`,
        cause: mockError,
      });
    });
  });
});
