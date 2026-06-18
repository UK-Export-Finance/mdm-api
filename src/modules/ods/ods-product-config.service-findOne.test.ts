import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsProductConfigService } from './ods-product-config.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';
import { mockProductConfigs } from './test-helpers';

describe('OdsProductConfigService - findOne', () => {
  let service: OdsProductConfigService;
  let odsStoredProcedureService: OdsStoredProcedureService;
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  let mockDataSource: jest.Mocked<DataSource>;
  const mockLogger = new PinoLogger({});

  const [mockProductConfig] = mockProductConfigs;
  const mockProductType = mockProductConfig.productType;

  beforeEach(() => {
    mockQueryRunner = {
      query: jest.fn(),
      release: jest.fn(),
    } as unknown as jest.Mocked<QueryRunner>;

    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
    } as unknown as jest.Mocked<DataSource>;

    odsStoredProcedureService = new OdsStoredProcedureService(mockDataSource);
    service = new OdsProductConfigService(odsStoredProcedureService, mockLogger);
  });

  const mockStoredProcedureOutput = JSON.stringify({
    message: STORED_PROCEDURE.SUCCESS,
    status: STORED_PROCEDURE.SUCCESS,
    total_result_count: 1,
    results: [mockProductConfig],
  });

  beforeEach(() => {
    jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockStoredProcedureOutput);
  });

  it('should call odsStoredProcedureService.call with the correct input', async () => {
    // Act
    await service.findOne(mockProductType);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = odsStoredProcedureService.createInput({
      entityToQuery: ODS_ENTITIES.CONFIGURATION_PRODUCT,
      queryPageSize: 1,
      queryParameters: { productType: mockProductType },
    });

    expect(odsStoredProcedureService.call).toHaveBeenCalledTimes(1);
    expect(odsStoredProcedureService.call).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return the product config', async () => {
    // Act
    const result = await service.findOne(mockProductType);

    // Assert
    expect(result).toEqual(mockProductConfig);
  });

  describe(`when the response from ODS has total_result_count of 0`, () => {
    it('should throw a NotFoundException', async () => {
      // Arrange
      const emptyOutput = JSON.stringify({
        message: STORED_PROCEDURE.SUCCESS,
        status: STORED_PROCEDURE.SUCCESS,
        total_result_count: 0,
        results: [],
      });

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(emptyOutput);

      // Act & Assert
      const promise = service.findOne(mockProductType);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No product config ${mockProductType} found in ODS`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an InternalServerErrorException', async () => {
      // Arrange
      const mockFailedOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(odsStoredProcedureService, 'call').mockResolvedValue(mockFailedOutput);

      // Act & Assert
      const promise = service.findOne(mockProductType);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding product config ${mockProductType} in ODS`,
        cause: {
          message: `Error finding product config ${mockProductType} from ODS stored procedure`,
        },
      });
    });
  });

  describe('when call throws an error', () => {
    it('should throw an InternalServerErrorException', async () => {
      // Arrange
      const mockError = 'Mock ODS error';

      jest.spyOn(odsStoredProcedureService, 'call').mockRejectedValue(mockError);

      // Act & Assert
      const promise = service.findOne(mockProductType);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      await expect(promise).rejects.toMatchObject({
        message: `Error finding product config ${mockProductType} in ODS`,
        cause: mockError,
      });
    });
  });
});
