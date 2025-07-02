import { InternalServerErrorException } from '@nestjs/common';
import { BUSINESS_CENTRE } from '@ukef/constants';
import { mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';

describe('OdsService - getBusinessCentres', () => {
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
    "message": "SUCCESS",
    "status": "SUCCESS",
    "total_result_count": 2,
    "results": [
      {
        "business_centre_code": "${BUSINESS_CENTRE.EXAMPLES.CODE}",
        "business_centre_name": "${BUSINESS_CENTRE.EXAMPLES.NAME}"
      },
      {
        "business_centre_code": "${BUSINESS_CENTRE.EXAMPLES.CODE}",
        "business_centre_name": "${BUSINESS_CENTRE.EXAMPLES.NAME}"
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call service.callOdsStoredProcedure', async () => {
    // Act
    await service.getBusinessCentres();

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
      entityToQuery: ODS_ENTITIES.BUSINESS_CENTRE,
    });

    expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped business centres', async () => {
    // Act
    const result = await service.getBusinessCentres();

    // Assert
    const expected = mapBusinessCentres(JSON.parse(mockStoredProcedureOutput).results);

    expect(result).toEqual(expected);
  });

  describe('when the response from ODS does not have status as SUCCESS', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT SUCCESS" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getBusinessCentres();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting business centres');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the response from ODS has total_result_count as 0', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "SUCCESS", "total_result_count": 0 }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      const expected = new Error('Error getting business centres');

      // Act & Assert
      const promise = service.getBusinessCentres();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "SUCCESS" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getBusinessCentres();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting business centres');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when callOdsStoredProcedure throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.getBusinessCentres();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting business centres');

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
