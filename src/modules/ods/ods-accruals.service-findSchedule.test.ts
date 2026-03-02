import { NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapAccrualSchedule } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsAccrualsService } from './ods-accruals.service';

describe('OdsAccrualsService - findSchedule', () => {
  let service: OdsAccrualsService;
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

    service = new OdsAccrualsService(mockDataSource, mockLogger);
  });

  const mockStoredProcedureOutput = `{
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 1,
    "results": [
      {
        "classification_type": "${EXAMPLES.ACCRUAL_SCHEDULE.TYPE}",
        "classification_type_code": "${EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE}",
        "classification_code": "${EXAMPLES.ACCRUAL_SCHEDULE.CODE}",
        "classification_description": "${EXAMPLES.ACCRUAL_SCHEDULE.DESCRIPTION}",
        "classification_numeric_value": "${EXAMPLES.ACCRUAL_SCHEDULE.NUMERIC_VALUE}",
        "classification_active_flag": "${EXAMPLES.ACCRUAL_SCHEDULE.IS_ACTIVE}"
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call service.callOdsStoredProcedure', async () => {
    // Act
    await service.findSchedule(EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
      entityToQuery: ODS_ENTITIES.ACCRUAL_SCHEDULE,
      queryPageSize: 1,
      queryParameters: {
        classification_type_code: EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE,
      },
    });

    expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a mapped accrual schedule', async () => {
    // Act
    const result = await service.findSchedule(EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE);

    // Assert
    const { results } = JSON.parse(mockStoredProcedureOutput);
    const [jsonResult] = results;

    const expected = mapAccrualSchedule(jsonResult);

    expect(result).toEqual(expected);
  });

  describe('when an accrual schedule is not found', () => {
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
      const promise = service.findSchedule(EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE} found`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findSchedule(EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE);

      const expected = new Error(`Error finding accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE}`, {
        cause: {
          message: `Error finding accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE} from ODS stored procedure`,
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
      const promise = service.findSchedule(EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE);

      const expected = new Error(`Error finding accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE}`, { cause: mockStoredProcedureOutput });

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when callOdsStoredProcedure throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockError = 'Mock ODS error';

      jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue(mockError);

      // Act & Assert
      const promise = service.findSchedule(EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE);

      const expected = new Error(`Error finding accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.TYPE_CODE}`, { cause: mockError });

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
