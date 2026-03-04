import { EXAMPLES } from '@ukef/constants';
import { mapIndustry } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';
import { OdsAccrualsService } from './ods-accruals.service';
import { OdsFacilityCategoryService } from './ods-facility-category.service';

const mockError = new Error('An error occurred');

const mockCustomerDetails = { urn: EXAMPLES.CUSTOMER.PARTYURN, name: 'Mock customer name' };
const mockDeal = { id: EXAMPLES.DEAL.ID, name: 'Mock deal name' };

const mockUkefIndustries = [EXAMPLES.ODS.INDUSTRY, EXAMPLES.ODS.INDUSTRY];
const mockUkefIndustryCodes = [EXAMPLES.ODS.INDUSTRY.industry_code, EXAMPLES.ODS.INDUSTRY.industry_code];

const mockMappedIndustry = mapIndustry(EXAMPLES.ODS.INDUSTRY);

const mockAccrualScheduleClassification = EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION;
const mockAccrualScheduleClassifications = [mockAccrualScheduleClassification, mockAccrualScheduleClassification];

const mockFacilityCategory = EXAMPLES.FACILITY_CATEGORY;
const mockFacilityCategories = [mockFacilityCategory, mockFacilityCategory];

describe('OdsController', () => {
  const mockLogger = new PinoLogger({});

  const odsService = new OdsService(null, mockLogger);
  const odsAccrualsService = new OdsAccrualsService(null, mockLogger);
  const odsFacilityCategoryService = new OdsFacilityCategoryService(null, mockLogger);

  let odsServiceFindBusinessCentreNonWorkingDays: jest.Mock;
  let odsServiceFindCustomer: jest.Mock;
  let odsServiceFindDeal: jest.Mock;
  let odsServiceGetUkefIndustries: jest.Mock;
  let odsServiceGetUkefIndustryCodes: jest.Mock;
  let odsAccrualsServiceGetScheduleClassifications: jest.Mock;
  let odsAccrualsServiceFindScheduleClassification: jest.Mock;
  let odsFacilityCategoryServiceGetAll: jest.Mock;
  let odsFacilityCategoryServiceFindOne: jest.Mock;
  let findUkefIndustry: jest.Mock;

  let controller: OdsController;

  beforeEach(() => {
    odsServiceFindBusinessCentreNonWorkingDays = jest.fn();
    odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

    odsServiceFindCustomer = jest.fn().mockResolvedValueOnce(mockCustomerDetails);
    odsService.findCustomer = odsServiceFindCustomer;

    odsServiceFindDeal = jest.fn().mockResolvedValueOnce(mockDeal);
    odsService.findDeal = odsServiceFindDeal;

    odsServiceGetUkefIndustries = jest.fn().mockResolvedValueOnce(mockUkefIndustries);
    odsService.getUkefIndustries = odsServiceGetUkefIndustries;

    odsServiceGetUkefIndustryCodes = jest.fn().mockResolvedValueOnce(mockUkefIndustryCodes);
    odsService.getUkefIndustryCodes = odsServiceGetUkefIndustryCodes;

    findUkefIndustry = jest.fn().mockResolvedValueOnce(mockMappedIndustry);
    odsService.findUkefIndustry = findUkefIndustry;

    odsAccrualsServiceGetScheduleClassifications = jest.fn().mockResolvedValueOnce(mockAccrualScheduleClassifications);
    odsAccrualsService.getScheduleClassifications = odsAccrualsServiceGetScheduleClassifications;

    odsAccrualsServiceFindScheduleClassification = jest.fn().mockResolvedValueOnce(mockAccrualScheduleClassification);
    odsAccrualsService.findScheduleClassification = odsAccrualsServiceFindScheduleClassification;

    odsFacilityCategoryServiceGetAll = jest.fn().mockResolvedValueOnce(mockFacilityCategories);
    odsFacilityCategoryService.getAll = odsFacilityCategoryServiceGetAll;

    odsFacilityCategoryServiceFindOne = jest.fn().mockResolvedValueOnce(mockFacilityCategory);
    odsFacilityCategoryService.findOne = odsFacilityCategoryServiceFindOne;

    controller = new OdsController(odsService, odsAccrualsService, odsFacilityCategoryService);
  });

  describe('getAccrualSchedules', () => {
    it('should call odsAccrualsService.getScheduleClassifications', async () => {
      // Act
      await controller.getAccrualScheduleClassifications();

      // Assert
      expect(odsAccrualsServiceGetScheduleClassifications).toHaveBeenCalledTimes(1);
    });

    it('should return accrual schedule classifications', async () => {
      // Act
      const result = await controller.getAccrualScheduleClassifications();

      // Assert
      expect(result).toStrictEqual(mockAccrualScheduleClassifications);
    });
  });

  describe('findAccrualScheduleClassification', () => {
    const mockClassificationCode = EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.CODE;

    it('should call odsAccrualsService.findScheduleClassification', async () => {
      // Act
      await controller.findAccrualScheduleClassification({ classificationCode: mockClassificationCode });

      // Assert
      expect(odsAccrualsServiceFindScheduleClassification).toHaveBeenCalledTimes(1);
      expect(odsAccrualsServiceFindScheduleClassification).toHaveBeenCalledWith(mockClassificationCode);
    });

    it('should return an accrual schedule classification', async () => {
      // Act
      const result = await controller.findAccrualScheduleClassification({ classificationCode: mockClassificationCode });

      // Assert
      expect(result).toStrictEqual(mockAccrualScheduleClassification);
    });

    describe('when odsAccrualsService.findScheduleClassification throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const odsService = new OdsService(null, mockLogger);

        odsAccrualsService.findScheduleClassification = jest.fn().mockRejectedValueOnce(mockError);

        controller = new OdsController(odsService, odsAccrualsService, odsFacilityCategoryService);

        // Act & Assert
        const promise = controller.findAccrualScheduleClassification({ classificationCode: mockClassificationCode });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getFacilityCategories', () => {
    it('should call odsFacilityCategoryService.getAll', async () => {
      // Act
      await controller.getFacilityCategories();

      // Assert
      expect(odsFacilityCategoryServiceGetAll).toHaveBeenCalledTimes(1);
    });

    it('should return facility categories', async () => {
      // Act
      const result = await controller.getFacilityCategories();

      // Assert
      expect(result).toStrictEqual(mockFacilityCategories);
    });
  });

  describe('findFacilityCategory', () => {
    const mockCategoryCode = EXAMPLES.FACILITY_CATEGORY.CODE;

    it('should call odsFacilityCategoryService.findOne', async () => {
      // Act
      await controller.findFacilityCategory({ categoryCode: mockCategoryCode });

      // Assert
      expect(odsFacilityCategoryServiceFindOne).toHaveBeenCalledTimes(1);
      expect(odsFacilityCategoryServiceFindOne).toHaveBeenCalledWith(mockCategoryCode);
    });

    it('should return a facility category', async () => {
      // Act
      const result = await controller.findFacilityCategory({ categoryCode: mockCategoryCode });

      // Assert
      expect(result).toStrictEqual(mockFacilityCategory);
    });

    describe('when odsFacilityCategoryService.findOne throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const odsService = new OdsService(null, mockLogger);

        odsFacilityCategoryService.findOne = jest.fn().mockRejectedValueOnce(mockError);

        controller = new OdsController(odsService, odsAccrualsService, odsFacilityCategoryService);

        // Act & Assert
        const promise = controller.findFacilityCategory({ categoryCode: mockCategoryCode });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
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

        controller = new OdsController(odsService, odsAccrualsService, odsFacilityCategoryService);

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

        controller = new OdsController(odsService, odsAccrualsService, odsFacilityCategoryService);

        // Act & Assert
        const promise = controller.findDeal({ id: EXAMPLES.DEAL.ID });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getUkefIndustries', () => {
    it('should call odsService.getUkefIndustries', async () => {
      // Act
      await controller.getUkefIndustries();

      // Assert
      expect(odsServiceGetUkefIndustries).toHaveBeenCalledTimes(1);
    });

    it('should return UKEF industries', async () => {
      // Act
      const result = await controller.getUkefIndustries();

      // Assert
      expect(result).toStrictEqual(mockUkefIndustries);
    });
  });

  describe('getUkefIndustryCodes', () => {
    it('should call odsService.getUkefIndustryCodes', async () => {
      // Act
      await controller.getUkefIndustryCodes();

      // Assert
      expect(odsServiceGetUkefIndustryCodes).toHaveBeenCalledTimes(1);
    });

    it('should return UKEF industry codes', async () => {
      // Act
      const result = await controller.getUkefIndustryCodes();

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

        controller = new OdsController(odsService, odsAccrualsService, odsFacilityCategoryService);

        // Act & Assert
        const promise = controller.findUkefIndustry({ industryCode: EXAMPLES.INDUSTRY.CODE });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
