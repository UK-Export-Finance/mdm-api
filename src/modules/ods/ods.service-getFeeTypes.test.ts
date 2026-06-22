import { InternalServerErrorException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapFeeTypes } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - getFeeTypes', () => {
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
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 2,
    "results": [
      {
        "feeType": "${EXAMPLES.ODS.CONFIGURATION_FEE.feeType}",
        "name": "${EXAMPLES.ODS.CONFIGURATION_FEE.name}",
        "feeTypeClassification": "${EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeClassification}",
        "feeTypeExpenseIncome": "${EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeExpenseIncome}",
        "feeTypeActive": ${EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeActive},
        "balanceCategory": "${EXAMPLES.ODS.CONFIGURATION_FEE.balanceCategory}",
        "nonFacilityCurrencySettlement": ${EXAMPLES.ODS.CONFIGURATION_FEE.nonFacilityCurrencySettlement},
        "feeTypeCappedBaseBalanceIndicator": ${EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeCappedBaseBalanceIndicator}
      },
      {
        "feeType": "${EXAMPLES.ODS.CONFIGURATION_FEE.feeType}",
        "name": "${EXAMPLES.ODS.CONFIGURATION_FEE.name}",
        "feeTypeClassification": "${EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeClassification}",
        "feeTypeExpenseIncome": "${EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeExpenseIncome}",
        "feeTypeActive": ${EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeActive},
        "balanceCategory": "${EXAMPLES.ODS.CONFIGURATION_FEE.balanceCategory}",
        "baseBalanceCategory": "On Principal Drawn Amount",
        "nonFacilityCurrencySettlement": ${EXAMPLES.ODS.CONFIGURATION_FEE.nonFacilityCurrencySettlement},
        "feeTypeCappedBaseBalanceIndicator": true
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.getFeeTypes();

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.CONFIGURATION_FEE,
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped fee types', async () => {
    // Act
    const result = await service.getFeeTypes();

    // Assert
    const jsonResults = JSON.parse(mockStoredProcedureOutput).results;

    const expected = mapFeeTypes(jsonResults);

    expect(result).toEqual(expected);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const invalidOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(invalidOutput);

      // Act & Assert
      const promise = service.getFeeTypes();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting fee types from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.getFeeTypes();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting fee types from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
