import { EXAMPLES } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { OdsService } from '../ods/ods.service';
import { OdsProductConfigService } from '../ods/ods-product-config.service';
import { OdsStoredProcedureService } from '../ods/ods-stored-procedure.service';
import { CreditRiskRatingsService } from './credit-risk-ratings/credit-risk-ratings.service';
import { DomController } from './dom.controller';
import { DomService } from './dom.service';
import { FindMultipleOdsBusinessCentreOdsResponsesNonWorkingDaysResponse, FindMultipleProductConfigsResponse } from './dto';

const mockError = new Error('An error occurred');

const mockMultipleBusinessCentreNonWorkingDays: FindMultipleOdsBusinessCentreOdsResponsesNonWorkingDaysResponse = {
  [EXAMPLES.BUSINESS_CENTRE.CODE]: EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS,
  [EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE]: EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS,
};

const mockFindProductConfiguration = EXAMPLES.DOM.PRODUCT_CONFIG.BIP;

const mockMultipleProductConfigurations: FindMultipleProductConfigsResponse = {
  [EXAMPLES.PRODUCT_TYPES.BIP]: EXAMPLES.DOM.PRODUCT_CONFIG.BIP,
  [EXAMPLES.PRODUCT_TYPES.EXIP]: EXAMPLES.DOM.PRODUCT_CONFIG.EXIP,
};

const mockProductTypesString = `${EXAMPLES.PRODUCT_TYPES.BIP},${EXAMPLES.PRODUCT_TYPES.EXIP}`;

