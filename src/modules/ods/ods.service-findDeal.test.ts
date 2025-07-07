import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DEALS } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';

describe('OdsService - findDeal', () => {
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
      "query_request_id": "Test ID",
      "message": "SUCCESS",
      "status": "SUCCESS",
      "total_result_count": 1,
      "results": [
        {
          "deal_code": "${DEALS.EXAMPLES.ID}",
          "deal_name": "${DEALS.EXAMPLES.NAME}",
          "deal_type_description": "${DEALS.EXAMPLES.DESCRIPTION}"
        }
      ]
    }`;

  beforeEach(() => {
    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call service.callOdsStoredProcedure', async () => {
    // Act
    await service.findDeal(DEALS.EXAMPLES.ID);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
      entityToQuery: ODS_ENTITIES.DEAL,
      queryPageSize: 1,
      queryParameters: { deal_code: DEALS.EXAMPLES.ID },
    });

    expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a deal', async () => {
    // Act
    const result = await service.findDeal(DEALS.EXAMPLES.ID);

    // Assert
    const expected = {
      dealId: DEALS.EXAMPLES.ID,
      name: DEALS.EXAMPLES.NAME,
      description: DEALS.EXAMPLES.DESCRIPTION,
    };

    expect(result).toEqual(expected);
  });

  describe('when the response from ODS does not have status as SUCCESS', () => {
    it('should throw an error', async () => {
      // Arrange

      const mockStoredProcedureOutput = `{ "status": "NOT SUCCESS" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findDeal(DEALS.EXAMPLES.ID);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding deal ${DEALS.EXAMPLES.ID}`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the response from ODS has total_result_count as 0', () => {
    it('should throw an error', async () => {
      const mockStoredProcedureOutput = `{ "status": "SUCCESS", "total_result_count": 0 }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findDeal(DEALS.EXAMPLES.ID);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No deal found ${DEALS.EXAMPLES.ID}`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      const mockStoredProcedureOutput = `{ "status": "SUCCESS" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findDeal(DEALS.EXAMPLES.ID);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding deal ${DEALS.EXAMPLES.ID}`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when callOdsStoredProcedure throws an error', () => {
    it('should throw an error', async () => {
      jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.findDeal(DEALS.EXAMPLES.ID);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding deal ${DEALS.EXAMPLES.ID}`);

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
