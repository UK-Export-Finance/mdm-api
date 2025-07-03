import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BUSINESS_CENTRE } from '@ukef/constants';
import { mapBusinessCentreNonWorkingDays } from '@ukef/helpers';
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
    "message": "SUCCESS",
    "status": "SUCCESS",
    "total_result_count": 2,
    "results": [
      {
        "business_centre_code": "${BUSINESS_CENTRE.EXAMPLES.CODE}",
        "non_working_day_name": "${BUSINESS_CENTRE.EXAMPLES.NON_WORKING_DAY.NAME}",
        "non_working_day_date": "${BUSINESS_CENTRE.EXAMPLES.NON_WORKING_DAY.NAME}"
      },
      {
        "business_centre_code": "${BUSINESS_CENTRE.EXAMPLES.CODE}",
        "non_working_day_name": "${BUSINESS_CENTRE.EXAMPLES.NON_WORKING_DAY.NAME}",
        "non_working_day_date": "${BUSINESS_CENTRE.EXAMPLES.NON_WORKING_DAY.NAME}"
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call service.callOdsStoredProcedure', async () => {
    // Act
    await service.findBusinessCentreNonWorkingDays(BUSINESS_CENTRE.EXAMPLES.CODE);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
      entityToQuery: ODS_ENTITIES.BUSINESS_CENTRE_NON_WORKING_DAY,
      queryParameters: {
        business_centre_code: BUSINESS_CENTRE.EXAMPLES.CODE,
      },
    });

    expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped non working days', async () => {
    // Act
    const result = await service.findBusinessCentreNonWorkingDays(BUSINESS_CENTRE.EXAMPLES.CODE);

    // Assert
    const expected = mapBusinessCentreNonWorkingDays(JSON.parse(mockStoredProcedureOutput).results);

    expect(result).toEqual(expected);
  });

  describe('when the response from ODS does not have status as SUCCESS', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT SUCCESS" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findBusinessCentreNonWorkingDays(BUSINESS_CENTRE.EXAMPLES.CODE);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting business centre non working days');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the response from ODS has total_result_count as 0', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "SUCCESS", "total_result_count": 0 }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      const expected = new Error('No business centre non working days found');

      // Act & Assert
      const promise = service.findBusinessCentreNonWorkingDays(BUSINESS_CENTRE.EXAMPLES.CODE);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "SUCCESS" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findBusinessCentreNonWorkingDays(BUSINESS_CENTRE.EXAMPLES.CODE);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting business centre non working days');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when callOdsStoredProcedure throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.findBusinessCentreNonWorkingDays(BUSINESS_CENTRE.EXAMPLES.CODE);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting business centre non working days');

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
