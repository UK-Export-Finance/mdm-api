import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapAccrualScheduleClassification } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsAccrualsService } from './ods-accruals.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsAccrualsService - findScheduleClassification', () => {
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
        "classification_type": "${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE}",
        "classification_type_code": "${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE}",
        "classification_code": "${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.CODE}",
        "classification_description": "${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.DESCRIPTION}",
        "classification_numeric_value": ${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.NUMERIC_VALUE},
        "classification_active_flag": ${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.IS_ACTIVE}
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.findScheduleClassification(EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.ACCRUAL_SCHEDULE_CLASSIFICATION,
      queryPageSize: 1,
      queryParameters: {
        classification_code: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.CODE,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a mapped accrual schedule classification', async () => {
    // Act
    const result = await service.findScheduleClassification(EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE);

    // Assert
    const { results } = JSON.parse(mockStoredProcedureOutput);
    const [jsonResult] = results;

    const expected = mapAccrualScheduleClassification(jsonResult);

    expect(result).toEqual(expected);
  });

  describe('when an accrual schedule classification is not found', () => {
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
      const promise = service.findScheduleClassification(EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No accrual schedule classification ${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE} found`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findScheduleClassification(EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE);

      const expected = new Error(`Error finding accrual schedule classification ${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE}`, {
        cause: {
          message: `Error finding accrual schedule classification ${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE} from ODS stored procedure`,
        },
      });

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findScheduleClassification(EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE);

      const expected = new Error(`Error finding accrual schedule classification ${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE}`, {
        cause: mockStoredProcedureOutput,
      });

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockError = 'Mock ODS error';

      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue(mockError);

      // Act & Assert
      const promise = service.findScheduleClassification(EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding accrual schedule classification ${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.TYPE_CODE}`, { cause: mockError });

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
