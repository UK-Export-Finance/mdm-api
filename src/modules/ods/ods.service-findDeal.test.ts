import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - findDeal', () => {
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
    "query_request_id": "Test ID",
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 1,
    "results": [
      {
        "deal_code": "${EXAMPLES.DEAL.ID}",
        "deal_name": "${EXAMPLES.DEAL.NAME}",
        "deal_type_description": "${EXAMPLES.DEAL.DESCRIPTION}"
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.findDeal(EXAMPLES.DEAL.ID);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.DEAL,
      queryPageSize: 1,
      queryParameters: { deal_code: EXAMPLES.DEAL.ID },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a deal', async () => {
    // Act
    const result = await service.findDeal(EXAMPLES.DEAL.ID);

    // Assert
    const expected = {
      dealId: EXAMPLES.DEAL.ID,
      name: EXAMPLES.DEAL.NAME,
      description: EXAMPLES.DEAL.DESCRIPTION,
    };

    expect(result).toEqual(expected);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange

      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;
      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findDeal(EXAMPLES.DEAL.ID);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding deal ${EXAMPLES.DEAL.ID} in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the response from ODS has total_result_count as 0', () => {
    it('should throw an error', async () => {
      const mockStoredProcedureOutput = `{ "status": "${STORED_PROCEDURE.SUCCESS}", "total_result_count": 0 }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findDeal(EXAMPLES.DEAL.ID);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No deal found ${EXAMPLES.DEAL.ID} in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findDeal(EXAMPLES.DEAL.ID);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding deal ${EXAMPLES.DEAL.ID} in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.findDeal(EXAMPLES.DEAL.ID);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding deal ${EXAMPLES.DEAL.ID} in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
