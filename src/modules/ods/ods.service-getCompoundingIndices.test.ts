import { InternalServerErrorException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapDomCompoundingIndices } from '@ukef/helpers/map-dom-compounding-indices';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - getCompoundingIndices', () => {
  const mockRateCode = 'EUR001';
  const mockStartDate = '2026-02-09';
  const mockEndDate = '2026-02-20';
  const mockLogger = new PinoLogger({});
  const mockCompoundingIndex = {
    interest_rate_ticker_code: mockRateCode,
    interest_rate_start_datetime: '2026-02-09T00:00:00',
    interest_rate_end_datetime: '2026-02-09T23:59:59',
    interest_rate_days_active: 1,
    interest_rate: 1.93,
    interest_compounding_index_value: 10000.5361111111,
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
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

    await service.getCompoundingIndices(mockRateCode, mockEndDate, mockStartDate);

    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.COMPOUNDING_INTEREST_RATE,
      queryParameters: {
        interest_rate_ticker_code: mockRateCode,
        interest_rate_datetime: mockEndDate,
        interest_rate_start_datetime: mockStartDate,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should query compounding interest rates without the start date when it is not provided', async () => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

    await service.getCompoundingIndices(mockRateCode, mockEndDate);

    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.COMPOUNDING_INTEREST_RATE,
      queryParameters: {
        interest_rate_ticker_code: mockRateCode,
        interest_rate_datetime: mockEndDate,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped compounding indices', async () => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);

    const result = await service.getCompoundingIndices(mockRateCode, mockEndDate, mockStartDate);

    expect(result).toEqual(mapDomCompoundingIndices([mockCompoundingIndex]));
  });

  it('should return an empty array when the stored procedure returns no results', async () => {
    jest
      .spyOn(odsStoredProcedureService, 'call')
      .mockResolvedValue(JSON.stringify({ message: STORED_PROCEDURE.SUCCESS, status: STORED_PROCEDURE.SUCCESS, total_result_count: 0 }));

    await expect(service.getCompoundingIndices(mockRateCode, mockEndDate, mockStartDate)).resolves.toEqual([]);
  });

  it('should throw an internal server error when the stored procedure fails', async () => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(JSON.stringify({ status: 'ERROR' }));

    await expect(service.getCompoundingIndices(mockRateCode, mockEndDate, mockStartDate)).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
