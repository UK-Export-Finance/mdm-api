import { InternalServerErrorException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - getBusinessCentres', () => {
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
        "business_centre_code": "${EXAMPLES.BUSINESS_CENTRE.CODE}",
        "business_centre_name": "${EXAMPLES.BUSINESS_CENTRE.NAME}",
        "business_centre_type_description": "${EXAMPLES.BUSINESS_CENTRE.DESCRIPTION}",
        "business_centre_active_flag": ${EXAMPLES.BUSINESS_CENTRE.IS_ACTIVE}
      },
      {
        "business_centre_code": "${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE}",
        "business_centre_name": "${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.NAME}",
        "business_centre_type_description": "${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.DESCRIPTION}",
        "business_centre_active_flag": ${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.IS_ACTIVE}
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.getBusinessCentres();

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.BUSINESS_CENTRE,
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped business centres', async () => {
    // Act
    const result = await service.getBusinessCentres();

    // Assert
    const jsonResults = JSON.parse(mockStoredProcedureOutput).results;

    const expected = mapBusinessCentres(jsonResults);

    expect(result).toEqual(expected);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getBusinessCentres();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error getting business centres from ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.getBusinessCentres();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting business centres from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.getBusinessCentres();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting business centres from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
