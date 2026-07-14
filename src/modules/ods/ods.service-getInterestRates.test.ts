import { InternalServerErrorException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapDomInterestRates } from '@ukef/helpers/map-dom-interest-rates';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - getInterestRates', () => {
  let service: OdsService;
  let odsStoredProcedureService: OdsStoredProcedureService;
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  let mockDataSource: jest.Mocked<DataSource>;
  const mockLogger = new PinoLogger({});

  const exampleInterestRate = EXAMPLES.ODS.INTEREST_RATE;

  const mockRateCode = exampleInterestRate.interest_rate_ticker_code;
  const mockStartDate = EXAMPLES.DATE_START;
  const mockEndDate = EXAMPLES.DATE_END;

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
        "interest_rate_ticker_code": "${exampleInterestRate.interest_rate_ticker_code}",
        "interest_rate_start_datetime": "${exampleInterestRate.interest_rate_start_datetime}",
        "interest_rate_end_datetime": "${exampleInterestRate.interest_rate_end_datetime}",
        "interest_rate": ${exampleInterestRate.interest_rate},
        "interest_rate_adjusted": ${exampleInterestRate.interest_rate_adjusted},
        "interest_rate_source_ticker_name": "${exampleInterestRate.interest_rate_source_ticker_name}",
        "interest_rate_source_ticker_value": "${exampleInterestRate.interest_rate_source_ticker_value}",
        "interest_rate_source": "${exampleInterestRate.interest_rate_source}"
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call with the start date when it is provided', async () => {
    // Act
    await service.getInterestRates(mockRateCode, mockEndDate, mockStartDate);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.INTEREST_RATE,
      queryParameters: {
        interest_rate_ticker_code: mockRateCode,
        interest_rate_datetime: mockEndDate,
        interest_rate_start_datetime: mockStartDate,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should call odsStoredProcedureService.call without the start date when it is not provided', async () => {
    // Act
    await service.getInterestRates(mockRateCode, mockEndDate);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.INTEREST_RATE,
      queryParameters: {
        interest_rate_ticker_code: mockRateCode,
        interest_rate_datetime: mockEndDate,
      },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped interest rates', async () => {
    // Act
    const result = await service.getInterestRates(mockRateCode, mockEndDate, mockStartDate);

    // Assert
    const jsonResults = JSON.parse(mockStoredProcedureOutput).results;

    const expected = mapDomInterestRates(jsonResults);

    expect(result).toEqual(expected);
  });

  it('should return an empty array when the stored procedure returns no results', async () => {
    // Arrange
    const noResultsOutput = `{
      "message": "${STORED_PROCEDURE.SUCCESS}",
      "status": "${STORED_PROCEDURE.SUCCESS}",
      "total_result_count": 0
    }`;

    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(noResultsOutput);

    // Act
    const result = await service.getInterestRates(mockRateCode, mockEndDate, mockStartDate);

    // Assert
    expect(result).toEqual([]);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const invalidOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(invalidOutput);

      // Act & Assert
      const promise = service.getInterestRates(mockRateCode, mockEndDate, mockStartDate);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toThrow(`Error getting interest rates for ${mockRateCode} from ODS`);
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.getInterestRates(mockRateCode, mockEndDate, mockStartDate);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toThrow(`Error getting interest rates for ${mockRateCode} from ODS`);
    });
  });
});
