import { NotFoundException } from '@nestjs/common';
import { DOM_BUSINESS_CENTRES, DOM_TO_ODS_BUSINESS_CENTRES_MAPPING, EXAMPLES } from '@ukef/constants';
import { mapBusinessCentre, mapBusinessCentreNonWorkingDays, mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { OdsService } from '../ods/ods.service';
import { DomService } from './dom.service';

const mockError = new Error('An error occurred');

const mockBusinessCentreNonWorkingDays = [
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

  let service: DomService;

  beforeEach(() => {
    odsServiceFindBusinessCentreNonWorkingDays = jest.fn().mockResolvedValueOnce(mockBusinessCentreNonWorkingDays);
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
        const expected = mapBusinessCentreNonWorkingDays(mockBusinessCentreNonWorkingDays, mockCentreCode);

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
        const mockCentreCode = DOM_BUSINESS_CENTRES.CM_YAO.CODE;

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

  describe('getProductConfigurations', () => {
    it('should return mock product configurations', () => {
      // Act
      const response = service.getProductConfigurations();

      // Assert
      expect(response).toEqual(EXAMPLES.DOM.PRODUCT_CONFIGURATIONS);
    });
  });
});
