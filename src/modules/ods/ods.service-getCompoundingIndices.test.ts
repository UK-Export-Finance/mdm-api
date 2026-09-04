import { InternalServerErrorException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapDomCompoundingIndices } from '@ukef/helpers/map-dom-compounding-indices';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - getCompoundingIndices', () => {
  const mockRateCode = EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].code;
  const mockStartDate = EXAMPLES.DATE_START;
  const mockEndDate = EXAMPLES.DATE_END;
  const mockLogger = new PinoLogger({});
  const mockCompoundingIndex = {
    interest_rate_ticker_code: mockRateCode,
    interest_rate_start_datetime: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
    interest_rate_end_datetime: EXAMPLES.DOM.INTEREST_RATES[0].endDate,
    interest_rate_days_active: 1,
    interest_rate: EXAMPLES.DOM.INTEREST_RATES[0].rate,
    interest_compounding_index_value: EXAMPLES.DOM.INTEREST_RATES[0].compoundingIndexValue,
    interest_compounding_index_source_start_datetime: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
  };

  let service: OdsService;
  let odsStoredProcedureService: OdsStoredProcedureService;

  beforeEach(() => {
    const mockQueryRunner = { query: jest.fn(), release: jest.fn() } as unknown as jest.Mocked<QueryRunner>;
    const mockDataSource = { createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner) } as unknown as jest.Mocked<DataSource>;

    odsStoredProcedureService = new OdsStoredProcedureService(mockDataSource);
    service = new OdsService(odsStoredProcedureService, mockLogger);
  });

  const mockStoredProcedureOutput = JSON.stringify({
    message: STORED_PROCEDURE.SUCCESS,
    status: STORED_PROCEDURE.SUCCESS,
    total_result_count: 1,
    results: [mockCompoundingIndex],
  });

  it('should query compounding interest rates with the provided date range', async () => {
    // Arrange
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

    // Act
    await service.getCompoundingIndices(mockRateCode, mockEndDate, mockStartDate);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.COMPOUNDING_INTEREST_RATE,
      queryParameters: {
        interest_rate_ticker_code: mockRateCode,
        interest_rate_datetime: mockEndDate,
        interest_rate_start_datetime: mockStartDate,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenNthCalledWith(1, expectedStoredProcedureInput);
  });

  it('should query compounding interest rates without the start date when it is not provided', async () => {
    // Arrange
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

    // Act
    await service.getCompoundingIndices(mockRateCode, mockEndDate);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.COMPOUNDING_INTEREST_RATE,
      queryParameters: {
        interest_rate_ticker_code: mockRateCode,
        interest_rate_datetime: mockEndDate,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenNthCalledWith(1, expectedStoredProcedureInput);
  });

  it('should return mapped compounding indices', async () => {
    // Arrange
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

    // Act
    const result = await service.getCompoundingIndices(mockRateCode, mockEndDate, mockStartDate);

    // Assert
    const expected = [mockCompoundingIndex];

    expect(result).toEqual(mapDomCompoundingIndices(expected));
  });

  it('should return an empty array when the stored procedure returns no results', async () => {
    // Arrange
    jest
      .spyOn(odsStoredProcedureService, 'call')
      .mockResolvedValue(JSON.stringify({ message: STORED_PROCEDURE.SUCCESS, status: STORED_PROCEDURE.SUCCESS, total_result_count: 0 }));

    // Act & Assert
    await expect(service.getCompoundingIndices(mockRateCode, mockEndDate, mockStartDate)).resolves.toEqual([]);
  });

  it('should throw an internal server error when the stored procedure fails', async () => {
    // Arrange
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(JSON.stringify({ status: 'ERROR' }));

    // Act & Assert
    await expect(service.getCompoundingIndices(mockRateCode, mockEndDate, mockStartDate)).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
