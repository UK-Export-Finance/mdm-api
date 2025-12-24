import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';

describe('OdsService - findBusinessCentreNonWorkingDays', () => {
  let service: OdsService;
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

    service = new OdsService(mockDataSource, mockLogger);
  });

  const mockStoredProcedureOutput = `{
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
    "total_result_count": 2,
    "results": [
      {
        "business_centre_code": "${EXAMPLES.BUSINESS_CENTRE.CODE}",
        "non_working_day_name": "${EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME}",
        "non_working_day_date": "${EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME}"
      },
      {
        "business_centre_code": "${EXAMPLES.BUSINESS_CENTRE.CODE}",
        "non_working_day_name": "${EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME}",
        "non_working_day_date": "${EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME}"
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call service.callOdsStoredProcedure', async () => {
    // Act
    await service.findBusinessCentreNonWorkingDays(EXAMPLES.BUSINESS_CENTRE.CODE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
      entityToQuery: ODS_ENTITIES.BUSINESS_CENTRE_NON_WORKING_DAY,
      queryParameters: {
        business_centre_code: EXAMPLES.BUSINESS_CENTRE.CODE,
      },
    });

    expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped non working days', async () => {
    // Act
    const result = await service.findBusinessCentreNonWorkingDays(EXAMPLES.BUSINESS_CENTRE.CODE);

    // Assert
    const expected = JSON.parse(mockStoredProcedureOutput).results;

    expect(result).toEqual(expected);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findBusinessCentreNonWorkingDays(EXAMPLES.BUSINESS_CENTRE.CODE);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error getting business centre ${EXAMPLES.BUSINESS_CENTRE.CODE} non working days`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the response from ODS has total_result_count as 0', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "${STORED_PROCEDURE.SUCCESS}", "total_result_count": 0 }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      const expected = new Error(`No business centre ${EXAMPLES.BUSINESS_CENTRE.CODE} non working days found`);

      // Act & Assert
      const promise = service.findBusinessCentreNonWorkingDays(EXAMPLES.BUSINESS_CENTRE.CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findBusinessCentreNonWorkingDays(EXAMPLES.BUSINESS_CENTRE.CODE);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error getting business centre ${EXAMPLES.BUSINESS_CENTRE.CODE} non working days`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when callOdsStoredProcedure throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.findBusinessCentreNonWorkingDays(EXAMPLES.BUSINESS_CENTRE.CODE);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error getting business centre ${EXAMPLES.BUSINESS_CENTRE.CODE} non working days`);

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
