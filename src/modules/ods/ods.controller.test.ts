import { BUSINESS_CENTRE, CUSTOMERS, DEALS } from '@ukef/constants';
import { when } from 'jest-when';
import { PinoLogger } from 'nestjs-pino';

import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';

const mockError = new Error('An error occurred');

describe('OdsController', () => {
  const mockLogger = new PinoLogger({});

  const odsService = new OdsService(null, mockLogger);
  let odsServiceGetBusinessCentres: jest.Mock;
  let odsServiceFindCustomer: jest.Mock;
  let odsServiceFindDeal: jest.Mock;

  let controller: OdsController;

  beforeEach(() => {
    odsServiceGetBusinessCentres = jest.fn();
    odsService.getBusinessCentres = odsServiceGetBusinessCentres;

    odsServiceFindCustomer = jest.fn();
    odsService.findCustomer = odsServiceFindCustomer;

    odsServiceFindDeal = jest.fn();
    odsService.findDeal = odsServiceFindDeal;

    controller = new OdsController(odsService);
  });

  describe('getBusinessCentres', () => {
    it('should call odsService.getBusinessCentres', async () => {
      // Act
      await controller.getBusinessCentres();

      // Assert
      expect(odsServiceGetBusinessCentres).toHaveBeenCalledTimes(1);
    });

    it('should return business centres', async () => {
      // Arrange
      const mockBusinessCentres = [
        {
          code: BUSINESS_CENTRE.EXAMPLES.CODE,
          name: BUSINESS_CENTRE.EXAMPLES.NAME,
        },
      ];

      odsService.getBusinessCentres = jest.fn().mockResolvedValueOnce(mockBusinessCentres);

      controller = new OdsController(odsService);

      // Act
      const result = await controller.getBusinessCentres();

      // Assert
      expect(result).toEqual(mockBusinessCentres);
    });

    describe('when odsService.getBusinessCentres throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const odsService = new OdsService(null, mockLogger);

        odsService.getBusinessCentres = jest.fn().mockRejectedValueOnce(mockError);

        controller = new OdsController(odsService);

        // Act & Assert
        const promise = controller.getBusinessCentres();

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('findCustomer', () => {
    it('should call odsService.findCustomer', async () => {
      // Act
      await controller.findCustomer({ urn: CUSTOMERS.EXAMPLES.PARTYURN });

      // Assert
      expect(odsServiceFindCustomer).toHaveBeenCalledTimes(1);

      expect(odsServiceFindCustomer).toHaveBeenCalledWith(CUSTOMERS.EXAMPLES.PARTYURN);
    });

    it('should return a customer when a valid customer URN is provided', async () => {
      // Arrange
      const mockCustomerDetails = { urn: CUSTOMERS.EXAMPLES.PARTYURN, name: 'Test customer name' };

      when(odsServiceFindCustomer).calledWith(CUSTOMERS.EXAMPLES.PARTYURN).mockResolvedValueOnce(mockCustomerDetails);

      // Act
      const result = await controller.findCustomer({ urn: CUSTOMERS.EXAMPLES.PARTYURN });

      // Assert
      expect(result).toEqual(mockCustomerDetails);
    });

    describe('when odsService.findCustomer throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const odsService = new OdsService(null, mockLogger);

        odsService.findCustomer = jest.fn().mockRejectedValueOnce(mockError);

        controller = new OdsController(odsService);

        // Act & Assert
        const promise = controller.findCustomer({ urn: CUSTOMERS.EXAMPLES.PARTYURN });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('findDeal', () => {
    it('should call odsService.findDeal', async () => {
      // Act
      await controller.findDeal({ id: DEALS.EXAMPLES.ID });

      // Assert
      expect(odsServiceFindDeal).toHaveBeenCalledTimes(1);

      expect(odsServiceFindDeal).toHaveBeenCalledWith(DEALS.EXAMPLES.ID);
    });

    it('should return a deal when a valid deal ID is provided', async () => {
      // Arrange
      const mockDeal = { id: DEALS.EXAMPLES.ID, name: 'Test deal name' };

      when(odsServiceFindDeal).calledWith(DEALS.EXAMPLES.ID).mockResolvedValueOnce(mockDeal);

      // Act
      const result = await controller.findDeal({ id: DEALS.EXAMPLES.ID });

      // Assert
      expect(result).toEqual(mockDeal);
    });

    describe('when odsService.findDeal throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const odsService = new OdsService(null, mockLogger);

        odsService.findDeal = jest.fn().mockRejectedValueOnce(mockError);

        controller = new OdsController(odsService);

        // Act & Assert
        const promise = controller.findDeal({ id: DEALS.EXAMPLES.ID });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
