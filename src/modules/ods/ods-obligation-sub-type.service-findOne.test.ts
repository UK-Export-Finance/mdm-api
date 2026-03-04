import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapOdsClassification } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, ODS_QUERY_PARAM_VALUES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsObligationSubTypeService } from './ods-obligation-sub-type.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsObligationSubTypeService - findOne', () => {
  let service: OdsObligationSubTypeService;
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
    service = new OdsObligationSubTypeService(odsStoredProcedureService, mockLogger);
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
    await service.findOne(EXAMPLES.OBLIGATION_SUB_TYPE.CODE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.OBLIGATION_CLASSIFICATION,
      queryPageSize: 1,
      queryParameters: {
        classification_type_code: ODS_QUERY_PARAM_VALUES.OBLIGATION_SUB_TYPE,
        classification_code: EXAMPLES.OBLIGATION_SUB_TYPE.CODE,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a mapped obligation sub-type', async () => {
    // Act
    const result = await service.findOne(EXAMPLES.OBLIGATION_SUB_TYPE.CODE);

    // Assert
    const { results } = JSON.parse(mockStoredProcedureOutput);
    const [jsonResult] = results;

    const expected = mapOdsClassification(jsonResult);

    expect(result).toEqual(expected);
  });

  describe('when an obligation sub-type is not found', () => {
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
      const promise = service.findOne(EXAMPLES.OBLIGATION_SUB_TYPE.CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No obligation sub-type ${EXAMPLES.OBLIGATION_SUB_TYPE.CODE} found in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act
      const promise = service.findOne(EXAMPLES.OBLIGATION_SUB_TYPE.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding obligation sub-type ${EXAMPLES.OBLIGATION_SUB_TYPE.CODE} in ODS`,
        cause: {
          message: `Error finding obligation sub-type ${EXAMPLES.OBLIGATION_SUB_TYPE.CODE} from ODS stored procedure`,
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
      const promise = service.findOne(EXAMPLES.OBLIGATION_SUB_TYPE.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding obligation sub-type ${EXAMPLES.OBLIGATION_SUB_TYPE.CODE} in ODS`,
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
      const promise = service.findOne(EXAMPLES.OBLIGATION_SUB_TYPE.CODE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding obligation sub-type ${EXAMPLES.OBLIGATION_SUB_TYPE.CODE} in ODS`,
        cause: mockError,
      });
    });
  });
});
