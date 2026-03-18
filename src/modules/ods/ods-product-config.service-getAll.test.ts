import { InternalServerErrorException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsProductConfigService } from './ods-product-config.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';
import { mockProductConfigs } from './test-helpers';

describe('OdsProductConfigService - getAll', () => {
  let service: OdsProductConfigService;
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
    service = new OdsProductConfigService(odsStoredProcedureService, mockLogger);
  });

  const mockStoredProcedureOutput = JSON.stringify({
    message: STORED_PROCEDURE.SUCCESS,
    status: STORED_PROCEDURE.SUCCESS,
    total_result_count: mockProductConfigs.length,
    results: mockProductConfigs,
  });

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.getAll();

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.CONFIGURATION_PRODUCT,
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return product configs', async () => {
    // Act
    const result = await service.getAll();

    // Assert
    expect(result).toEqual(mockProductConfigs);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getAll();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting product configs from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getAll();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting product configs from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.getAll();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting product configs from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
