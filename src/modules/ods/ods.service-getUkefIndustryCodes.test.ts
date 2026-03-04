import { InternalServerErrorException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapIndustryCodes } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, ODS_QUERY_PARAM_VALUES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - getUkefIndustryCodes', () => {
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
    "total_result_count": 2,
    "results": [
      {
        "industry_id": "${EXAMPLES.INDUSTRY.ID}",
        "industry_code": "${EXAMPLES.INDUSTRY.CODE}",
        "industry_description": "${EXAMPLES.INDUSTRY.DESCRIPTION}",
        "industry_group_code": "${EXAMPLES.INDUSTRY.GROUP_CODE}",
        "industry_group_description": "${EXAMPLES.INDUSTRY.GROUP_DESCRIPTION}",
        "industry_category": "${EXAMPLES.INDUSTRY.CATEGORY}"
      },
      {
        "industry_id": "${EXAMPLES.INDUSTRY.ID}",
        "industry_code": "${EXAMPLES.INDUSTRY.CODE}",
        "industry_description": "${EXAMPLES.INDUSTRY.DESCRIPTION}",
        "industry_group_code": "${EXAMPLES.INDUSTRY.GROUP_CODE}",
        "industry_group_description": "${EXAMPLES.INDUSTRY.GROUP_DESCRIPTION}",
        "industry_category": "${EXAMPLES.INDUSTRY.CATEGORY}"
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.getUkefIndustryCodes();

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.INDUSTRY,
      queryParameters: {
        industry_category: ODS_QUERY_PARAM_VALUES.UKEF,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped industry codes', async () => {
    // Act
    const result = await service.getUkefIndustryCodes();

    // Assert
    const jsonResults = JSON.parse(mockStoredProcedureOutput).results;

    const expected = mapIndustryCodes(jsonResults);

    expect(result).toEqual(expected);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getUkefIndustryCodes();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error getting UKEF industry codes from ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getUkefIndustryCodes();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting UKEF industry codes from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.getUkefIndustryCodes();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting UKEF industry codes from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
