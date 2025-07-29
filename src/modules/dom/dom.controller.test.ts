import { DOM_BUSINESS_CENTRES, EXAMPLES } from '@ukef/constants';
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

  let domServiceFindBusinessCentre: jest.Mock;
  let domServiceGetBusinessCentres: jest.Mock;
  let domServiceGetProductConfigurations: jest.Mock;

  let controller: DomController;

  beforeEach(() => {
    domServiceFindBusinessCentre = jest.fn().mockResolvedValueOnce(DOM_BUSINESS_CENTRES.AE_DXB);
    domService.findBusinessCentre = domServiceFindBusinessCentre;

    domServiceGetBusinessCentres = jest.fn();
    domService.getBusinessCentres = domServiceGetBusinessCentres;

    domServiceGetProductConfigurations = jest.fn();
    domService.getProductConfigurations = domServiceGetProductConfigurations;

    controller = new DomController(domService);
  });

  describe('findBusinessCentre', () => {
    it('should call domService.findBusinessCentre', async () => {
      // Act
      await controller.findBusinessCentre({ centreCode: DOM_BUSINESS_CENTRES.CM_YAO.CODE });

      // Assert
      expect(domServiceFindBusinessCentre).toHaveBeenCalledTimes(1);
    });

    it('should return the result of domService.findBusinessCentre', async () => {
      // Arrange
      domService.findBusinessCentre = jest.fn().mockResolvedValueOnce(DOM_BUSINESS_CENTRES.AE_DXB);

      controller = new DomController(domService);

      // Act
      const result = await controller.findBusinessCentre({ centreCode: DOM_BUSINESS_CENTRES.CM_YAO.CODE });

      // Assert
      expect(result).toEqual(DOM_BUSINESS_CENTRES.AE_DXB);
    });
  });

  describe('getBusinessCentres', () => {
    it('should call domService.getBusinessCentres', () => {
      // Act
      controller.getBusinessCentres();

      // Assert
      expect(domServiceGetBusinessCentres).toHaveBeenCalledTimes(1);
    });

    it('should return product configurations', () => {
      // Arrange
      domService.getBusinessCentres = jest.fn().mockReturnValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES);

      controller = new DomController(domService);

      // Act
      const result = controller.getBusinessCentres();

      // Assert
      expect(result).toEqual(EXAMPLES.DOM.BUSINESS_CENTRES);
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
      domService.getProductConfigurations = jest.fn().mockResolvedValueOnce(EXAMPLES.DOM.PRODUCT_CONFIGURATIONS);

      controller = new DomController(domService);

      // Act
      const result = await controller.getProductConfigurations();

      // Assert
      expect(result).toEqual(EXAMPLES.DOM.PRODUCT_CONFIGURATIONS);
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
