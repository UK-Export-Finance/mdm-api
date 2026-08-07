import { InternalServerErrorException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { mapDomCurrencies } from '@ukef/helpers/map-dom-currencies';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

describe('OdsService - getCurrencies', () => {
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
        "currency_code": "${EXAMPLES.ODS.CURRENCIES[0].currency_code}",
        "currency_iso_code": "${EXAMPLES.ODS.CURRENCIES[0].currency_iso_code}",
        "currency_name": "${EXAMPLES.ODS.CURRENCIES[0].currency_name}",
        "currency_decimal_place": ${EXAMPLES.ODS.CURRENCIES[0].currency_decimal_place},
        "rate_setting_calendar_code": "${EXAMPLES.ODS.CURRENCIES[0].rate_setting_calendar_code}",
        "currency_active_flag": ${EXAMPLES.ODS.CURRENCIES[0].currency_active_flag}
      },
      {
        "currency_code": "${EXAMPLES.ODS.CURRENCIES[1].currency_code}",
        "currency_iso_code": "${EXAMPLES.ODS.CURRENCIES[1].currency_iso_code}",
        "currency_name": "${EXAMPLES.ODS.CURRENCIES[1].currency_name}",
        "currency_decimal_place": ${EXAMPLES.ODS.CURRENCIES[1].currency_decimal_place},
        "currency_active_flag": ${EXAMPLES.ODS.CURRENCIES[1].currency_active_flag}
      }
    ]
  }`;

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call', async () => {
    // Act
    await service.getCurrencies();

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.CURRENCY,
      queryPageSize: 100,
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return mapped currencies', async () => {
    // Act
    const result = await service.getCurrencies();

    // Assert
    const jsonResults = JSON.parse(mockStoredProcedureOutput).results;

    const expected = mapDomCurrencies(jsonResults);

    expect(result).toEqual(expected);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const invalidOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(invalidOutput);

      // Act & Assert
      const promise = service.getCurrencies();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toThrow('Error getting currencies from ODS');
    });
  });

  describe('when call throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.getCurrencies();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toThrow('Error getting currencies from ODS');
    });
  });
});
