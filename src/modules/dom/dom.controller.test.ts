import { jest } from '@jest/globals';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';
import { EXAMPLES } from '@ukef/constants';
import { mapBusinessCentres, mapProductConfig } from '@ukef/helpers';

import { OdsService } from '@ukef/modules/ods/ods.service';
import { mockProductConfigs } from '@ukef/modules/ods/test-helpers';
import { OdsProductConfigService } from '@ukef/modules/ods/ods-product-config.service';
import { OdsStoredProcedureService } from '@ukef/modules/ods/ods-stored-procedure.service';
import { CreditRiskRatingsService } from './credit-risk-ratings/credit-risk-ratings.service';
import { DomController } from './dom.controller';
import { DomService } from './dom.service';
import { FindMultipleOdsBusinessCentreOdsResponsesNonWorkingDaysResponse, FindMultipleProductConfigsResponse } from './dto';

const mockError = new Error('An error occurred');
const mockNonWorkingDays = EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS.map((day) => ({
  code: day.business_centre_code,
  name: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME,
  date: day.non_working_day_date,
}));
const mockBusinessCentres = mapBusinessCentres(EXAMPLES.DOM.BUSINESS_CENTRES);
const mockBusinessCentre = {
  code: EXAMPLES.BUSINESS_CENTRE.CODE,
  name: EXAMPLES.BUSINESS_CENTRE.NAME,
  description: EXAMPLES.BUSINESS_CENTRE.DESCRIPTION,
  isActive: EXAMPLES.BUSINESS_CENTRE.IS_ACTIVE,
};
const mockCreditRiskRatings = EXAMPLES.CREDIT_RISK_RATINGS.map((rating) => ({
  ...rating,
  createdAt: new Date(rating.createdAt),
  updatedAt: new Date(rating.updatedAt),
  effectiveFrom: new Date(rating.effectiveFrom),
  effectiveTo: new Date(rating.effectiveTo),
}));
const mockDomProductConfigs = mockProductConfigs.map(mapProductConfig);

const mockMultipleBusinessCentreNonWorkingDays: FindMultipleOdsBusinessCentreOdsResponsesNonWorkingDaysResponse = {
  [EXAMPLES.BUSINESS_CENTRE.CODE]: mockNonWorkingDays,
  [EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE]: mockNonWorkingDays,
};

const mockFindProductConfiguration = mockDomProductConfigs[0];

const mockMultipleProductConfigurations: FindMultipleProductConfigsResponse = {
  [EXAMPLES.PRODUCT_TYPES.BIP]: mockDomProductConfigs[0],
  [EXAMPLES.PRODUCT_TYPES.EXIP]: mockDomProductConfigs[1],
};

const mockProductTypesString = `${EXAMPLES.PRODUCT_TYPES.BIP},${EXAMPLES.PRODUCT_TYPES.EXIP}`;

