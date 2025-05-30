import { CUSTOMERS, DEALS } from '@ukef/constants';
import { when } from 'jest-when';

import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';

describe('OdsController', () => {
  let odsServiceFindCustomer: jest.Mock;
  let odsServiceFindDeal: jest.Mock;

  let controller: OdsController;

  beforeEach(() => {
    const odsService = new OdsService(null, null);

    odsServiceFindCustomer = jest.fn();
    odsService.findCustomer = odsServiceFindCustomer;

    odsServiceFindDeal = jest.fn();
    odsService.findDeal = odsServiceFindDeal;

    controller = new OdsController(odsService);
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
  });

  describe('findDeal', () => {
    it('should call odsService.findDeal', async () => {
      // Act
      await controller.findDeal({ id: DEALS.EXAMPLES.DEAL_ID });

      // Assert
      expect(odsServiceFindDeal).toHaveBeenCalledTimes(1);

      expect(odsServiceFindDeal).toHaveBeenCalledWith(DEALS.EXAMPLES.DEAL_ID);
    });

    it('should return a deal when a valid deal ID is provided', async () => {
      // Arrange
      const mockDeal = { id: DEALS.EXAMPLES.DEAL_ID, name: 'Test deal name' };

      when(odsServiceFindDeal).calledWith(DEALS.EXAMPLES.DEAL_ID).mockResolvedValueOnce(mockDeal);

      // Act
      const result = await controller.findDeal({ id: DEALS.EXAMPLES.DEAL_ID });

      // Assert
      expect(result).toEqual(mockDeal);
    });
  });
});
