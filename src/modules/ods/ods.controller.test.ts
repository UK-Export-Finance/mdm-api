import { EXAMPLES } from '@ukef/constants';
import { mapIndustry } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';

const mockError = new Error('An error occurred');

const mockCustomerDetails = { urn: EXAMPLES.CUSTOMER.PARTYURN, name: 'Mock customer name' };
const mockDeal = { id: EXAMPLES.DEAL.ID, name: 'Mock deal name' };

const mockUkefIndustries = [EXAMPLES.ODS.INDUSTRY, EXAMPLES.ODS.INDUSTRY];
const mockUkefIndustryCodes = [EXAMPLES.ODS.INDUSTRY.industry_code, EXAMPLES.ODS.INDUSTRY.industry_code];

const mockMappedIndustry = mapIndustry(EXAMPLES.ODS.INDUSTRY);

describe('OdsController', () => {
  const mockLogger = new PinoLogger({});

  const odsService = new OdsService(null, mockLogger);
  let odsServiceFindBusinessCentreNonWorkingDays: jest.Mock;
  let odsServiceFindCustomer: jest.Mock;
  let odsServiceFindDeal: jest.Mock;
  let odsServiceGetUkefIndustries: jest.Mock;
  let odsServiceGetUkefIndustryCodes: jest.Mock;
  let findUkefIndustry: jest.Mock;

  let controller: OdsController;

  beforeEach(() => {
    odsServiceFindBusinessCentreNonWorkingDays = jest.fn();
    odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

    odsServiceFindCustomer = jest.fn().mockResolvedValueOnce(mockCustomerDetails);
    odsService.findCustomer = odsServiceFindCustomer;

    odsServiceFindDeal = jest.fn().mockResolvedValueOnce(mockDeal);
    odsService.findDeal = odsServiceFindDeal;

    odsServiceGetUkefIndustries = jest.fn().mockReturnValueOnce(mockUkefIndustries);
    odsService.getUkefIndustries = odsServiceGetUkefIndustries;

    odsServiceGetUkefIndustryCodes = jest.fn().mockReturnValueOnce(mockUkefIndustryCodes);
    odsService.getUkefIndustryCodes = odsServiceGetUkefIndustryCodes;

    findUkefIndustry = jest.fn().mockReturnValueOnce(mockMappedIndustry);
    odsService.findUkefIndustry = findUkefIndustry;

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

  describe('getUkefIndustries', () => {
    it('should call odsService.getUkefIndustries', () => {
      // Act
      controller.getUkefIndustries();

      // Assert
      expect(odsServiceGetUkefIndustries).toHaveBeenCalledTimes(1);
    });

    it('should return UKEF industries', () => {
      // Act
      const result = controller.getUkefIndustries();

      // Assert
      expect(result).toStrictEqual(mockUkefIndustries);
    });
  });

  describe('getUkefIndustryCodes', () => {
    it('should call odsService.getUkefIndustryCodes', () => {
      // Act
      controller.getUkefIndustryCodes();

      // Assert
      expect(odsServiceGetUkefIndustryCodes).toHaveBeenCalledTimes(1);
    });

    it('should return UKEF industry codes', () => {
      // Act
      const result = controller.getUkefIndustryCodes();

      // Assert
      expect(result).toStrictEqual(mockUkefIndustryCodes);
    });
  });

  describe('findUkefIndustry', () => {
    it.each([{ value: EXAMPLES.INDUSTRY.CODE }, { value: '' }, { value: 'invalid' }])(
      `should call odsService.findUkefIndustry with $value`,
      async ({ value }) => {
        // Act
        await controller.findUkefIndustry({ industryCode: value });

        // Assert
        expect(findUkefIndustry).toHaveBeenCalledTimes(1);
        expect(findUkefIndustry).toHaveBeenCalledWith(value);
      },
    );

    it('should return an industry when a valid industry code is provided', async () => {
      // Act
      const result = await controller.findUkefIndustry({ industryCode: EXAMPLES.INDUSTRY.CODE });

      // Assert
      expect(result).toEqual(mockMappedIndustry);
    });

    describe('when odsService.findUkefIndustry throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const odsService = new OdsService(null, mockLogger);

        odsService.findUkefIndustry = jest.fn().mockRejectedValueOnce(mockError);

        controller = new OdsController(odsService);

        // Act & Assert
        const promise = controller.findUkefIndustry({ industryCode: EXAMPLES.INDUSTRY.CODE });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
