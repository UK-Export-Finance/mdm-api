import { NotFoundException } from '@nestjs/common';
import { DOM_BUSINESS_CENTRES, EXAMPLES } from '@ukef/constants';
import { mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { OdsService } from '../ods/ods.service';
import { DomService } from './dom.service';

describe('DomService', () => {
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  const mockLogger = new PinoLogger({});

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  } as unknown as jest.Mocked<DataSource>;

  const odsService = new OdsService(mockDataSource, mockLogger);

  let odsServiceGetBusinessCentres: jest.Mock;

  let service: DomService;

  beforeEach(() => {
    odsServiceGetBusinessCentres = jest.fn().mockResolvedValueOnce(EXAMPLES.ODS.BUSINESS_CENTRES);

    odsService.getBusinessCentres = odsServiceGetBusinessCentres;

    service = new DomService(odsService, mockLogger);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('findBusinessCentre', () => {
    describe('when a business centre is found', () => {
      it('should return the business centre', async () => {
        // Arrange
        const mockCentreCode = DOM_BUSINESS_CENTRES.CM_YAO.CODE;

        // Act
        const response = await service.findBusinessCentre(mockCentreCode);

        // Assert
        const expected = DOM_BUSINESS_CENTRES.CM_YAO;

        expect(response).toEqual(expected);
      });
    });

    describe('when a business centre is NOT found', () => {
      it('should throw a not found exception', async () => {
        // Arrange
        const mockCentreCode = 'INVALID CODE';

        // Act & Assert
        const promise = service.findBusinessCentre(mockCentreCode);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);

        const expected = new Error(`No business centre found ${mockCentreCode}`);

        await expect(promise).rejects.toThrow(expected);
      });
    });
  });

  describe('getBusinessCentres', () => {
    it('should call odsService.getBusinessCentres', () => {
      // Act
      service.getBusinessCentres();

      // Assert
      expect(odsServiceGetBusinessCentres).toHaveBeenCalledTimes(1);
    });

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
