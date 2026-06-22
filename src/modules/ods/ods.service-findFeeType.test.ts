import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapFeeType } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - findFeeType', () => {
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
    "total_result_count": 1,
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
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.findFeeType(EXAMPLES.FEE_TYPE.FEE_TYPE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.CONFIGURATION_FEE,
      queryPageSize: 1,
      queryParameters: {
        feeType: EXAMPLES.FEE_TYPE.FEE_TYPE,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a mapped fee type', async () => {
    // Act
    const result = await service.findFeeType(EXAMPLES.FEE_TYPE.FEE_TYPE);

    // Assert
    const { results } = JSON.parse(mockStoredProcedureOutput);
    const [jsonResult] = results;

    const expected = mapFeeType(jsonResult);

    expect(result).toEqual(expected);
  });

  describe('when a fee type is not found', () => {
    it('should throw an error', async () => {
      // Arrange
      const notFoundOutput = `{
        "message": "${STORED_PROCEDURE.SUCCESS}",
        "status": "${STORED_PROCEDURE.SUCCESS}",
        "total_result_count": 0,
        "results": []
      }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(notFoundOutput);

      // Act & Assert
      const promise = service.findFeeType(EXAMPLES.FEE_TYPE.FEE_TYPE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No fee type ${EXAMPLES.FEE_TYPE.FEE_TYPE} found in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const invalidOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(invalidOutput);

      // Act
      const promise = service.findFeeType(EXAMPLES.FEE_TYPE.FEE_TYPE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding fee type ${EXAMPLES.FEE_TYPE.FEE_TYPE} in ODS`,
        cause: {
          message: `Error finding fee type ${EXAMPLES.FEE_TYPE.FEE_TYPE} from ODS stored procedure`,
        },
      });
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockError = 'Mock ODS error';

      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue(mockError);

      // Act
      const promise = service.findFeeType(EXAMPLES.FEE_TYPE.FEE_TYPE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding fee type ${EXAMPLES.FEE_TYPE.FEE_TYPE} in ODS`,
        cause: mockError,
      });
    });
  });
});
