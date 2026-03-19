import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapOdsClassification } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, ODS_QUERY_PARAM_VALUES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsObligationSubtypeService } from './ods-obligation-subtype.service';
import { OdsProductConfigService } from './ods-product-config.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsObligationSubtypeService - findOne', () => {
  let service: OdsObligationSubtypeService;
  let odsStoredProcedureService: OdsStoredProcedureService;
  let odsProductConfigService: OdsProductConfigService;
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
    odsProductConfigService = new OdsProductConfigService(odsStoredProcedureService, mockLogger);

    service = new OdsObligationSubtypeService(odsStoredProcedureService, odsProductConfigService, mockLogger);
  });

  const mockStoredProcedureOutput = `{
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 1,
    "results": [
      {
        "classification_type": "${EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_type}",
        "classification_type_code": "${EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_type_code}",
        "classification_code": "${EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_code}",
        "classification_description": "${EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_description}",
        "classification_active_flag": ${EXAMPLES.ODS.OBLIGATION_CLASSIFICATION.classification_active_flag}
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.findOne(EXAMPLES.OBLIGATION_SUBTYPE.CODE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.OBLIGATION_CLASSIFICATION,
      queryPageSize: 1,
      queryParameters: {
        classification_type_code: ODS_QUERY_PARAM_VALUES.OBLIGATION_SUBTYPE,
        classification_code: EXAMPLES.OBLIGATION_SUBTYPE.CODE,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a mapped obligation subtype', async () => {
    // Act
    const result = await service.findOne(EXAMPLES.OBLIGATION_SUBTYPE.CODE);

    // Assert
    const { results } = JSON.parse(mockStoredProcedureOutput);
    const [jsonResult] = results;

    const expected = mapOdsClassification(jsonResult);

    expect(result).toEqual(expected);
  });

  describe('when an obligation subtype is not found', () => {
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
      const promise = service.findOne(EXAMPLES.OBLIGATION_SUBTYPE.CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No obligation subtype ${EXAMPLES.OBLIGATION_SUBTYPE.CODE} found in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act
      const promise = service.findOne(EXAMPLES.OBLIGATION_SUBTYPE.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding obligation subtype ${EXAMPLES.OBLIGATION_SUBTYPE.CODE} in ODS`,
        cause: {
          message: `Error finding obligation subtype ${EXAMPLES.OBLIGATION_SUBTYPE.CODE} from ODS stored procedure`,
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
      const promise = service.findOne(EXAMPLES.OBLIGATION_SUBTYPE.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding obligation subtype ${EXAMPLES.OBLIGATION_SUBTYPE.CODE} in ODS`,
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
      const promise = service.findOne(EXAMPLES.OBLIGATION_SUBTYPE.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding obligation subtype ${EXAMPLES.OBLIGATION_SUBTYPE.CODE} in ODS`,
        cause: mockError,
      });
    });
  });
});
