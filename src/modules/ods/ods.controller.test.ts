import { CUSTOMERS } from '@ukef/constants';
import { when } from 'jest-when';

import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';

describe('OdsController', () => {
  let odsServiceFindCustomer: jest.Mock;

  let controller: OdsController;

  beforeEach(() => {
    const odsService = new OdsService(null, null);
    odsServiceFindCustomer = jest.fn();
    odsService.findCustomer = odsServiceFindCustomer;

    controller = new OdsController(odsService);
  });

  describe('findCustomer', () => {
    it('should return the customer when a valid customer URN is provided', async () => {
      const mockCustomerDetails = { urn: CUSTOMERS.EXAMPLES.PARTYURN, name: 'Test name' };

      when(odsServiceFindCustomer).calledWith(CUSTOMERS.EXAMPLES.PARTYURN).mockResolvedValueOnce(mockCustomerDetails);

      const customers = await controller.findCustomer({ urn: CUSTOMERS.EXAMPLES.PARTYURN });

      expect(customers).toEqual(mockCustomerDetails);
    });
  });
});
