import { NotFoundException } from '@nestjs/common';
import { DOM_BUSINESS_CENTRES, DOM_TO_ODS_BUSINESS_CENTRES_MAPPING, EXAMPLES } from '@ukef/constants';
import PRODUCT_CONFIG from '@ukef/helper-modules/dom/dom-product-config.json';
import { mapBusinessCentre, mapBusinessCentreNonWorkingDays, mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { GetOdsBusinessCentreNonWorkingDayResponse } from '../ods/dto';
import { OdsService } from '../ods/ods.service';
import { DomService } from './dom.service';

const mockError = new Error('An error occurred');

const mockOdsBusinessCentreNonWorkingDays: GetOdsBusinessCentreNonWorkingDayResponse[] = [
  {
    business_centre_code: EXAMPLES.BUSINESS_CENTRE.CODE,
    non_working_day_date: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
    non_working_day_name: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME,
  },
  {
    business_centre_code: EXAMPLES.BUSINESS_CENTRE.CODE,
    non_working_day_date: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
    non_working_day_name: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.NAME,
  },
];

describe('DomService', () => {
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  const mockLogger = new PinoLogger({});

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  } as unknown as jest.Mocked<DataSource>;

  const odsService = new OdsService(mockDataSource, mockLogger);

  let odsServiceFindBusinessCentreNonWorkingDays: jest.Mock;
  let mockFindBusinessCentreNonWorkingDays: jest.Mock;
  let mockFindProductConfiguration: jest.Mock;

  let service: DomService;

  beforeEach(() => {
    odsServiceFindBusinessCentreNonWorkingDays = jest.fn().mockResolvedValueOnce(mockOdsBusinessCentreNonWorkingDays);
    odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

    service = new DomService(odsService, mockLogger);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('findBusinessCentre', () => {
    describe('when a business centre is found', () => {
      it('should return a mapped business centre', () => {
        // Arrange
        const mockCentreCode = DOM_BUSINESS_CENTRES.CM_YAO.CODE;

        // Act
        const response = service.findBusinessCentre(mockCentreCode);

        // Assert
        const expected = mapBusinessCentre(DOM_BUSINESS_CENTRES.CM_YAO);

        expect(response).toEqual(expected);
      });
    });

    describe('when a business centre is NOT found', () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockCentreCode = 'INVALID CODE';

        // Act
        const response = new Promise((resolve) => {
          return resolve(service.findBusinessCentre(mockCentreCode));
        });

        // Assert
        await expect(response).rejects.toBeInstanceOf(NotFoundException);

        const expected = new NotFoundException(`No business centre found ${mockCentreCode}`);

        await expect(response).rejects.toStrictEqual(expected);
      });
    });
  });

  describe('findBusinessCentreNonWorkingDays', () => {
    describe('when a business centre and non working days are found', () => {
      // Arrange
      const mockCentreCode = DOM_BUSINESS_CENTRES.CM_YAO.CODE;

      it('should call odsService.findBusinessCentreNonWorkingDays', async () => {
        // Act
        await service.findBusinessCentreNonWorkingDays(mockCentreCode);

        // Assert
        expect(odsServiceFindBusinessCentreNonWorkingDays).toHaveBeenCalledTimes(1);

        const expectedCentreCode = DOM_TO_ODS_BUSINESS_CENTRES_MAPPING[`${mockCentreCode}`];

        expect(odsServiceFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(expectedCentreCode);
      });

      it(`should return mapped non working days`, async () => {
        // Act
        const response = await service.findBusinessCentreNonWorkingDays(mockCentreCode);

        // Assert
        const expected = mapBusinessCentreNonWorkingDays(mockOdsBusinessCentreNonWorkingDays, mockCentreCode);

        expect(response).toEqual(expected);
      });
    });

    describe('when a business centre is NOT found', () => {
      // Arrange
      const mockCentreCode = 'INVALID CODE';

      it('should NOT call odsService.findBusinessCentreNonWorkingDays', async () => {
        // Act & Assert
        const promise = service.findBusinessCentreNonWorkingDays(mockCentreCode);

        await expect(promise).rejects.toThrow();

        expect(odsServiceFindBusinessCentreNonWorkingDays).not.toHaveBeenCalled();
      });

      it('should throw a not found exception', async () => {
        // Act & Assert
        const promise = service.findBusinessCentreNonWorkingDays(mockCentreCode);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);

        const expected = new Error(`No DOM to ODS business centre code found ${mockCentreCode}`);

        await expect(promise).rejects.toThrow(expected);
      });
    });

    describe('when a business centre is found, but non working days throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const mockCentreCode = DOM_BUSINESS_CENTRES.CM_YAO.CODE;

        odsServiceFindBusinessCentreNonWorkingDays = jest.fn().mockRejectedValueOnce(mockError);
        odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

        service = new DomService(odsService, mockLogger);

        // Act & Assert
        const promise = service.findBusinessCentreNonWorkingDays(mockCentreCode);

        await expect(promise).rejects.toBeInstanceOf(Error);

        const expected = `Error finding DOM business centre ${mockCentreCode} non working days`;

        await expect(promise).rejects.toThrow(expected);
      });
    });
  });

  describe('getBusinessCentres', () => {
    it('should return mapped business centres', () => {
      // Act
      const response = service.getBusinessCentres();

      // Assert
      const expected = mapBusinessCentres(Object.values(DOM_BUSINESS_CENTRES));

      expect(response).toEqual(expected);
    });
  });

  describe('findMultipleBusinessCentresNonWorkingDays', () => {
    beforeEach(() => {
      // Arrange
      mockFindBusinessCentreNonWorkingDays = jest
        .fn()
        .mockResolvedValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS)
        .mockResolvedValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS);

      service = new DomService(odsService, mockLogger);

      service.findBusinessCentreNonWorkingDays = mockFindBusinessCentreNonWorkingDays;
    });

    describe('when business centres are found', () => {
      it('should call service.findBusinessCentreNonWorkingDays', async () => {
        // Arrange
        const mockCentreCodes = `${DOM_BUSINESS_CENTRES.AE_DXB.CODE},${DOM_BUSINESS_CENTRES.CM_YAO.CODE}`;

        // Act
        await service.findMultipleBusinessCentresNonWorkingDays(mockCentreCodes);

        // Assert
        expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledTimes(2);
        expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(EXAMPLES.DOM.BUSINESS_CENTRES[0].code);
        expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(EXAMPLES.DOM.BUSINESS_CENTRES[1].code);
      });

      it('should return mapped business centres', async () => {
        // Arrange
        const mockCentreCodes = `${DOM_BUSINESS_CENTRES.AE_DXB.CODE},${DOM_BUSINESS_CENTRES.CM_YAO.CODE}`;

        // Act
        const response = await service.findMultipleBusinessCentresNonWorkingDays(mockCentreCodes);

        // Assert
        const expected = {
          [EXAMPLES.DOM.BUSINESS_CENTRES[0].code]: EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS,
          [EXAMPLES.DOM.BUSINESS_CENTRES[1].code]: EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS,
        };

        expect(response).toEqual(expected);
      });
    });

    describe("when a business centre's non working days are NOT found", () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockCentreCodes = `${DOM_BUSINESS_CENTRES.AE_DXB.CODE},INVALID CODE`;

        mockFindBusinessCentreNonWorkingDays = jest
          .fn()
          .mockResolvedValueOnce(EXAMPLES.DOM.BUSINESS_CENTRES_NON_WORKING_DAYS)
          .mockRejectedValueOnce(new NotFoundException('Mock error'));

        service = new DomService(odsService, mockLogger);

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

        service = new DomService(odsService, mockLogger);

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
    it(`should return a product configuration - ${EXAMPLES.PRODUCT_TYPES.BIP}`, () => {
      // Act
      const response = service.findProductConfiguration(EXAMPLES.PRODUCT_TYPES.BIP);

      // Assert
      expect(response).toEqual(PRODUCT_CONFIG[0]);
      expect(response.productType).toEqual(EXAMPLES.PRODUCT_TYPES.BIP);
    });

    it(`should return a product configuration - ${EXAMPLES.PRODUCT_TYPES.EXIP}`, () => {
      // Act
      const response = service.findProductConfiguration(EXAMPLES.PRODUCT_TYPES.EXIP);

      // Assert
      expect(response).toEqual(PRODUCT_CONFIG[1]);
      expect(response.productType).toEqual(EXAMPLES.PRODUCT_TYPES.EXIP);
    });

    it(`should return a product configuration - ${EXAMPLES.PRODUCT_TYPES.EXAMPLE_ALL_OPTIONAL}`, () => {
      // Act
      const response = service.findProductConfiguration(EXAMPLES.PRODUCT_TYPES.EXAMPLE_ALL_OPTIONAL);

      // Assert
      expect(response).toEqual(PRODUCT_CONFIG[2]);
      expect(response.productType).toEqual(EXAMPLES.PRODUCT_TYPES.EXAMPLE_ALL_OPTIONAL);
    });

    it(`should return a product configuration - ${EXAMPLES.PRODUCT_TYPES.EXAMPLE_ALL_REQUIRED}`, () => {
      // Act
      const response = service.findProductConfiguration(EXAMPLES.PRODUCT_TYPES.EXAMPLE_ALL_REQUIRED);

      // Assert
      expect(response).toEqual(PRODUCT_CONFIG[3]);
      expect(response.productType).toEqual(EXAMPLES.PRODUCT_TYPES.EXAMPLE_ALL_REQUIRED);
    });

    describe('when a configuration is NOT found', () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockProductType = 'INVALID PRODUCT TYPE';

        const response = new Promise((resolve) => {
          return resolve(service.findProductConfiguration(mockProductType));
        });

        // Assert
        await expect(response).rejects.toBeInstanceOf(NotFoundException);

        const expected = new NotFoundException(`No DOM product configuration found ${mockProductType}`);

        await expect(response).rejects.toStrictEqual(expected);
      });
    });
  });

  describe('findMultipleProductConfigurations', () => {
    beforeEach(() => {
      // Arrange
      mockFindProductConfiguration = jest.fn().mockReturnValueOnce(EXAMPLES.DOM.PRODUCT_CONFIG.BIP).mockReturnValueOnce(EXAMPLES.DOM.PRODUCT_CONFIG.EXIP);

      service = new DomService(odsService, mockLogger);

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

        service = new DomService(odsService, mockLogger);

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

        service = new DomService(odsService, mockLogger);

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
    it('should return product configurations', () => {
      // Act
      const response = service.getProductConfigurations();

      // Assert
      expect(response).toEqual(PRODUCT_CONFIG);
    });
  });
});
