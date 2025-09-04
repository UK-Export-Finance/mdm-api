import { NotFoundException } from '@nestjs/common';
import { DOM_BUSINESS_CENTRES, DOM_TO_ODS_BUSINESS_CENTRES_MAPPING, EXAMPLES } from '@ukef/constants';
import { mapBusinessCentre, mapBusinessCentreNonWorkingDays, mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { GetOdsBusinessCentreNonWorkingDayResponse } from '../ods/dto';
import { OdsService } from '../ods/ods.service';
import { DomService } from './dom.service';
import { GetDomBusinessCentreNonWorkingDayMappedResponse } from './dto';

const mockError = new Error('An error occurred');

// TODO: DRY, see dom controller test
const mockBusinessCentreNonWorkingDays: GetDomBusinessCentreNonWorkingDayMappedResponse[] = [
  {
    code: DOM_BUSINESS_CENTRES.AE_DXB.CODE,
    date: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
    name: DOM_BUSINESS_CENTRES.AE_DXB.NAME,
  },
  {
    code: DOM_BUSINESS_CENTRES.JO_AMM.CODE,
    date: EXAMPLES.BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
    name: DOM_BUSINESS_CENTRES.JO_AMM.NAME,
  },
];

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
        const mockCentreCode = DOM_BUSINESS_CENTRES.JO_AMM.CODE;

        // Act
        const response = service.findBusinessCentre(mockCentreCode);

        // Assert
        const expected = mapBusinessCentre(DOM_BUSINESS_CENTRES.JO_AMM);

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
      const mockCentreCode = DOM_BUSINESS_CENTRES.JO_AMM.CODE;

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
      it('should throw a not found exception', async () => {
        // Arrange
        const mockCentreCode = DOM_BUSINESS_CENTRES.JO_AMM.CODE;

        odsServiceFindBusinessCentreNonWorkingDays = jest.fn().mockRejectedValueOnce(mockError);
        odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

        service = new DomService(odsService, mockLogger);

        // Act & Assert
        const promise = service.findBusinessCentreNonWorkingDays(mockCentreCode);

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
        .mockResolvedValueOnce(mockBusinessCentreNonWorkingDays)
        .mockResolvedValueOnce(mockBusinessCentreNonWorkingDays);

      service = new DomService(odsService, mockLogger);

      service.findBusinessCentreNonWorkingDays = mockFindBusinessCentreNonWorkingDays;
    });

    describe('when business centres are found', () => {
      it('should call service.findBusinessCentreNonWorkingDays', async () => {
        // Arrange
        const mockCentreCodes = `${DOM_BUSINESS_CENTRES.AE_DXB.CODE},${DOM_BUSINESS_CENTRES.JO_AMM.CODE}`;

        // Act
        await service.findMultipleBusinessCentresNonWorkingDays(mockCentreCodes);

        // Assert
        expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledTimes(2);
        expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(EXAMPLES.DOM.BUSINESS_CENTRES[0].code);
        expect(mockFindBusinessCentreNonWorkingDays).toHaveBeenCalledWith(EXAMPLES.DOM.BUSINESS_CENTRES[1].code);
      });

      it('should return mapped business centres', async () => {
        // Arrange
        const mockCentreCodes = `${DOM_BUSINESS_CENTRES.AE_DXB.CODE},${DOM_BUSINESS_CENTRES.JO_AMM.CODE}`;

        // Act
        const response = await service.findMultipleBusinessCentresNonWorkingDays(mockCentreCodes);

        // Assert
        const expected = {
          [EXAMPLES.DOM.BUSINESS_CENTRES[0].code]: mockBusinessCentreNonWorkingDays,
          [EXAMPLES.DOM.BUSINESS_CENTRES[1].code]: mockBusinessCentreNonWorkingDays,
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
          .mockResolvedValueOnce(mockBusinessCentreNonWorkingDays)
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

  describe('getProductConfigurations', () => {
    it('should return mock product configurations', () => {
      // Act
      const response = service.getProductConfigurations();

      // Assert
      expect(response).toEqual(EXAMPLES.DOM.PRODUCT_CONFIGURATIONS);
    });
  });
});
