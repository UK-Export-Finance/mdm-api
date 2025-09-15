import { DOM_BUSINESS_CENTRES, EXAMPLES } from '@ukef/constants';
import PRODUCT_CONFIG from '@ukef/helper-modules/dom/dom-product-config.json';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { OdsService } from '../ods/ods.service';
import { DomController } from './dom.controller';
import { DomService } from './dom.service';
import { FindMultipleDomBusinessCentresNonWorkingDaysResponse, FindMultipleProductConfigsResponse } from './dto';

const mockError = new Error('An error occurred');

const mockMultipleBusinessCentreNonWorkingDays: FindMultipleDomBusinessCentresNonWorkingDaysResponse = {
  [DOM_BUSINESS_CENTRES.AE_DXB.CODE]: EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS,
  [DOM_BUSINESS_CENTRES.CM_YAO.CODE]: EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS,
};

const [mockFindProductConfiguration] = PRODUCT_CONFIG;

const mockMultipleProductConfigurations: FindMultipleProductConfigsResponse = {
  [PRODUCT_CONFIG[1].productType]: PRODUCT_CONFIG[1],
  [PRODUCT_CONFIG[2].productType]: PRODUCT_CONFIG[2],
};

const mockProductTypesString = `${EXAMPLES.PRODUCT_TYPES.BIP},${EXAMPLES.PRODUCT_TYPES.EXIP}`;

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
  let domServiceFindProductConfiguration: jest.Mock;
  let domServiceFindMultipleBusinessCentresNonWorkingDays: jest.Mock;
  let domServiceGetProductConfigurations: jest.Mock;
  let domServiceFindMultipleProductConfigurations: jest.Mock;

  let controller: DomController;

  beforeEach(() => {
    domServiceFindBusinessCentre = jest.fn().mockReturnValueOnce(DOM_BUSINESS_CENTRES.AE_DXB);
    domService.findBusinessCentre = domServiceFindBusinessCentre;

    domServiceFindBusinessCentreNonWorkingDays = jest.fn().mockResolvedValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS);
    domService.findBusinessCentreNonWorkingDays = domServiceFindBusinessCentreNonWorkingDays;

    domServiceGetBusinessCentres = jest.fn().mockReturnValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES);
    domService.getBusinessCentres = domServiceGetBusinessCentres;

    domServiceFindMultipleBusinessCentresNonWorkingDays = jest.fn().mockResolvedValueOnce(mockMultipleBusinessCentreNonWorkingDays);
    domService.findMultipleBusinessCentresNonWorkingDays = domServiceFindMultipleBusinessCentresNonWorkingDays;

    domServiceFindProductConfiguration = jest.fn().mockReturnValueOnce(mockFindProductConfiguration);
    domService.findProductConfiguration = domServiceFindProductConfiguration;

    domServiceGetProductConfigurations = jest.fn().mockReturnValueOnce(PRODUCT_CONFIG);
    domService.getProductConfigurations = domServiceGetProductConfigurations;

    domServiceFindMultipleProductConfigurations = jest.fn().mockReturnValueOnce(mockMultipleProductConfigurations);
    domService.findMultipleProductConfigurations = domServiceFindMultipleProductConfigurations;

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
      expect(result).toEqual(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS);
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

  describe('findProductConfiguration', () => {
    const mockProductType = EXAMPLES.PRODUCT_TYPES.BIP;

    it('should call domService.findProductConfiguration', () => {
      // Act
      controller.findProductConfiguration({ productType: mockProductType });

      // Assert
      expect(domServiceFindProductConfiguration).toHaveBeenCalledTimes(1);
      expect(domServiceFindProductConfiguration).toHaveBeenCalledWith(mockProductType);
    });

    it('should return the result of domService.findProductConfiguration', () => {
      // Act
      const result = controller.findProductConfiguration({ productType: mockProductType });

      // Assert
      expect(result).toEqual(mockFindProductConfiguration);
    });
  });

  describe('getProductConfigurations', () => {
    it('should call domService.getProductConfigurations', () => {
      // Act
      controller.getProductConfigurations();

      // Assert
      expect(domServiceGetProductConfigurations).toHaveBeenCalledTimes(1);
    });

    it('should return product configurations', () => {
      // Act
      const result = controller.getProductConfigurations();

      // Assert
      expect(result).toStrictEqual(PRODUCT_CONFIG);
    });
  });

  describe('findMultipleProductConfigurations', () => {
    it('should call domService.findMultipleProductConfigurations', () => {
      // Act
      controller.findMultipleProductConfigurations({ productTypes: mockProductTypesString });

      // Assert
      expect(domServiceFindMultipleProductConfigurations).toHaveBeenCalledTimes(1);
      expect(domServiceFindMultipleProductConfigurations).toHaveBeenCalledWith(mockProductTypesString);
    });

    it('should return product configurations', () => {
      // Act
      const result = controller.findMultipleProductConfigurations({ productTypes: mockProductTypesString });

      // Assert
      expect(result).toStrictEqual(mockMultipleProductConfigurations);
    });
  });
});
