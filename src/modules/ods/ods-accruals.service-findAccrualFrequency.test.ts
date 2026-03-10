import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapAccrualFrequency } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsAccrualsService } from './ods-accruals.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsAccrualsService - findAccrualFrequency', () => {
  let service: OdsAccrualsService;
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
    service = new OdsAccrualsService(odsStoredProcedureService, mockLogger);
  });

  const mockStoredProcedureOutput = `{
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 1,
    "results": [
      {
        "code": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.code}",
        "name": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.name}",
        "orderId": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.orderId}",
        "frequencyNumberOfUnits": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyNumberOfUnits}",
        "frequencyUnits": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyUnits}",
        "frequencyActive": ${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyActive}
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.findAccrualFrequency(EXAMPLES.ACCRUAL_FREQUENCY.CODE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.CONFIGURATION_FREQUENCY,
      queryPageSize: 1,
      queryParameters: {
        frequency_code: EXAMPLES.ACCRUAL_FREQUENCY.CODE,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a mapped accrual frequency', async () => {
    // Act
    const result = await service.findAccrualFrequency(EXAMPLES.ACCRUAL_FREQUENCY.CODE);

    // Assert
    const { results } = JSON.parse(mockStoredProcedureOutput);
    const [jsonResult] = results;

    const expected = mapAccrualFrequency(jsonResult);

    expect(result).toEqual(expected);
  });

  describe('when an accrual frequency is not found', () => {
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
      const promise = service.findAccrualFrequency(EXAMPLES.ACCRUAL_FREQUENCY.CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No accrual frequency ${EXAMPLES.ACCRUAL_FREQUENCY.CODE} found in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act
      const promise = service.findAccrualFrequency(EXAMPLES.ACCRUAL_FREQUENCY.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding accrual frequency ${EXAMPLES.ACCRUAL_FREQUENCY.CODE} in ODS`,
        cause: {
          message: `Error finding accrual frequency ${EXAMPLES.ACCRUAL_FREQUENCY.CODE} from ODS stored procedure`,
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
      const promise = service.findAccrualFrequency(EXAMPLES.ACCRUAL_FREQUENCY.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding accrual frequency ${EXAMPLES.ACCRUAL_FREQUENCY.CODE} in ODS`,
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
      const promise = service.findAccrualFrequency(EXAMPLES.ACCRUAL_FREQUENCY.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding accrual frequency ${EXAMPLES.ACCRUAL_FREQUENCY.CODE} in ODS`,
        cause: mockError,
      });
    });
  });
});
