import { DOM_BUSINESS_CENTRES, EXAMPLES } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { OdsService } from '../ods/ods.service';
import { DomController } from './dom.controller';
import { DomService } from './dom.service';

const mockError = new Error('An error occurred');

const mockBusinessCentreNonWorkingDays = [
  {
    centre: EXAMPLES.BUSINESS_CENTRE.CODE,
    date: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
    name: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME,
  },
  {
    centre: EXAMPLES.BUSINESS_CENTRE.CODE,
    date: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
    name: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME,
  },
];

describe('DomController', () => {
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  const mockLogger = new PinoLogger({});

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  } as unknown as jest.Mocked<DataSource>;

  const odsService = new OdsService(mockDataSource, mockLogger);
  const domService = new DomService(odsService, mockLogger);

  let domServiceFindBusinessCentre: jest.Mock;
  let domServiceFindBusinessCentreNonWorkingDays: jest.Mock;
  let domServiceGetBusinessCentres: jest.Mock;
  let domServiceGetProductConfigurations: jest.Mock;

  let controller: DomController;

  beforeEach(() => {
    domServiceFindBusinessCentre = jest.fn().mockReturnValueOnce(DOM_BUSINESS_CENTRES.AE_DXB);
    domService.findBusinessCentre = domServiceFindBusinessCentre;

    domServiceFindBusinessCentreNonWorkingDays = jest.fn().mockResolvedValueOnce(mockBusinessCentreNonWorkingDays);
    domService.findBusinessCentreNonWorkingDays = domServiceFindBusinessCentreNonWorkingDays;

    domServiceGetBusinessCentres = jest.fn().mockReturnValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES);
    domService.getBusinessCentres = domServiceGetBusinessCentres;

    domServiceGetProductConfigurations = jest.fn().mockResolvedValueOnce(EXAMPLES.DOM.PRODUCT_CONFIGURATIONS);
    domService.getProductConfigurations = domServiceGetProductConfigurations;

    controller = new DomController(domService);
  });

  describe('findBusinessCentre', () => {
    it('should call domService.findBusinessCentre', () => {
      // Act
      controller.findBusinessCentre({ centreCode: DOM_BUSINESS_CENTRES.CM_YAO.CODE });

      // Assert
      expect(domServiceFindBusinessCentre).toHaveBeenCalledTimes(1);
    });

    it('should return the result of domService.findBusinessCentre', () => {
      // Act
      const result = controller.findBusinessCentre({ centreCode: DOM_BUSINESS_CENTRES.CM_YAO.CODE });

      // Assert
      expect(result).toEqual(DOM_BUSINESS_CENTRES.AE_DXB);
    });
  });

  describe('findBusinessCentreNonWorkingDays', () => {
    it('should call domService.findBusinessCentreNonWorkingDays', async () => {
      // Act
      await controller.findBusinessCentreNonWorkingDays({ centreCode: DOM_BUSINESS_CENTRES.CM_YAO.CODE });

      // Assert
      expect(domServiceFindBusinessCentreNonWorkingDays).toHaveBeenCalledTimes(1);
    });

    it('should return the result of domService.findBusinessCentreNonWorkingDays', async () => {
      // Act
      const result = await controller.findBusinessCentreNonWorkingDays({ centreCode: DOM_BUSINESS_CENTRES.CM_YAO.CODE });

      // Assert
      expect(result).toEqual(mockBusinessCentreNonWorkingDays);
    });

    describe('when domService.findBusinessCentreNonWorkingDays throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const domService = new DomService(odsService, mockLogger);

        domService.findBusinessCentreNonWorkingDays = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService);

        // Act & Assert
        const promise = controller.findBusinessCentreNonWorkingDays({ centreCode: DOM_BUSINESS_CENTRES.CM_YAO.CODE });

        await expect(promise).rejects.toThrow(mockError);
      });
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
