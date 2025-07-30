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

  let service: DomService;

  beforeEach(() => {
    service = new DomService(odsService, mockLogger);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('findBusinessCentre', () => {
    describe('when a business centre is found', () => {
      it('should return the business centre', () => {
        // Arrange
        const mockCentreCode = DOM_BUSINESS_CENTRES.CM_YAO.CODE;

        // Act
        const response = service.findBusinessCentre(mockCentreCode);

        // Assert
        const expected = DOM_BUSINESS_CENTRES.CM_YAO;

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
