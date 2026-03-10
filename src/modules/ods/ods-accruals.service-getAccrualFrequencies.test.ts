import { InternalServerErrorException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapAccrualFrequencies } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsAccrualsService } from './ods-accruals.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsAccrualsService - getAccrualFrequencies', () => {
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
    "total_result_count": 2,
    "results": [
      {
        "code": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.code}",
        "name": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.name}",
        "orderId": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.orderId}",
        "frequencyNumberOfUnits": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyNumberOfUnits}",
        "frequencyUnits": ${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyUnits},
        "frequencyActive": ${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyActive}
      },
      {
        "code": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.code}",
        "name": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.name}",
        "orderId": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.orderId}",
        "frequencyNumberOfUnits": "${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyNumberOfUnits}",
        "frequencyUnits": ${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyUnits},
        "frequencyActive": ${EXAMPLES.ODS.CONFIGURATION_FREQUENCY.frequencyActive}
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.getAccrualFrequencies();

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.CONFIGURATION_FREQUENCY,
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped accrual frequencies', async () => {
    // Act
    const result = await service.getAccrualFrequencies();

    // Assert
    const jsonResults = JSON.parse(mockStoredProcedureOutput).results;

    const expected = mapAccrualFrequencies(jsonResults);

    expect(result).toEqual(expected);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getAccrualFrequencies();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting Accrual frequencies from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getAccrualFrequencies();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting Accrual frequencies from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.getAccrualFrequencies();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting Accrual frequencies from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
