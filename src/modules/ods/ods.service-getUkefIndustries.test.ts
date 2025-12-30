import { InternalServerErrorException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapIndustries } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';

describe('OdsService - getUkefIndustries', () => {
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
    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call service.callOdsStoredProcedure', async () => {
    // Act
    await service.getUkefIndustries();

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
      entityToQuery: ODS_ENTITIES.INDUSTRY,
      queryParameters: { industry_category: 'UKEF' },
    });

    expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped industries', async () => {
    // Act
    const result = await service.getUkefIndustries();

    // Assert
    const jsonResults = JSON.parse(mockStoredProcedureOutput).results;

    const expected = mapIndustries(jsonResults);

    expect(result).toEqual(expected);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getUkefIndustries();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error getting UKEF industries`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getUkefIndustries();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting UKEF industries');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when callOdsStoredProcedure throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.getUkefIndustries();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting UKEF industries');

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
