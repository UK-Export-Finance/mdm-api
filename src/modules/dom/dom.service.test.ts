import { MOCK_ODS_BUSINESS_CENTRES, MOCK_PRODUCT_CONFIGURATIONS } from '@ukef/constants';
import { mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { OdsService } from '../ods/ods.service';
import { DomService } from './dom.service';

const mockError = new Error('An error occurred');

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
    odsServiceGetBusinessCentres = jest.fn().mockResolvedValueOnce(MOCK_ODS_BUSINESS_CENTRES);

    odsService.getBusinessCentres = odsServiceGetBusinessCentres;

    service = new DomService(odsService, mockLogger);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getBusinessCentres', () => {
    it('should call odsService.getBusinessCentres', async () => {
      // Act
      await service.getBusinessCentres();

      // Assert
      expect(odsServiceGetBusinessCentres).toHaveBeenCalledTimes(1);
    });

    describe('when odsService.getBusinessCentres is successful', () => {
      it('should return mapped business centres', async () => {
        // Act
        const response = await service.getBusinessCentres();

        // Assert
        const expected = mapBusinessCentres(MOCK_ODS_BUSINESS_CENTRES);

        expect(response).toEqual(expected);
      });
    });

    describe('when odsService.getBusinessCentres returns an error', () => {
      beforeEach(() => {
        // Arrange
        odsServiceGetBusinessCentres = jest.fn().mockRejectedValueOnce(mockError);

        odsService.getBusinessCentres = odsServiceGetBusinessCentres;

        service = new DomService(odsService, mockLogger);
      });

      it('should thrown an error', async () => {
        // Act
        const promise = service.getBusinessCentres();

        // Assert
        const expected = new Error('Error getting DOM business centres');

        await expect(promise).rejects.toThrow(expected);
      });
    });
  });

  // TODO: getProductConfigurations

  describe('getProductConfigurations', () => {
    it('should return mock product configurations', () => {
      // Act
      const response = service.getProductConfigurations();

      // Assert
      expect(response).toEqual(MOCK_PRODUCT_CONFIGURATIONS);
    });
  });
});
