import { jest } from '@jest/globals';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';
import { EXAMPLES } from '@ukef/constants';
import { mapBusinessCentreNonWorkingDays, mapProductConfig } from '@ukef/helpers';

import { GetOdsBusinessCentreOdsResponseNonWorkingDayResponse } from '@ukef/modules/ods/dto';
import { OdsService } from '@ukef/modules/ods/ods.service';
import { OdsProductConfigService } from '@ukef/modules/ods/ods-product-config.service';
import { OdsStoredProcedureService } from '@ukef/modules/ods/ods-stored-procedure.service';
import { mockProductConfigs } from '@ukef/modules/ods/test-helpers';
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

const mockMappedNonWorkingDays = mapBusinessCentreNonWorkingDays(mockOdsBusinessCentreOdsResponseNonWorkingDays, EXAMPLES.BUSINESS_CENTRE.CODE);
const mockDomProductConfigs = mockProductConfigs.map(mapProductConfig);

describe('DomService', () => {
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  const mockLogger = new PinoLogger({});

  const mockDataSource = {
    createQueryRunner: jest.fn<DataSource['createQueryRunner']>().mockReturnValue(mockQueryRunner),
  } as unknown as jest.Mocked<DataSource>;

  const odsStoredProcedureService = new OdsStoredProcedureService(mockDataSource);

  const odsService = new OdsService(odsStoredProcedureService, mockLogger);
  const odsProductConfigService = new OdsProductConfigService(odsStoredProcedureService, mockLogger);

  let odsServiceFindBusinessCentreNonWorkingDays: jest.MockedFunction<OdsService['findBusinessCentreNonWorkingDays']>;
  let mockFindBusinessCentreNonWorkingDays: jest.MockedFunction<DomService['findBusinessCentreNonWorkingDays']>;
  let mockFindProductConfiguration: jest.MockedFunction<DomService['findProductConfiguration']>;
  let odsProductConfigServiceFindOne: jest.MockedFunction<OdsProductConfigService['findOne']>;
  let odsProductConfigServiceGetAll: jest.MockedFunction<OdsProductConfigService['getAll']>;

  let service: DomService;

  beforeEach(() => {
    odsServiceFindBusinessCentreNonWorkingDays = jest
      .fn<OdsService['findBusinessCentreNonWorkingDays']>()
      .mockResolvedValueOnce(mockOdsBusinessCentreOdsResponseNonWorkingDays);
    odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

    odsProductConfigServiceFindOne = jest.fn<OdsProductConfigService['findOne']>().mockResolvedValue(mockProductConfigs[0]);
    odsProductConfigService.findOne = odsProductConfigServiceFindOne;

    odsProductConfigServiceGetAll = jest.fn<OdsProductConfigService['getAll']>().mockResolvedValue(mockProductConfigs);
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

        odsServiceFindBusinessCentreNonWorkingDays = jest.fn<OdsService['findBusinessCentreNonWorkingDays']>().mockRejectedValueOnce(mockNotFoundError);
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
        .fn<DomService['findBusinessCentreNonWorkingDays']>()
        .mockResolvedValueOnce(mockMappedNonWorkingDays)
        .mockResolvedValueOnce(mockMappedNonWorkingDays);

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
          [EXAMPLES.BUSINESS_CENTRE.CODE]: mockMappedNonWorkingDays,
          [EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE]: mockMappedNonWorkingDays,
        };

        expect(response).toEqual(expected);
      });
    });

    describe("when a business centre's non working days are NOT found", () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockCentreCodes = `${EXAMPLES.BUSINESS_CENTRE.CODE},INVALID CODE`;

        mockFindBusinessCentreNonWorkingDays = jest
          .fn<DomService['findBusinessCentreNonWorkingDays']>()
          .mockResolvedValueOnce(mockMappedNonWorkingDays)
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

        mockFindBusinessCentreNonWorkingDays = jest.fn<DomService['findBusinessCentreNonWorkingDays']>().mockRejectedValue(mockError);

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

        odsProductConfigServiceFindOne = jest
          .fn<OdsProductConfigService['findOne']>()
          .mockRejectedValueOnce(new NotFoundException(`No product config ${mockProductType} found in ODS`));
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
      mockFindProductConfiguration = jest
        .fn<DomService['findProductConfiguration']>()
        .mockResolvedValueOnce(mockDomProductConfigs[0])
        .mockResolvedValueOnce(mockDomProductConfigs[1]);

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
          [EXAMPLES.PRODUCT_TYPES.BIP]: mockDomProductConfigs[0],
          [EXAMPLES.PRODUCT_TYPES.EXIP]: mockDomProductConfigs[1],
        };

        expect(response).toEqual(expected);
      });
    });

    describe('when a product configuration is NOT found', () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockProductTypes = `${EXAMPLES.PRODUCT_TYPES.BIP},INVALID CODE`;

        mockFindProductConfiguration = jest
          .fn<DomService['findProductConfiguration']>()
          .mockResolvedValueOnce(mockDomProductConfigs[0])
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

        mockFindProductConfiguration = jest.fn<DomService['findProductConfiguration']>().mockRejectedValue(mockError);

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

    let odsServiceGetInterestRates: jest.MockedFunction<OdsService['getInterestRates']>;

    beforeEach(() => {
      odsServiceGetInterestRates = jest.fn<OdsService['getInterestRates']>().mockResolvedValue(EXAMPLES.DOM.INTEREST_RATES);
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

  describe('getCompoundingIndices', () => {
    const mockRateCode = EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].code;
    const mockCompoundingIndices = [
      {
        code: mockRateCode,
        startDate: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
        indexEffectiveDate: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
        endDate: EXAMPLES.DOM.INTEREST_RATES[0].endDate,
        daysActive: 1,
        rate: EXAMPLES.DOM.INTEREST_RATES[0].rate,
        compoundingIndexValue: EXAMPLES.DOM.INTEREST_RATES[0].compoundingIndexValue,
      },
    ];

    let odsServiceGetCompoundingIndices: jest.MockedFunction<OdsService['getCompoundingIndices']>;

    beforeEach(() => {
      odsServiceGetCompoundingIndices = jest.fn<OdsService['getCompoundingIndices']>().mockResolvedValue(mockCompoundingIndices);
      odsService.getCompoundingIndices = odsServiceGetCompoundingIndices;

      service = new DomService(odsService, odsProductConfigService, mockLogger);
    });

    describe('when a start date is provided', () => {
      it('should call odsService.getCompoundingIndices with the rate code, end date and start date', async () => {
        await service.getCompoundingIndices(mockRateCode, EXAMPLES.DATE_END, EXAMPLES.DATE_START);

        expect(odsServiceGetCompoundingIndices).toHaveBeenCalledTimes(1);
        expect(odsServiceGetCompoundingIndices).toHaveBeenCalledWith(mockRateCode, EXAMPLES.DATE_END, EXAMPLES.DATE_START);
      });
    });

    describe('when a start date is NOT provided', () => {
      it('should call odsService.getCompoundingIndices with an undefined start date', async () => {
        await service.getCompoundingIndices(mockRateCode, EXAMPLES.DATE_END);

        expect(odsServiceGetCompoundingIndices).toHaveBeenCalledTimes(1);
        expect(odsServiceGetCompoundingIndices).toHaveBeenCalledWith(mockRateCode, EXAMPLES.DATE_END, undefined);
      });
    });

    it('should return the result of odsService.getCompoundingIndices', async () => {
      await expect(service.getCompoundingIndices(mockRateCode, EXAMPLES.DATE_END, EXAMPLES.DATE_START)).resolves.toEqual(mockCompoundingIndices);
    });

    describe('when the start date is after the end date', () => {
      it('should throw a bad request exception', () => {
        expect(() => service.getCompoundingIndices(mockRateCode, EXAMPLES.DATE_START, EXAMPLES.DATE_END)).toThrow(BadRequestException);
        expect(() => service.getCompoundingIndices(mockRateCode, EXAMPLES.DATE_START, EXAMPLES.DATE_END)).toThrow(
          'The start date must be on or before the end date',
        );
      });

      it('should NOT call odsService.getCompoundingIndices', () => {
        expect(() => service.getCompoundingIndices(mockRateCode, EXAMPLES.DATE_START, EXAMPLES.DATE_END)).toThrow();
        expect(odsServiceGetCompoundingIndices).not.toHaveBeenCalled();
      });
    });
  });
});