describe('DomController', () => {
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  const mockLogger = new PinoLogger({});

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  } as unknown as jest.Mocked<DataSource>;

  const creditRiskRatingsService = new CreditRiskRatingsService(null, mockLogger);
  const odsStoredProcedureService = new OdsStoredProcedureService(mockDataSource);
  const odsService = new OdsService(odsStoredProcedureService, mockLogger);
  const odsProductConfigService = new OdsProductConfigService(odsStoredProcedureService, mockLogger);
  const domService = new DomService(odsService, odsProductConfigService, mockLogger);

  let creditRiskRatingsServiceGetAll: jest.Mock;
  let odsServiceFindBusinessCentre: jest.Mock;
  let domServiceFindBusinessCentreNonWorkingDays: jest.Mock;
  let odsServiceGetBusinessCentres: jest.Mock;
  let odsServiceGetInterestRateTickers: jest.Mock;
  let domServiceFindProductConfiguration: jest.Mock;
  let domServiceFindMultipleBusinessCentresNonWorkingDays: jest.Mock;
  let domServiceGetProductConfigurations: jest.Mock;
  let domServiceFindMultipleProductConfigurations: jest.Mock;
  let domServiceGetInterestRates: jest.Mock;

  let controller: DomController;

  beforeEach(() => {
    creditRiskRatingsServiceGetAll = jest.fn().mockReturnValueOnce(EXAMPLES.CREDIT_RISK_RATINGS);
    creditRiskRatingsService.getAll = creditRiskRatingsServiceGetAll;

    odsServiceFindBusinessCentre = jest.fn().mockResolvedValueOnce(EXAMPLES.BUSINESS_CENTRE);
    odsService.findBusinessCentre = odsServiceFindBusinessCentre;

    domServiceFindBusinessCentreNonWorkingDays = jest.fn().mockResolvedValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS);
    domService.findBusinessCentreNonWorkingDays = domServiceFindBusinessCentreNonWorkingDays;

    odsServiceGetBusinessCentres = jest.fn().mockResolvedValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES);
    odsService.getBusinessCentres = odsServiceGetBusinessCentres;

    odsServiceGetInterestRateTickers = jest.fn().mockResolvedValueOnce(EXAMPLES.DOM.INTEREST_RATE_TICKERS);
    odsService.getInterestRateTickers = odsServiceGetInterestRateTickers;

    domServiceFindMultipleBusinessCentresNonWorkingDays = jest.fn().mockResolvedValueOnce(mockMultipleBusinessCentreNonWorkingDays);
    domService.findMultipleBusinessCentresNonWorkingDays = domServiceFindMultipleBusinessCentresNonWorkingDays;

    domServiceFindProductConfiguration = jest.fn().mockResolvedValueOnce(mockFindProductConfiguration);
    domService.findProductConfiguration = domServiceFindProductConfiguration;

    domServiceGetProductConfigurations = jest.fn().mockResolvedValueOnce([EXAMPLES.DOM.PRODUCT_CONFIG.BIP, EXAMPLES.DOM.PRODUCT_CONFIG.EXIP]);
    domService.getProductConfigurations = domServiceGetProductConfigurations;

    domServiceFindMultipleProductConfigurations = jest.fn().mockReturnValueOnce(mockMultipleProductConfigurations);
    domService.findMultipleProductConfigurations = domServiceFindMultipleProductConfigurations;

    domServiceGetInterestRates = jest.fn().mockResolvedValueOnce(EXAMPLES.DOM.INTEREST_RATES);
    domService.getInterestRates = domServiceGetInterestRates;

    controller = new DomController(domService, odsService, creditRiskRatingsService);
  });

  describe('findBusinessCentre', () => {
    it('should call domService.findBusinessCentre', async () => {
      // Act
      await controller.findBusinessCentre({ centreCode: EXAMPLES.BUSINESS_CENTRE.CODE });

      // Assert
      expect(odsServiceFindBusinessCentre).toHaveBeenCalledTimes(1);
    });

    it('should return the result of domService.findBusinessCentre', async () => {
      // Act
      const result = await controller.findBusinessCentre({ centreCode: EXAMPLES.BUSINESS_CENTRE.CODE });

      // Assert
      expect(result).toEqual(EXAMPLES.BUSINESS_CENTRE);
    });

    describe('when odsService.findBusinessCentre throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const domService = new DomService(odsService, odsProductConfigService, mockLogger);

        odsService.findBusinessCentre = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService, odsService, creditRiskRatingsService);

        // Act & Assert
        const promise = controller.findBusinessCentre({ centreCode: EXAMPLES.BUSINESS_CENTRE.CODE });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('findBusinessCentreNonWorkingDays', () => {
    it('should call domService.findBusinessCentreNonWorkingDays', async () => {
      // Arrange
      const mockParam = {
        centreCode: EXAMPLES.BUSINESS_CENTRE.CODE,
      };

      const mockQuery = {
        startDate: '2026-01-01',
        endDate: '2026-12-31',
      };

      // Act
      await controller.findBusinessCentreNonWorkingDays(mockParam, mockQuery);

      // Assert
      expect(domServiceFindBusinessCentreNonWorkingDays).toHaveBeenCalledTimes(1);
      expect(domServiceFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(mockParam.centreCode, mockQuery.startDate, mockQuery.endDate);
    });

    it('should return the result of domService.findBusinessCentreNonWorkingDays', async () => {
      // Act
      const result = await controller.findBusinessCentreNonWorkingDays({ centreCode: EXAMPLES.BUSINESS_CENTRE.CODE }, {});

      // Assert
      expect(result).toEqual(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS);
    });

    describe('when domService.findBusinessCentreNonWorkingDays throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const domService = new DomService(odsService, odsProductConfigService, mockLogger);

        domService.findBusinessCentreNonWorkingDays = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService, odsService, creditRiskRatingsService);

        // Act & Assert
        const promise = controller.findBusinessCentreNonWorkingDays({ centreCode: EXAMPLES.BUSINESS_CENTRE.CODE }, {});

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getCreditRiskRatings', () => {
    it('should call creditRiskRatingsService.getAll', async () => {
      // Act
      await controller.getCreditRiskRatings();

      // Assert
      expect(creditRiskRatingsServiceGetAll).toHaveBeenCalledTimes(1);
    });

    it('should return the result of creditRiskRatingsService.getAll', async () => {
      // Act
      const result = await controller.getCreditRiskRatings();

      // Assert
      expect(result).toEqual(EXAMPLES.CREDIT_RISK_RATINGS);
    });

    describe('when creditRiskRatingsService.getAll throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const domService = new DomService(odsService, odsProductConfigService, mockLogger);

        creditRiskRatingsService.getAll = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService, odsService, creditRiskRatingsService);

        // Act & Assert
        const promise = controller.getCreditRiskRatings();

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getBusinessCentres', () => {
    it('should call domService.getBusinessCentres', async () => {
      // Act
      await controller.getBusinessCentres();

      // Assert
      expect(odsServiceGetBusinessCentres).toHaveBeenCalledTimes(1);
    });

    it('should return business centres', async () => {
      // Act
      const result = await controller.getBusinessCentres();

      // Assert
      expect(result).toEqual(EXAMPLES.DOM.BUSINESS_CENTRES);
    });

    describe('when odsService.getBusinessCentres throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const domService = new DomService(odsService, odsProductConfigService, mockLogger);

        odsService.getBusinessCentres = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService, odsService, creditRiskRatingsService);

        // Act & Assert
        const promise = controller.getBusinessCentres();

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getInterestRateTickers', () => {
    it('should call odsService.getInterestRateTickers', async () => {
      // Act
      await controller.getInterestRateTickers();

      // Assert
      expect(odsServiceGetInterestRateTickers).toHaveBeenCalledTimes(1);
    });

    it('should return the result of odsService.getInterestRateTickers', async () => {
      // Act
      const result = await controller.getInterestRateTickers();

      // Assert
      expect(result).toEqual(EXAMPLES.DOM.INTEREST_RATE_TICKERS);
    });

    describe('when odsService.getInterestRateTickers throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        odsService.getInterestRateTickers = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService, odsService, creditRiskRatingsService);

        // Act & Assert
        const promise = controller.getInterestRateTickers();

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('findMultipleBusinessCentresNonWorkingDays', () => {
    const mockQuery = {
      centreCodes: `${EXAMPLES.BUSINESS_CENTRE.CODE},${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE}`,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
    };

    it('should call domService.findMultipleBusinessCentresNonWorkingDays with date filters', async () => {
      // Act
      await controller.findMultipleBusinessCentresNonWorkingDays(mockQuery);

      // Assert
      expect(domServiceFindMultipleBusinessCentresNonWorkingDays).toHaveBeenCalledTimes(1);
      expect(domServiceFindMultipleBusinessCentresNonWorkingDays).toHaveBeenCalledWith(mockQuery.centreCodes, mockQuery.startDate, mockQuery.endDate);
    });

    it('should return mapped business centres non working days', async () => {
      // Act
      const result = await controller.findMultipleBusinessCentresNonWorkingDays(mockQuery);

      // Assert
      expect(result).toStrictEqual(mockMultipleBusinessCentreNonWorkingDays);
    });
  });

  describe('findProductConfiguration', () => {
    const mockProductType = EXAMPLES.PRODUCT_TYPES.BIP;

    it('should call domService.findProductConfiguration', async () => {
      // Act
      await controller.findProductConfiguration({ productType: mockProductType });

      // Assert
      expect(domServiceFindProductConfiguration).toHaveBeenCalledTimes(1);
      expect(domServiceFindProductConfiguration).toHaveBeenCalledWith(mockProductType);
    });

    it('should return the result of domService.findProductConfiguration', async () => {
      // Act
      const result = await controller.findProductConfiguration({ productType: mockProductType });

      // Assert
      expect(result).toEqual(mockFindProductConfiguration);
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
      expect(result).toStrictEqual([EXAMPLES.DOM.PRODUCT_CONFIG.BIP, EXAMPLES.DOM.PRODUCT_CONFIG.EXIP]);
    });
  });

  describe('findMultipleProductConfigurations', () => {
    it('should call domService.findMultipleProductConfigurations', async () => {
      // Act
      await controller.findMultipleProductConfigurations({ productTypes: mockProductTypesString });

      // Assert
      expect(domServiceFindMultipleProductConfigurations).toHaveBeenCalledTimes(1);
      expect(domServiceFindMultipleProductConfigurations).toHaveBeenCalledWith(mockProductTypesString);
    });

    it('should return product configurations', async () => {
      // Act
      const result = await controller.findMultipleProductConfigurations({ productTypes: mockProductTypesString });

      // Assert
      expect(result).toStrictEqual(mockMultipleProductConfigurations);
    });
  });

  describe('getInterestRates', () => {
    const mockQuery = {
      rateCode: EXAMPLES.DOM.INTEREST_RATES[0].code,
      startDate: EXAMPLES.DATE_START,
      endDate: EXAMPLES.DATE_END,
    };

    it('should call domService.getInterestRates with the rate code, end date and start date', async () => {
      // Act
      await controller.getInterestRates(mockQuery);

      // Assert
      expect(domServiceGetInterestRates).toHaveBeenCalledTimes(1);
      expect(domServiceGetInterestRates).toHaveBeenCalledWith(mockQuery.rateCode, mockQuery.endDate, mockQuery.startDate);
    });

    it('should call domService.getInterestRates with an undefined start date when it is not provided', async () => {
      // Act
      await controller.getInterestRates({ rateCode: mockQuery.rateCode, endDate: mockQuery.endDate });

      // Assert
      expect(domServiceGetInterestRates).toHaveBeenCalledTimes(1);
      expect(domServiceGetInterestRates).toHaveBeenCalledWith(mockQuery.rateCode, mockQuery.endDate, undefined);
    });

    it('should return the result of domService.getInterestRates', async () => {
      // Act
      const result = await controller.getInterestRates(mockQuery);

      // Assert
      expect(result).toEqual(EXAMPLES.DOM.INTEREST_RATES);
    });

    describe('when domService.getInterestRates throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const domService = new DomService(odsService, odsProductConfigService, mockLogger);

        domService.getInterestRates = jest.fn().mockRejectedValueOnce(mockError);

        controller = new DomController(domService, odsService, creditRiskRatingsService);

        // Act & Assert
        const promise = controller.getInterestRates(mockQuery);

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
