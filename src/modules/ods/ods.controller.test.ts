import { BadRequestException } from '@nestjs/common';
import { CUSTOMERS, ENUMS } from '@ukef/constants';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
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
      const mockCustomerDetails = { customerUrn: CUSTOMERS.EXAMPLES.PARTYURN, name: 'Test name' };

      when(odsServiceFindCustomer).calledWith(CUSTOMERS.EXAMPLES.PARTYURN).mockResolvedValueOnce(mockCustomerDetails);

      const customers = await controller.findCustomer({ customerUrn: CUSTOMERS.EXAMPLES.PARTYURN });

      expect(customers).toEqual(mockCustomerDetails);
    });

    it.each([{ path: { customerUrn: '123'} }])(
      'should throw BadRequestException if the customer URN is invalid',
      ({ path }) => {
        const getCustomers = (path) => () => controller.findCustomer(path);

        expect(getCustomers(path)).toThrow('One and just one search parameter is required');
        expect(getCustomers(path)).toThrow(BadRequestException);
      },
    );
  });
});
