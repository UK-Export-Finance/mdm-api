import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapCounterpartyRole } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsCounterpartyRoleService } from './ods-counterparty-role.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsCounterpartyRoleService - findOne', () => {
  let service: OdsCounterpartyRoleService;
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
    service = new OdsCounterpartyRoleService(odsStoredProcedureService, mockLogger);
  });

  const mockStoredProcedureOutput = `{
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 1,
    "results": [
      {
        "counterpartyRoleType": "${EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE.counterpartyRoleType}",
        "name": "${EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE.name}",
        "hasSharePercentage": ${EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE.hasSharePercentage},
        "counterpartyRoleTypeActive": ${EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE.counterpartyRoleTypeActive}
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.findOne(EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.CONFIGURATION_COUNTERPARTY_ROLE,
      queryPageSize: 1,
      queryParameters: {
        counterpartyRoleType: EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a mapped counterparty role', async () => {
    // Act
    const result = await service.findOne(EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE);

    // Assert
    const { results } = JSON.parse(mockStoredProcedureOutput);
    const [jsonResult] = results;

    const expected = mapCounterpartyRole(jsonResult);

    expect(result).toEqual(expected);
  });

  describe('when a facility category is not found', () => {
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
      const promise = service.findOne(EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No counterparty role ${EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE} found in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act
      const promise = service.findOne(EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding counterparty role ${EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE} in ODS`,
        cause: {
          message: `Error finding counterparty role ${EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE} from ODS stored procedure`,
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
      const promise = service.findOne(EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding counterparty role ${EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE} in ODS`,
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
      const promise = service.findOne(EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE);

      // Assert
      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);
      await expect(promise).rejects.toMatchObject({
        message: `Error finding counterparty role ${EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE} in ODS`,
        cause: mockError,
      });
    });
  });
});
