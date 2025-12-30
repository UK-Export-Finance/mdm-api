import { NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapIndustry } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';

describe('OdsService - findUkefIndustry', () => {
  let service: OdsService;
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

    service = new OdsService(mockDataSource, mockLogger);
  });

  const mockStoredProcedureOutput = `{
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 1,
    "results": [
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
    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call service.callOdsStoredProcedure', async () => {
    // Act
    await service.findUkefIndustry(EXAMPLES.INDUSTRY.CODE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
      entityToQuery: ODS_ENTITIES.INDUSTRY,
      queryPageSize: 1,
      queryParameters: {
        industry_category: 'UKEF',
        industry_code: EXAMPLES.INDUSTRY.CODE,
      },
    });

    expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a mapped industry', async () => {
    // Act
    const result = await service.findUkefIndustry(EXAMPLES.INDUSTRY.CODE);

    // Assert
    const { results } = JSON.parse(mockStoredProcedureOutput);
    const [jsonResult] = results;

    const expected = mapIndustry(jsonResult);

    expect(result).toEqual(expected);
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

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findUkefIndustry(EXAMPLES.INDUSTRY.CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No UKEF industry ${EXAMPLES.INDUSTRY.CODE} found`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findUkefIndustry(EXAMPLES.INDUSTRY.CODE);

      const expected = new Error(`Error finding UKEF industry ${EXAMPLES.INDUSTRY.CODE}`, {
        cause: {
          message: `Error finding UKEF industry ${EXAMPLES.INDUSTRY.CODE} from ODS stored procedure`,
        },
      });

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findUkefIndustry(EXAMPLES.INDUSTRY.CODE);

      const expected = new Error(`Error finding UKEF industry ${EXAMPLES.INDUSTRY.CODE}`, { cause: mockStoredProcedureOutput });

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when callOdsStoredProcedure throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockError = 'Mock ODS error';

      jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue(mockError);

      // Act & Assert
      const promise = service.findUkefIndustry(EXAMPLES.INDUSTRY.CODE);

      const expected = new Error(`Error finding UKEF industry ${EXAMPLES.INDUSTRY.CODE}`, { cause: mockError });

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
