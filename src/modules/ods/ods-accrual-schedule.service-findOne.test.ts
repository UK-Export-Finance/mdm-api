import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapAccrualSchedule } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsAccrualScheduleService } from './ods-accrual-schedule.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsAccrualScheduleService - findOne', () => {
  let service: OdsAccrualScheduleService;
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
    service = new OdsAccrualScheduleService(odsStoredProcedureService, mockLogger);
  });

  const mockStoredProcedureOutput = `{
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 1,
    "results": [
      {
        "code": "${EXAMPLES.ODS.ACCRUAL_SCHEDULE.code}",
        "name": "${EXAMPLES.ODS.ACCRUAL_SCHEDULE.name}",
        "accrualRateType": "${EXAMPLES.ODS.ACCRUAL_SCHEDULE.accrualRateType}",
        "baseBalanceCategory": "${EXAMPLES.ODS.ACCRUAL_SCHEDULE.baseBalanceCategory}",
        "incomeClassCode": "${EXAMPLES.ODS.ACCRUAL_SCHEDULE.incomeClassCode}",
        "accrualScheduleTypeActive": ${EXAMPLES.ODS.ACCRUAL_SCHEDULE.accrualScheduleTypeActive}
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.findOne(EXAMPLES.ODS.ACCRUAL_SCHEDULE.code);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.CONFIGURATION_ACCRUAL_SCHEDULE,
      queryPageSize: 1,
      queryParameters: {
        code: EXAMPLES.ODS.ACCRUAL_SCHEDULE.code,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return an accrual schedule', async () => {
    // Act
    const result = await service.findOne(EXAMPLES.ACCRUAL_SCHEDULE.CODE);

    // Assert
    const expected = mapAccrualSchedule(EXAMPLES.ODS.ACCRUAL_SCHEDULE);

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

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findOne(EXAMPLES.ACCRUAL_SCHEDULE.CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.CODE} found in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act
      const promise = service.findOne(EXAMPLES.ACCRUAL_SCHEDULE.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.CODE} in ODS`,
        cause: {
          message: `Error finding accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.CODE} from ODS stored procedure`,
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
      const promise = service.findOne(EXAMPLES.ACCRUAL_SCHEDULE.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.CODE} in ODS`,
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
      const promise = service.findOne(EXAMPLES.ACCRUAL_SCHEDULE.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding accrual schedule ${EXAMPLES.ACCRUAL_SCHEDULE.CODE} in ODS`,
        cause: mockError,
      });
    });
  });
});
