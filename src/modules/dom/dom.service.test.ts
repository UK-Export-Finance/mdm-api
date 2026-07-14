import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EXAMPLES } from '@ukef/constants';
import { mapBusinessCentreNonWorkingDays, mapProductConfig } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { GetOdsBusinessCentreOdsResponseNonWorkingDayResponse } from '../ods/dto';
import { OdsService } from '../ods/ods.service';
import { OdsProductConfigService } from '../ods/ods-product-config.service';
import { OdsStoredProcedureService } from '../ods/ods-stored-procedure.service';
import { mockProductConfigs } from '../ods/test-helpers';
import { DomService } from './dom.service';

const mockOdsBusinessCentreOdsResponseNonWorkingDays: GetOdsBusinessCentreOdsResponseNonWorkingDayResponse[] = [
  {
    business_centre_code: EXAMPLES.BUSINESS_CENTRE.CODE,
    non_working_day_date: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
    non_working_day_name: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME,
  },
  {
    business_centre_code: EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE,
    non_working_day_date: EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.NON_WORKING_DAY.DATE,
    non_working_day_name: EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.NON_WORKING_DAY.NAME,
  },
];

describe('DomService', () => {
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  const mockLogger = new PinoLogger({});

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  } as unknown as jest.Mocked<DataSource>;

  const odsStoredProcedureService = new OdsStoredProcedureService(mockDataSource);

  const odsService = new OdsService(odsStoredProcedureService, mockLogger);
  const odsProductConfigService = new OdsProductConfigService(odsStoredProcedureService, mockLogger);

  let odsServiceFindBusinessCentreNonWorkingDays: jest.Mock;
  let mockFindBusinessCentreNonWorkingDays: jest.Mock;
  let mockFindProductConfiguration: jest.Mock;
  let odsProductConfigServiceFindOne: jest.Mock;
  let odsProductConfigServiceGetAll: jest.Mock;

  let service: DomService;

  beforeEach(() => {
    odsServiceFindBusinessCentreNonWorkingDays = jest.fn().mockResolvedValueOnce(mockOdsBusinessCentreOdsResponseNonWorkingDays);
    odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

    odsProductConfigServiceFindOne = jest.fn().mockResolvedValue(mockProductConfigs[0]);
    odsProductConfigService.findOne = odsProductConfigServiceFindOne;

    odsProductConfigServiceGetAll = jest.fn().mockResolvedValue(mockProductConfigs);
    odsProductConfigService.getAll = odsProductConfigServiceGetAll;

    service = new DomService(odsService, odsProductConfigService, mockLogger);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('findBusinessCentreNonWorkingDays', () => {
    describe('when a business centre and non working days are found', () => {
      // Arrange
      const mockCentreCode = EXAMPLES.BUSINESS_CENTRE.CODE;

      it('should call odsService.findBusinessCentreNonWorkingDays', async () => {
        // Act
        await service.findBusinessCentreNonWorkingDays(mockCentreCode);

        // Assert
        expect(odsServiceFindBusinessCentreNonWorkingDays).toHaveBeenCalledTimes(1);
        expect(odsServiceFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(EXAMPLES.BUSINESS_CENTRE.CODE, undefined, undefined);
      });

      describe('when optional start and end date params are provided', () => {
        it('should pass optional start and end date filters', async () => {
          // Act
          await service.findBusinessCentreNonWorkingDays(mockCentreCode, EXAMPLES.DATE_START, EXAMPLES.DATE_END);

          // Assert
          expect(odsServiceFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(EXAMPLES.BUSINESS_CENTRE.CODE, EXAMPLES.DATE_START, EXAMPLES.DATE_END);
        });
      });

      it(`should return mapped non working days`, async () => {
        // Act
        const response = await service.findBusinessCentreNonWorkingDays(mockCentreCode);

        // Assert
        const expected = mapBusinessCentreNonWorkingDays(mockOdsBusinessCentreOdsResponseNonWorkingDays, mockCentreCode);

        expect(response).toEqual(expected);
      });
    });

    describe('when a business centre is NOT found', () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockCentreCode = 'INVALID CODE';

        const mockNotFoundError = new NotFoundException(`No business centre ${mockCentreCode} found in ODS`);

        odsServiceFindBusinessCentreNonWorkingDays = jest.fn().mockRejectedValueOnce(mockNotFoundError);
        odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

        service = new DomService(odsService, odsProductConfigService, mockLogger);

        // Act & Assert
        const promise = service.findBusinessCentreNonWorkingDays(mockCentreCode);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);

        const expected = new Error(`No DOM business centre non working days found ${mockCentreCode}`);

        await expect(promise).rejects.toThrow(expected);
      });
    });
  });

  describe('findMultipleBusinessCentresNonWorkingDays', () => {
    beforeEach(() => {
      // Arrange
      mockFindBusinessCentreNonWorkingDays = jest
        .fn()
        .mockResolvedValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS)
        .mockResolvedValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS);

      service = new DomService(odsService, odsProductConfigService, mockLogger);

      service.findBusinessCentreNonWorkingDays = mockFindBusinessCentreNonWorkingDays;
    });

    describe('when business centres are found', () => {
      it('should call service.findBusinessCentreNonWorkingDays', async () => {
        // Arrange
        const mockCentreCodes = `${EXAMPLES.BUSINESS_CENTRE.CODE},${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE}`;

        // Act
        await service.findMultipleBusinessCentresNonWorkingDays(mockCentreCodes);

        // Assert
        expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledTimes(2);
        expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(EXAMPLES.BUSINESS_CENTRE.CODE, undefined, undefined);
        expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE, undefined, undefined);
      });

      describe('when optional start and end date params are provided', () => {
        it('should call service.findBusinessCentreNonWorkingDays with the provided params', async () => {
          // Arrange
          const mockCentreCodes = `${EXAMPLES.BUSINESS_CENTRE.CODE},${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE}`;

          // Act
          await service.findMultipleBusinessCentresNonWorkingDays(mockCentreCodes, EXAMPLES.DATE_START, EXAMPLES.DATE_END);

          // Assert
          expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledTimes(2);
          expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(EXAMPLES.BUSINESS_CENTRE.CODE, EXAMPLES.DATE_START, EXAMPLES.DATE_END);
          expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(
            EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE,
            EXAMPLES.DATE_START,
            EXAMPLES.DATE_END,
          );
        });
      });

      it('should return mapped business centres', async () => {
        // Arrange
        const mockCentreCodes = `${EXAMPLES.BUSINESS_CENTRE.CODE},${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE}`;

        // Act
        const response = await service.findMultipleBusinessCentresNonWorkingDays(mockCentreCodes);

        // Assert
        const expected = {
          [EXAMPLES.BUSINESS_CENTRE.CODE]: EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS,
          [EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE]: EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS,
        };

        expect(response).toEqual(expected);
      });
    });

    describe("when a business centre's non working days are NOT found", () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockCentreCodes = `${EXAMPLES.BUSINESS_CENTRE.CODE},INVALID CODE`;

        mockFindBusinessCentreNonWorkingDays = jest
          .fn()
          .mockResolvedValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS)
          .mockRejectedValueOnce(new NotFoundException('Mock error'));

        service = new DomService(odsService, odsProductConfigService, mockLogger);

        service.findBusinessCentreNonWorkingDays = mockFindBusinessCentreNonWorkingDays;

        // Act
        const promise = service.findMultipleBusinessCentresNonWorkingDays(mockCentreCodes);

        // Assert
        const expected = new Error(`Error finding multiple DOM business centre ${mockCentreCodes} non working days`);

        await expect(promise).rejects.toThrow(expected);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);
      });
    });

    describe("when all business centre's non working days are NOT found", () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockCentreCodes = `INVALID CODE,INVALID CODE`;

        const mockError = new NotFoundException('Mock error');

        mockFindBusinessCentreNonWorkingDays = jest.fn().mockResolvedValueOnce(mockError).mockRejectedValueOnce(mockError);

        service = new DomService(odsService, odsProductConfigService, mockLogger);

        service.findBusinessCentreNonWorkingDays = mockFindBusinessCentreNonWorkingDays;

        // Act
        const promise = service.findMultipleBusinessCentresNonWorkingDays(mockCentreCodes);

        // Assert
        const expected = new Error(`Error finding multiple DOM business centre ${mockCentreCodes} non working days`);

        await expect(promise).rejects.toThrow(expected);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);
      });
    });

    describe('when an empty string is provided', () => {
      it('should return mapped business centres', async () => {
        // Act
        const response = await service.findMultipleBusinessCentresNonWorkingDays('');

        expect(response).toEqual({});
      });
    });
  });

  describe('findProductConfiguration', () => {
    it(`should call odsProductConfigService.findOne with the product type`, async () => {
      // Act
      await service.findProductConfiguration(EXAMPLES.PRODUCT_TYPES.BIP);

      // Assert
      expect(odsProductConfigServiceFindOne).toHaveBeenCalledTimes(1);
      expect(odsProductConfigServiceFindOne).toHaveBeenCalledWith(EXAMPLES.PRODUCT_TYPES.BIP);
    });

    it(`should return a mapped product configuration`, async () => {
      // Act
      const response = await service.findProductConfiguration(EXAMPLES.PRODUCT_TYPES.BIP);

      // Assert
      expect(response).toEqual(mapProductConfig(mockProductConfigs[0]));
    });

    describe('when a configuration is NOT found', () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockProductType = 'INVALID PRODUCT TYPE';

        odsProductConfigServiceFindOne = jest.fn().mockRejectedValueOnce(new NotFoundException(`No product config ${mockProductType} found in ODS`));
        odsProductConfigService.findOne = odsProductConfigServiceFindOne;

        service = new DomService(odsService, odsProductConfigService, mockLogger);

        // Act & Assert
        const promise = service.findProductConfiguration(mockProductType);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);
      });
    });
  });

  describe('findMultipleProductConfigurations', () => {
    beforeEach(() => {
      // Arrange
      mockFindProductConfiguration = jest.fn().mockResolvedValueOnce(EXAMPLES.DOM.PRODUCT_CONFIG.BIP).mockResolvedValueOnce(EXAMPLES.DOM.PRODUCT_CONFIG.EXIP);

      service = new DomService(odsService, odsProductConfigService, mockLogger);

      service.findProductConfiguration = mockFindProductConfiguration;
    });

    describe('when product configurations are found', () => {
      it('should return multiple product configurations', async () => {
        // Arrange
        const mockProductTypes = `${EXAMPLES.PRODUCT_TYPES.BIP},${EXAMPLES.PRODUCT_TYPES.EXIP}`;

        // Act
        const response = await service.findMultipleProductConfigurations(mockProductTypes);

        // Assert
        const expected = {
          [EXAMPLES.PRODUCT_TYPES.BIP]: EXAMPLES.DOM.PRODUCT_CONFIG.BIP,
          [EXAMPLES.PRODUCT_TYPES.EXIP]: EXAMPLES.DOM.PRODUCT_CONFIG.EXIP,
        };

        expect(response).toEqual(expected);
      });
    });

    describe('when a product configuration is NOT found', () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockProductTypes = `${EXAMPLES.PRODUCT_TYPES.BIP},INVALID CODE`;

        mockFindProductConfiguration = jest
          .fn()
          .mockResolvedValueOnce(EXAMPLES.DOM.PRODUCT_CONFIG.BIP)
          .mockRejectedValueOnce(new NotFoundException('Mock error'));

        service = new DomService(odsService, odsProductConfigService, mockLogger);

        service.findProductConfiguration = mockFindProductConfiguration;

        // Act
        const promise = service.findMultipleProductConfigurations(mockProductTypes);

        // Assert
        const expected = new Error(`Error finding multiple DOM product configurations ${mockProductTypes}`);

        await expect(promise).rejects.toThrow(expected);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);
      });
    });

    describe('when all product configurations are NOT found', () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockProductTypes = 'INVALID CODE,INVALID CODE';

        const mockError = new NotFoundException('Mock error');

        mockFindProductConfiguration = jest.fn().mockResolvedValueOnce(mockError).mockRejectedValueOnce(mockError);

        service = new DomService(odsService, odsProductConfigService, mockLogger);

        service.findProductConfiguration = mockFindProductConfiguration;

        // Act
        const promise = service.findMultipleProductConfigurations(mockProductTypes);

        // Assert
        const expected = new Error(`Error finding multiple DOM product configurations ${mockProductTypes}`);

        await expect(promise).rejects.toThrow(expected);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);
      });
    });

    describe('when an empty string is provided', () => {
      it('should return product configurations', async () => {
        // Act
        const response = await service.findMultipleProductConfigurations('');

        expect(response).toEqual({});
      });
    });
  });

  describe('getProductConfigurations', () => {
    it('should call odsProductConfigService.getAll', async () => {
      // Act
      await service.getProductConfigurations();

      // Assert
      expect(odsProductConfigServiceGetAll).toHaveBeenCalledTimes(1);
    });

    it('should return mapped product configurations', async () => {
      // Act
      const response = await service.getProductConfigurations();

      // Assert
      expect(response).toEqual(mockProductConfigs.map(mapProductConfig));
    });
  });

  describe('getInterestRates', () => {
    const [exampleInterestRate] = EXAMPLES.DOM.INTEREST_RATES;
    const mockRateCode = exampleInterestRate.code;

    let odsServiceGetInterestRates: jest.Mock;

    beforeEach(() => {
      odsServiceGetInterestRates = jest.fn().mockResolvedValue(EXAMPLES.DOM.INTEREST_RATES);
      odsService.getInterestRates = odsServiceGetInterestRates;

      service = new DomService(odsService, odsProductConfigService, mockLogger);
    });

    describe('when a start date is provided', () => {
      it('should call odsService.getInterestRates with the rate code, end date and start date', async () => {
        // Act
        await service.getInterestRates(mockRateCode, EXAMPLES.DATE_END, EXAMPLES.DATE_START);

        // Assert
        expect(odsServiceGetInterestRates).toHaveBeenCalledTimes(1);
        expect(odsServiceGetInterestRates).toHaveBeenCalledWith(mockRateCode, EXAMPLES.DATE_END, EXAMPLES.DATE_START);
      });
    });

    describe('when a start date is NOT provided', () => {
      it('should call odsService.getInterestRates with an undefined start date', async () => {
        // Act
        await service.getInterestRates(mockRateCode, EXAMPLES.DATE_END);

        // Assert
        expect(odsServiceGetInterestRates).toHaveBeenCalledTimes(1);
        expect(odsServiceGetInterestRates).toHaveBeenCalledWith(mockRateCode, EXAMPLES.DATE_END, undefined);
      });
    });

    it('should return the result of odsService.getInterestRates', async () => {
      // Act
      const response = await service.getInterestRates(mockRateCode, EXAMPLES.DATE_END, EXAMPLES.DATE_START);

      // Assert
      expect(response).toEqual(EXAMPLES.DOM.INTEREST_RATES);
    });

    describe('when the start date is after the end date', () => {
      it('should throw a bad request exception', () => {
        // Act & Assert
        expect(() => service.getInterestRates(mockRateCode, EXAMPLES.DATE_START, EXAMPLES.DATE_END)).toThrow(BadRequestException);

        expect(() => service.getInterestRates(mockRateCode, EXAMPLES.DATE_START, EXAMPLES.DATE_END)).toThrow(
          'The start date must be on or before the end date',
        );
      });

      it('should NOT call odsService.getInterestRates', () => {
        // Act
        expect(() => service.getInterestRates(mockRateCode, EXAMPLES.DATE_START, EXAMPLES.DATE_END)).toThrow();

        // Assert
        expect(odsServiceGetInterestRates).not.toHaveBeenCalled();
      });
    });
  });
});
