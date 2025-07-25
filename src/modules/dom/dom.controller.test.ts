import { MOCK_DOM_BUSINESS_CENTRES, MOCK_PRODUCT_CONFIGURATIONS } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { OdsService } from '../ods/ods.service';
import { DomController } from './dom.controller';
import { DomService } from './dom.service';

const mockError = new Error('An error occurred');

describe('DomController', () => {
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  const mockLogger = new PinoLogger({});

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  } as unknown as jest.Mocked<DataSource>;

  const odsService = new OdsService(mockDataSource, mockLogger);
  const domService = new DomService(odsService, mockLogger);

  let domServiceGetProductConfigurations: jest.Mock;
  let domServiceGetBusinessCentres: jest.Mock;

  let controller: DomController;

  beforeEach(() => {
    domServiceGetProductConfigurations = jest.fn();
    domService.getProductConfigurations = domServiceGetProductConfigurations;

    domServiceGetBusinessCentres = jest.fn();
    domService.getBusinessCentres = domServiceGetBusinessCentres;

    controller = new DomController(domService);
  });

  describe('getBusinessCentres', () => {
    it('should call domService.getBusinessCentres', async () => {
      // Act
      await controller.getBusinessCentres();

      // Assert
      expect(domServiceGetBusinessCentres).toHaveBeenCalledTimes(1);
    });

    it('should return product configurations', async () => {
      // Arrange
      domService.getBusinessCentres = jest.fn().mockResolvedValueOnce(MOCK_DOM_BUSINESS_CENTRES);

      controller = new DomController(domService);

      // Act
      const result = await controller.getBusinessCentres();

      // Assert
      expect(result).toEqual(MOCK_DOM_BUSINESS_CENTRES);
    });

    describe('when domService.getBusinessCentres throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const domService = new DomService(odsService, mockLogger);

        domService.getBusinessCentres = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService);

        // Act & Assert
        const promise = controller.getBusinessCentres();

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getProductConfigurations', () => {
    it('should call domService.getProductConfigurations', async () => {
      // Act
      await controller.getProductConfigurations();

      // Assert
      expect(domServiceGetProductConfigurations).toHaveBeenCalledTimes(1);
    });

    it('should return product configurations', async () => {
      // Arrange
      domService.getProductConfigurations = jest.fn().mockResolvedValueOnce(MOCK_PRODUCT_CONFIGURATIONS);

      controller = new DomController(domService);

      // Act
      const result = await controller.getProductConfigurations();

      // Assert
      expect(result).toEqual(MOCK_PRODUCT_CONFIGURATIONS);
    });

    describe('when domService.getProductConfigurations throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const domService = new DomService(odsService, mockLogger);

        domService.getProductConfigurations = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService);

        // Act & Assert
        const promise = controller.getProductConfigurations();

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