describe('DomController', () => {
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  const mockLogger = new PinoLogger({});

  const mockDataSource = {
    createQueryRunner: jest.fn<DataSource['createQueryRunner']>().mockReturnValue(mockQueryRunner),
  } as unknown as jest.Mocked<DataSource>;

  const creditRiskRatingsService = new CreditRiskRatingsService(null, mockLogger);
  const odsStoredProcedureService = new OdsStoredProcedureService(mockDataSource);
  const odsService = new OdsService(odsStoredProcedureService, mockLogger);
  const odsProductConfigService = new OdsProductConfigService(odsStoredProcedureService, mockLogger);
  const domService = new DomService(odsService, odsProductConfigService, mockLogger);

  let creditRiskRatingsServiceGetAll: jest.MockedFunction<CreditRiskRatingsService['getAll']>;
  let odsServiceFindBusinessCentre: jest.MockedFunction<OdsService['findBusinessCentre']>;
  let domServiceFindBusinessCentreNonWorkingDays: jest.MockedFunction<DomService['findBusinessCentreNonWorkingDays']>;
  let odsServiceGetBusinessCentres: jest.MockedFunction<OdsService['getBusinessCentres']>;
  let odsServiceGetInterestRateTickers: jest.MockedFunction<OdsService['getInterestRateTickers']>;
  let odsServiceGetCurrencies: jest.MockedFunction<OdsService['getCurrencies']>;
  let domServiceFindProductConfiguration: jest.MockedFunction<DomService['findProductConfiguration']>;
  let domServiceFindMultipleBusinessCentresNonWorkingDays: jest.MockedFunction<DomService['findMultipleBusinessCentresNonWorkingDays']>;
  let domServiceGetProductConfigurations: jest.MockedFunction<DomService['getProductConfigurations']>;
  let domServiceFindMultipleProductConfigurations: jest.MockedFunction<DomService['findMultipleProductConfigurations']>;
  let domServiceGetCompoundingIndices: jest.MockedFunction<DomService['getCompoundingIndices']>;
  let domServiceGetInterestRates: jest.MockedFunction<DomService['getInterestRates']>;

  let controller: DomController;

  beforeEach(() => {
    creditRiskRatingsServiceGetAll = jest.fn<CreditRiskRatingsService['getAll']>().mockResolvedValueOnce(mockCreditRiskRatings);
    creditRiskRatingsService.getAll = creditRiskRatingsServiceGetAll;

    odsServiceFindBusinessCentre = jest.fn<OdsService['findBusinessCentre']>().mockResolvedValueOnce(mockBusinessCentre);
    odsService.findBusinessCentre = odsServiceFindBusinessCentre;

    domServiceFindBusinessCentreNonWorkingDays = jest.fn<DomService['findBusinessCentreNonWorkingDays']>().mockResolvedValueOnce(mockNonWorkingDays);
    domService.findBusinessCentreNonWorkingDays = domServiceFindBusinessCentreNonWorkingDays;

    odsServiceGetBusinessCentres = jest.fn<OdsService['getBusinessCentres']>().mockResolvedValueOnce(mockBusinessCentres);
    odsService.getBusinessCentres = odsServiceGetBusinessCentres;

    odsServiceGetInterestRateTickers = jest.fn<OdsService['getInterestRateTickers']>().mockResolvedValueOnce(EXAMPLES.DOM.INTEREST_RATE_TICKERS);
    odsService.getInterestRateTickers = odsServiceGetInterestRateTickers;

    odsServiceGetCurrencies = jest.fn<OdsService['getCurrencies']>().mockResolvedValueOnce(EXAMPLES.DOM.CURRENCIES);
    odsService.getCurrencies = odsServiceGetCurrencies;

    domServiceFindMultipleBusinessCentresNonWorkingDays = jest
      .fn<DomService['findMultipleBusinessCentresNonWorkingDays']>()
      .mockResolvedValueOnce(mockMultipleBusinessCentreNonWorkingDays);
    domService.findMultipleBusinessCentresNonWorkingDays = domServiceFindMultipleBusinessCentresNonWorkingDays;

    domServiceFindProductConfiguration = jest.fn<DomService['findProductConfiguration']>().mockResolvedValueOnce(mockFindProductConfiguration);
    domService.findProductConfiguration = domServiceFindProductConfiguration;

    domServiceGetProductConfigurations = jest
      .fn<DomService['getProductConfigurations']>()
      .mockResolvedValueOnce([mockDomProductConfigs[0], mockDomProductConfigs[1]]);
    domService.getProductConfigurations = domServiceGetProductConfigurations;

    domServiceFindMultipleProductConfigurations = jest
      .fn<DomService['findMultipleProductConfigurations']>()
      .mockResolvedValueOnce(mockMultipleProductConfigurations);
    domService.findMultipleProductConfigurations = domServiceFindMultipleProductConfigurations;

    domServiceGetCompoundingIndices = jest.fn<DomService['getCompoundingIndices']>().mockResolvedValueOnce([]);
    domService.getCompoundingIndices = domServiceGetCompoundingIndices;

    domServiceGetInterestRates = jest.fn<DomService['getInterestRates']>().mockResolvedValueOnce(EXAMPLES.DOM.INTEREST_RATES);
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
      expect(result).toEqual(mockBusinessCentre);
    });

    describe('when odsService.findBusinessCentre throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const localDomService = new DomService(odsService, odsProductConfigService, mockLogger);

        odsService.findBusinessCentre = jest.fn<OdsService['findBusinessCentre']>().mockRejectedValueOnce(mockError);

        controller = new DomController(localDomService, odsService, creditRiskRatingsService);

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
      expect(domServiceFindBusinessCentreNonWorkingDays).toHaveBeenNthCalledWith(1, mockParam.centreCode, mockQuery.startDate, mockQuery.endDate);
    });

    it('should return the result of domService.findBusinessCentreNonWorkingDays', async () => {
      // Act
      const result = await controller.findBusinessCentreNonWorkingDays({ centreCode: EXAMPLES.BUSINESS_CENTRE.CODE }, {});

      // Assert
      expect(result).toEqual(mockNonWorkingDays);
    });

    describe('when domService.findBusinessCentreNonWorkingDays throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const localDomService = new DomService(odsService, odsProductConfigService, mockLogger);

        localDomService.findBusinessCentreNonWorkingDays = jest.fn<DomService['findBusinessCentreNonWorkingDays']>().mockRejectedValueOnce(mockError);

        controller = new DomController(localDomService, odsService, creditRiskRatingsService);

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
      expect(result).toEqual(mockCreditRiskRatings);
    });

    describe('when creditRiskRatingsService.getAll throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const localDomService = new DomService(odsService, odsProductConfigService, mockLogger);

        creditRiskRatingsService.getAll = jest.fn<CreditRiskRatingsService['getAll']>().mockRejectedValueOnce(mockError);

        controller = new DomController(localDomService, odsService, creditRiskRatingsService);

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
      expect(result).toEqual(mockBusinessCentres);
    });

    describe('when odsService.getBusinessCentres throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const localDomService = new DomService(odsService, odsProductConfigService, mockLogger);

        odsService.getBusinessCentres = jest.fn<OdsService['getBusinessCentres']>().mockRejectedValueOnce(mockError);

        controller = new DomController(localDomService, odsService, creditRiskRatingsService);

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
        odsService.getInterestRateTickers = jest.fn<OdsService['getInterestRateTickers']>().mockRejectedValueOnce(mockError);

        controller = new DomController(domService, odsService, creditRiskRatingsService);

        // Act & Assert
        const promise = controller.getInterestRateTickers();

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getCompoundingIndices', () => {
    const mockQuery = { rateCode: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].code, startDate: EXAMPLES.DATE_START, endDate: EXAMPLES.DATE_END };

    it('should call domService.getCompoundingIndices with the rate code, end date and start date', async () => {
      await controller.getCompoundingIndices(mockQuery);

      expect(domServiceGetCompoundingIndices).toHaveBeenNthCalledWith(1, mockQuery.rateCode, mockQuery.endDate, mockQuery.startDate);
    });

    it('should call domService.getCompoundingIndices with an undefined start date when it is not provided', async () => {
      await controller.getCompoundingIndices({ rateCode: mockQuery.rateCode, endDate: mockQuery.endDate });

      expect(domServiceGetCompoundingIndices).toHaveBeenNthCalledWith(1, mockQuery.rateCode, mockQuery.endDate, undefined);
    });

    it('should return the result of domService.getCompoundingIndices', async () => {
      const result = await controller.getCompoundingIndices(mockQuery);

      expect(result).toEqual([]);
    });

    describe('when domService.getCompoundingIndices throws an error', () => {
      it('should throw an error', async () => {
        const localDomService = new DomService(odsService, odsProductConfigService, mockLogger);
        localDomService.getCompoundingIndices = jest.fn<DomService['getCompoundingIndices']>().mockRejectedValueOnce(mockError);
        controller = new DomController(localDomService, odsService, creditRiskRatingsService);

        const promise = controller.getCompoundingIndices(mockQuery);

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getCurrencies', () => {
    it('should call odsService.getCurrencies', async () => {
      // Act
      await controller.getCurrencies();

      // Assert
      expect(odsServiceGetCurrencies).toHaveBeenCalledTimes(1);
    });

    it('should return the result of odsService.getCurrencies', async () => {
      // Act
      const result = await controller.getCurrencies();

      // Assert
      expect(result).toEqual(EXAMPLES.DOM.CURRENCIES);
    });

    describe('when odsService.getCurrencies throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        odsService.getCurrencies = jest.fn<OdsService['getCurrencies']>().mockRejectedValueOnce(mockError);

        controller = new DomController(domService, odsService, creditRiskRatingsService);

        // Act & Assert
        const promise = controller.getCurrencies();

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
      expect(domServiceFindMultipleBusinessCentresNonWorkingDays).toHaveBeenNthCalledWith(1, mockQuery.centreCodes, mockQuery.startDate, mockQuery.endDate);
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
      expect(domServiceFindProductConfiguration).toHaveBeenNthCalledWith(1, mockProductType);
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
      expect(result).toStrictEqual([mockDomProductConfigs[0], mockDomProductConfigs[1]]);
    });
  });

  describe('findMultipleProductConfigurations', () => {
    it('should call domService.findMultipleProductConfigurations', async () => {
      // Act
      await controller.findMultipleProductConfigurations({ productTypes: mockProductTypesString });

      // Assert
      expect(domServiceFindMultipleProductConfigurations).toHaveBeenNthCalledWith(1, mockProductTypesString);
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
      expect(domServiceGetInterestRates).toHaveBeenNthCalledWith(1, mockQuery.rateCode, mockQuery.endDate, mockQuery.startDate);
    });

    it('should call domService.getInterestRates with an undefined start date when it is not provided', async () => {
      // Act
      await controller.getInterestRates({ rateCode: mockQuery.rateCode, endDate: mockQuery.endDate });

      // Assert
      expect(domServiceGetInterestRates).toHaveBeenNthCalledWith(1, mockQuery.rateCode, mockQuery.endDate, undefined);
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
        const localDomService = new DomService(odsService, odsProductConfigService, mockLogger);

        localDomService.getInterestRates = jest.fn<DomService['getInterestRates']>().mockRejectedValueOnce(mockError);

        controller = new DomController(localDomService, odsService, creditRiskRatingsService);

        // Act & Assert
        const promise = controller.getInterestRates(mockQuery);

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
