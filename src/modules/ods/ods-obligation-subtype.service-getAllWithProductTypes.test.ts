import { InternalServerErrorException } from '@nestjs/common';
import { mapObligationSubtypesWithProductCode } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { OdsObligationSubtypeService } from './ods-obligation-subtype.service';
import { OdsProductConfigService } from './ods-product-config.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';
import { mockObligationSubtypes, mockProductConfigs } from './test-helpers';

describe('OdsObligationSubtypeService - getAllWithProductTypes', () => {
  let service: OdsObligationSubtypeService;
  let odsStoredProcedureService: OdsStoredProcedureService;
  let odsProductConfigService: OdsProductConfigService;
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
    odsProductConfigService = new OdsProductConfigService(odsStoredProcedureService, mockLogger);

    service = new OdsObligationSubtypeService(odsStoredProcedureService, odsProductConfigService, mockLogger);
  });

  beforeEach(() => {
    jest.spyOn(odsProductConfigService, 'getAll').mockResolvedValue(mockProductConfigs);
    jest.spyOn(service, 'getAll').mockResolvedValue(mockObligationSubtypes);
  });

  it('should call odsProductConfigService.getAll', async () => {
    // Act
    await service.getAllWithProductTypes();

    // Assert
    expect(odsProductConfigService.getAll).toHaveBeenCalledTimes(1);
  });

  it('should call service.getAll', async () => {
    // Act
    await service.getAllWithProductTypes();

    // Assert
    expect(service.getAll).toHaveBeenCalledTimes(1);
  });

  it('should return mapped obligation subtypes with product code', async () => {
    // Act
    const result = await service.getAllWithProductTypes();

    // Assert
    const expected = mapObligationSubtypesWithProductCode({
      obligationSubtypes: mockObligationSubtypes,
      productConfigs: mockProductConfigs,
    });

    expect(result).toEqual(expected);
  });

  describe('when odsProductConfigService.getAll throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(odsProductConfigService, 'getAll').mockRejectedValue(new Error('Mock product config error'));

      // Act & Assert
      const promise = service.getAllWithProductTypes();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting obligation subtypes with product types from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when service.getAll throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(service, 'getAll').mockRejectedValue(new Error('Mock obligation subtypes error'));

      // Act & Assert
      const promise = service.getAllWithProductTypes();

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error('Error getting obligation subtypes with product types from ODS');

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
