import { EXAMPLES } from '@ukef/constants';
import { when } from 'jest-when';
import { PinoLogger } from 'nestjs-pino';

import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';

const mockError = new Error('An error occurred');

describe('OdsController', () => {
  const mockLogger = new PinoLogger({});

  const odsService = new OdsService(null, mockLogger);
  let odsServiceFindBusinessCentreNonWorkingDays: jest.Mock;
  let odsServiceFindCustomer: jest.Mock;
  let odsServiceFindDeal: jest.Mock;

  let controller: OdsController;

  beforeEach(() => {
    odsServiceFindBusinessCentreNonWorkingDays = jest.fn();
    odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

    odsServiceFindCustomer = jest.fn();
    odsService.findCustomer = odsServiceFindCustomer;

    odsServiceFindDeal = jest.fn();
    odsService.findDeal = odsServiceFindDeal;

    controller = new OdsController(odsService);
  });

  describe('findCustomer', () => {
    it.each([{ value: EXAMPLES.CUSTOMER.PARTYURN }, { value: '' }, { value: 'invalid' }])(
      `should call odsService.findCustomer with $value`,
      async ({ value }) => {
        // Act
        await controller.findCustomer({ urn: value });

        // Assert
        expect(odsServiceFindCustomer).toHaveBeenCalledTimes(1);
        expect(odsServiceFindCustomer).toHaveBeenCalledWith(value);
      },
    );

    it('should return a customer when a valid customer URN is provided', async () => {
      // Arrange
      const mockCustomerDetails = { urn: EXAMPLES.CUSTOMER.PARTYURN, name: 'Test customer name' };

      when(odsServiceFindCustomer).calledWith(EXAMPLES.CUSTOMER.PARTYURN).mockResolvedValueOnce(mockCustomerDetails);

      // Act
      const result = await controller.findCustomer({ urn: EXAMPLES.CUSTOMER.PARTYURN });

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
        const promise = controller.findCustomer({ urn: EXAMPLES.CUSTOMER.PARTYURN });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('findDeal', () => {
    it.each([{ value: EXAMPLES.DEAL.ID }, { value: '' }, { value: 'invalid' }])(`should call odsService.findDeal with $value`, async ({ value }) => {
      // Act
      await controller.findDeal({ id: value });

      // Assert
      expect(odsServiceFindDeal).toHaveBeenCalledTimes(1);
      expect(odsServiceFindDeal).toHaveBeenCalledWith(value);
    });

    it('should return a deal when a valid deal ID is provided', async () => {
      // Arrange
      const mockDeal = { id: EXAMPLES.DEAL.ID, name: 'Test deal name' };

      when(odsServiceFindDeal).calledWith(EXAMPLES.DEAL.ID).mockResolvedValueOnce(mockDeal);

      // Act
      const result = await controller.findDeal({ id: EXAMPLES.DEAL.ID });

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
        const promise = controller.findDeal({ id: EXAMPLES.DEAL.ID });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
