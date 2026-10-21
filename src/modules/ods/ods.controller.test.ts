import { jest } from '@jest/globals';
import { PinoLogger } from 'nestjs-pino';
import { EXAMPLES, ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES } from '@ukef/constants';
import { mapAccrualSchedule, mapIndustries, mapIndustry } from '@ukef/helpers';

import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';
import { OdsAccrualScheduleService } from './ods-accrual-schedule.service';
import { OdsAccrualsService } from './ods-accruals.service';
import { OdsCounterpartyRoleService } from './ods-counterparty-role.service';
import { OdsFacilityCategoryService } from './ods-facility-category.service';
import { OdsObligationSubtypeService } from './ods-obligation-subtype.service';
import { OdsProductConfigService } from './ods-product-config.service';

const mockError = new Error('An error occurred');

const mockCustomerDetails = { urn: EXAMPLES.CUSTOMER.PARTYURN, name: 'Mock customer name' };
const mockDeal = { dealId: EXAMPLES.DEAL.ID, name: 'Mock deal name', description: 'Mock deal description' };

const mockUkefIndustries = mapIndustries([EXAMPLES.ODS.INDUSTRY, EXAMPLES.ODS.INDUSTRY]);
const mockUkefIndustryCodes = [EXAMPLES.ODS.INDUSTRY.industry_code, EXAMPLES.ODS.INDUSTRY.industry_code];

const mockMappedIndustry = mapIndustry(EXAMPLES.ODS.INDUSTRY);
const mockUkefIndustryCode = EXAMPLES.UKEF_INDUSTRY_CODE;

const mockAccrualFrequency = {
  code: EXAMPLES.ACCRUAL_FREQUENCY.CODE,
  name: EXAMPLES.ACCRUAL_FREQUENCY.NAME,
  orderId: EXAMPLES.ACCRUAL_FREQUENCY.ORDER_ID,
  frequencyNumberOfUnits: EXAMPLES.ACCRUAL_FREQUENCY.FREQUENCY_NUMBER_OF_UNITS,
  frequencyUnit: EXAMPLES.ACCRUAL_FREQUENCY.FREQUENCY_UNIT,
  isActive: EXAMPLES.ACCRUAL_FREQUENCY.IS_ACTIVE,
};
const mockAccrualFrequencies = [mockAccrualFrequency, mockAccrualFrequency];

const mockAccrualScheduleClassification = {
  type: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.TYPE,
  typeCode: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.TYPE_CODE,
  code: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.CODE,
  description: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.DESCRIPTION,
  isActive: EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.IS_ACTIVE,
};
const mockAccrualScheduleClassifications = [mockAccrualScheduleClassification, mockAccrualScheduleClassification];

const mockAccrualSchedule = mapAccrualSchedule(EXAMPLES.ODS.ACCRUAL_SCHEDULE);
const mockAccrualSchedules = [mockAccrualSchedule, mockAccrualSchedule];

const mockCounterpartyRole = {
  roleType: EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE,
  name: EXAMPLES.COUNTERPARTY_ROLE.NAME,
  hasSharePercentage: EXAMPLES.COUNTERPARTY_ROLE.HAS_SHARE_PERCENTAGE,
  hasAssociatedPaymentCode: EXAMPLES.COUNTERPARTY_ROLE.HAS_ASSOCIATED_PAYMENT_CODE,
  isActive: EXAMPLES.COUNTERPARTY_ROLE.IS_ACTIVE,
};
const mockCounterpartyRoles = [mockCounterpartyRole, mockCounterpartyRole];

const mockFacilityCategory = {
  type: EXAMPLES.FACILITY_CATEGORY.TYPE,
  typeCode: EXAMPLES.FACILITY_CATEGORY.TYPE_CODE,
  code: EXAMPLES.FACILITY_CATEGORY.CODE,
  description: EXAMPLES.FACILITY_CATEGORY.DESCRIPTION,
  isActive: EXAMPLES.FACILITY_CATEGORY.IS_ACTIVE,
};
const mockFacilityCategories = [mockFacilityCategory, mockFacilityCategory];

const mockFeeType = {
  feeType: EXAMPLES.FEE_TYPE.FEE_TYPE,
  name: EXAMPLES.FEE_TYPE.NAME,
  classification: EXAMPLES.FEE_TYPE.CLASSIFICATION,
  expenseIncome: EXAMPLES.FEE_TYPE.EXPENSE_INCOME,
  isActive: EXAMPLES.FEE_TYPE.IS_ACTIVE,
  balanceCategory: EXAMPLES.FEE_TYPE.BALANCE_CATEGORY,
  baseBalanceCategory: EXAMPLES.FEE_TYPE.BASE_BALANCE_CATEGORY,
  nonFacilityCurrencySettlement: EXAMPLES.FEE_TYPE.NON_FACILITY_CURRENCY_SETTLEMENT,
  cappedBaseBalance: EXAMPLES.FEE_TYPE.CAPPED_BASE_BALANCE,
  effectiveDateDefault: EXAMPLES.FEE_TYPE.EFFECTIVE_DATE_DEFAULT,
  maturityDateDefault: EXAMPLES.FEE_TYPE.MATURITY_DATE_DEFAULT,
};
const mockFeeTypes = [mockFeeType, mockFeeType];

const mockObligationSubtype = {
  code: EXAMPLES.OBLIGATION_SUBTYPE.CODE,
  description: EXAMPLES.OBLIGATION_SUBTYPE.DESCRIPTION,
  balanceCategory: EXAMPLES.OBLIGATION_SUBTYPE.BALANCE_CATEGORY,
  isActive: EXAMPLES.OBLIGATION_SUBTYPE.IS_ACTIVE,
};
const mockObligationSubtypes = [mockObligationSubtype, mockObligationSubtype];

const mockObligationSubtypesWithProductTypes = [
  { ...mockObligationSubtype, productTypeCode: EXAMPLES.OBLIGATION_SUBTYPE_WITH_PRODUCT_TYPE.productTypeCode },
  { ...mockObligationSubtype, productTypeCode: EXAMPLES.OBLIGATION_SUBTYPE_WITH_PRODUCT_TYPE.productTypeCode },
];

describe('OdsController', () => {
  const mockLogger = new PinoLogger({});

  const odsService = new OdsService(null, mockLogger);
  const odsAccrualsService = new OdsAccrualsService(null, mockLogger);
  const odsAccrualScheduleService = new OdsAccrualScheduleService(null, mockLogger);
  const odsFacilityCategoryService = new OdsFacilityCategoryService(null, mockLogger);
  const odsCounterpartyRoleService = new OdsCounterpartyRoleService(null, mockLogger);
  const odsProductConfigService = new OdsProductConfigService(null, mockLogger);
  const odsObligationSubtypeService = new OdsObligationSubtypeService(null, odsProductConfigService, mockLogger);

  let odsServiceFindBusinessCentreNonWorkingDays: jest.MockedFunction<OdsService['findBusinessCentreNonWorkingDays']>;
  let odsServiceFindCustomer: jest.MockedFunction<OdsService['findCustomer']>;
  let odsServiceFindDeal: jest.MockedFunction<OdsService['findDeal']>;
  let odsServiceGetUkefIndustries: jest.MockedFunction<OdsService['getUkefIndustries']>;
  let odsServiceGetUkefIndustryCodes: jest.MockedFunction<OdsService['getUkefIndustryCodes']>;
  let odsServiceGetFeeTypes: jest.MockedFunction<OdsService['getFeeTypes']>;
  let odsServiceFindFeeType: jest.MockedFunction<OdsService['findFeeType']>;
  let odsAccrualsServiceGetAccrualFrequencies: jest.MockedFunction<OdsAccrualsService['getAccrualFrequencies']>;
  let odsAccrualServiceFindAccrualFrequency: jest.MockedFunction<OdsAccrualsService['findAccrualFrequency']>;
  let odsAccrualsServiceGetScheduleClassifications: jest.MockedFunction<OdsAccrualsService['getScheduleClassifications']>;
  let odsAccrualsServiceFindScheduleClassification: jest.MockedFunction<OdsAccrualsService['findScheduleClassification']>;
  let odsAccrualScheduleServiceGetAll: jest.MockedFunction<OdsAccrualScheduleService['getAll']>;
  let odsAccrualScheduleServiceFindOne: jest.MockedFunction<OdsAccrualScheduleService['findOne']>;
  let odsFacilityCategoryServiceGetAll: jest.MockedFunction<OdsFacilityCategoryService['getAll']>;
  let odsFacilityCategoryServiceFindOne: jest.MockedFunction<OdsFacilityCategoryService['findOne']>;
  let odsCounterpartyRoleServiceGetAll: jest.MockedFunction<OdsCounterpartyRoleService['getAll']>;
  let odsCounterpartyRoleServiceFindOne: jest.MockedFunction<OdsCounterpartyRoleService['findOne']>;
  let findUkefIndustry: jest.MockedFunction<OdsService['findUkefIndustry']>;
  let findUkefIndustryCodeByCompaniesHouseCode: jest.MockedFunction<OdsService['findUkefIndustryCodeByCompaniesHouseCode']>;
  let odsObligationSubtypeServiceGetAll: jest.MockedFunction<OdsObligationSubtypeService['getAll']>;
  let odsObligationSubtypeServiceGetAllWithProductTypes: jest.MockedFunction<OdsObligationSubtypeService['getAllWithProductTypes']>;
  let odsObligationSubtypeServiceFindOne: jest.MockedFunction<OdsObligationSubtypeService['findOne']>;

  let controller: OdsController;

  beforeEach(() => {
    odsServiceFindBusinessCentreNonWorkingDays = jest.fn<OdsService['findBusinessCentreNonWorkingDays']>();
    odsService.findBusinessCentreNonWorkingDays = odsServiceFindBusinessCentreNonWorkingDays;

    odsServiceFindCustomer = jest.fn<OdsService['findCustomer']>().mockResolvedValueOnce(mockCustomerDetails);
    odsService.findCustomer = odsServiceFindCustomer;

    odsServiceFindDeal = jest.fn<OdsService['findDeal']>().mockResolvedValueOnce(mockDeal);
    odsService.findDeal = odsServiceFindDeal;

    odsServiceGetUkefIndustries = jest.fn<OdsService['getUkefIndustries']>().mockResolvedValueOnce(mockUkefIndustries);
    odsService.getUkefIndustries = odsServiceGetUkefIndustries;

    odsServiceGetUkefIndustryCodes = jest.fn<OdsService['getUkefIndustryCodes']>().mockResolvedValueOnce(mockUkefIndustryCodes);
    odsService.getUkefIndustryCodes = odsServiceGetUkefIndustryCodes;

    odsServiceGetFeeTypes = jest.fn<OdsService['getFeeTypes']>().mockResolvedValueOnce(mockFeeTypes);
    odsService.getFeeTypes = odsServiceGetFeeTypes;

    odsServiceFindFeeType = jest.fn<OdsService['findFeeType']>().mockResolvedValueOnce(mockFeeType);
    odsService.findFeeType = odsServiceFindFeeType;

    findUkefIndustry = jest.fn<OdsService['findUkefIndustry']>().mockResolvedValueOnce(mockMappedIndustry);
    odsService.findUkefIndustry = findUkefIndustry;

    findUkefIndustryCodeByCompaniesHouseCode = jest
      .fn<OdsService['findUkefIndustryCodeByCompaniesHouseCode']>()
      .mockResolvedValueOnce({ ukefIndustryCode: mockUkefIndustryCode });
    odsService.findUkefIndustryCodeByCompaniesHouseCode = findUkefIndustryCodeByCompaniesHouseCode;

    odsAccrualsServiceGetAccrualFrequencies = jest.fn<OdsAccrualsService['getAccrualFrequencies']>().mockResolvedValueOnce(mockAccrualFrequencies);
    odsAccrualsService.getAccrualFrequencies = odsAccrualsServiceGetAccrualFrequencies;

    odsAccrualServiceFindAccrualFrequency = jest.fn<OdsAccrualsService['findAccrualFrequency']>().mockResolvedValueOnce(mockAccrualFrequency);
    odsAccrualsService.findAccrualFrequency = odsAccrualServiceFindAccrualFrequency;

    odsAccrualsServiceGetScheduleClassifications = jest
      .fn<OdsAccrualsService['getScheduleClassifications']>()
      .mockResolvedValueOnce(mockAccrualScheduleClassifications);
    odsAccrualsService.getScheduleClassifications = odsAccrualsServiceGetScheduleClassifications;

    odsAccrualsServiceFindScheduleClassification = jest
      .fn<OdsAccrualsService['findScheduleClassification']>()
      .mockResolvedValueOnce(mockAccrualScheduleClassification);
    odsAccrualsService.findScheduleClassification = odsAccrualsServiceFindScheduleClassification;

    odsAccrualScheduleServiceGetAll = jest.fn<OdsAccrualScheduleService['getAll']>().mockResolvedValueOnce(mockAccrualSchedules);
    odsAccrualScheduleService.getAll = odsAccrualScheduleServiceGetAll;

    odsAccrualScheduleServiceFindOne = jest.fn<OdsAccrualScheduleService['findOne']>().mockResolvedValueOnce(mockAccrualSchedule);
    odsAccrualScheduleService.findOne = odsAccrualScheduleServiceFindOne;

    odsFacilityCategoryServiceGetAll = jest.fn<OdsFacilityCategoryService['getAll']>().mockResolvedValueOnce(mockFacilityCategories);
    odsFacilityCategoryService.getAll = odsFacilityCategoryServiceGetAll;

    odsCounterpartyRoleServiceGetAll = jest.fn<OdsCounterpartyRoleService['getAll']>().mockResolvedValueOnce(mockCounterpartyRoles);
    odsCounterpartyRoleService.getAll = odsCounterpartyRoleServiceGetAll;

    odsCounterpartyRoleServiceFindOne = jest.fn<OdsCounterpartyRoleService['findOne']>().mockResolvedValueOnce(mockCounterpartyRole);
    odsCounterpartyRoleService.findOne = odsCounterpartyRoleServiceFindOne;

    odsFacilityCategoryServiceFindOne = jest.fn<OdsFacilityCategoryService['findOne']>().mockResolvedValueOnce(mockFacilityCategory);
    odsFacilityCategoryService.findOne = odsFacilityCategoryServiceFindOne;

    odsObligationSubtypeServiceGetAll = jest.fn<OdsObligationSubtypeService['getAll']>().mockResolvedValueOnce(mockObligationSubtypes);
    odsObligationSubtypeService.getAll = odsObligationSubtypeServiceGetAll;

    odsObligationSubtypeServiceGetAllWithProductTypes = jest
      .fn<OdsObligationSubtypeService['getAllWithProductTypes']>()
      .mockResolvedValueOnce(mockObligationSubtypesWithProductTypes);
    odsObligationSubtypeService.getAllWithProductTypes = odsObligationSubtypeServiceGetAllWithProductTypes;

    odsObligationSubtypeServiceFindOne = jest.fn<OdsObligationSubtypeService['findOne']>().mockResolvedValueOnce(mockObligationSubtype);
    odsObligationSubtypeService.findOne = odsObligationSubtypeServiceFindOne;

    controller = new OdsController(
      odsService,
      odsAccrualsService,
      odsAccrualScheduleService,
      odsCounterpartyRoleService,
      odsFacilityCategoryService,
      odsObligationSubtypeService,
    );
  });

  describe('getAccrualFrequencies', () => {
    it('should call odsAccrualsService.getAccrualFrequencies', async () => {
      // Act
      await controller.getAccrualFrequencies();

      // Assert
      expect(odsAccrualsServiceGetAccrualFrequencies).toHaveBeenCalledTimes(1);
    });

    it('should return accrual frequencies', async () => {
      // Act
      const result = await controller.getAccrualFrequencies();

      // Assert
      expect(result).toStrictEqual(mockAccrualFrequencies);
    });
  });

  describe('findAccrualFrequency', () => {
    const mockFrequencyCode = EXAMPLES.ACCRUAL_FREQUENCY.CODE;

    it('should call odsAccrualsService.findAccrualFrequency', async () => {
      // Act
      await controller.findAccrualFrequency({ frequencyCode: mockFrequencyCode });

      // Assert
      expect(odsAccrualServiceFindAccrualFrequency).toHaveBeenCalledTimes(1);
      expect(odsAccrualServiceFindAccrualFrequency).toHaveBeenCalledWith(mockFrequencyCode);
    });

    it('should return an accrual frequency', async () => {
      // Act
      const result = await controller.findAccrualFrequency({ frequencyCode: mockFrequencyCode });

      // Assert
      expect(result).toStrictEqual(mockAccrualFrequency);
    });

    describe('when odsAccrualsService.findAccrualFrequency throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        odsAccrualsService.findAccrualFrequency = jest.fn<OdsAccrualsService['findAccrualFrequency']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          odsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findAccrualFrequency({ frequencyCode: mockFrequencyCode });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getAccrualSchedules', () => {
    it('should call odsAccrualScheduleService.getAll', async () => {
      // Act
      await controller.getAccrualSchedules();

      // Assert
      expect(odsAccrualScheduleServiceGetAll).toHaveBeenCalledTimes(1);
    });

    it('should return accrual schedules', async () => {
      // Act
      const result = await controller.getAccrualSchedules();

      // Assert
      expect(result).toStrictEqual(mockAccrualSchedules);
    });
  });

  describe('findAccrualSchedule', () => {
    const mockScheduleCode = EXAMPLES.ODS.ACCRUAL_SCHEDULE.code;

    it('should call odsAccrualScheduleService.findOne', async () => {
      // Act
      await controller.findAccrualSchedule({ scheduleCode: mockScheduleCode });

      // Assert
      expect(odsAccrualScheduleServiceFindOne).toHaveBeenCalledTimes(1);
      expect(odsAccrualScheduleServiceFindOne).toHaveBeenCalledWith(mockScheduleCode);
    });

    it('should return an accrual schedule', async () => {
      // Act
      const result = await controller.findAccrualSchedule({ scheduleCode: mockScheduleCode });

      // Assert
      expect(result).toStrictEqual(mockAccrualSchedule);
    });

    describe('when odsAccrualScheduleService.findOne throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        odsAccrualScheduleService.findOne = jest.fn<OdsAccrualScheduleService['findOne']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          odsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findAccrualSchedule({ scheduleCode: mockScheduleCode });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getAdditionalRates', () => {
    it('should call odsAccrualsService.getScheduleClassifications', async () => {
      // Act
      await controller.getAdditionalRates();

      // Assert
      expect(odsAccrualsServiceGetScheduleClassifications).toHaveBeenCalledTimes(1);
    });

    it('should return accrual schedule classifications', async () => {
      // Act
      const result = await controller.getAdditionalRates();

      // Assert
      expect(result).toStrictEqual(mockAccrualScheduleClassifications);
    });
  });

  describe('findAdditionalRate', () => {
    const mockRateCode = EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.CODE;

    it('should call odsAccrualsService.findScheduleClassification', async () => {
      // Act
      await controller.findAdditionalRate({ rateCode: mockRateCode });

      // Assert
      expect(odsAccrualsServiceFindScheduleClassification).toHaveBeenCalledTimes(1);
      expect(odsAccrualsServiceFindScheduleClassification).toHaveBeenCalledWith(ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES.ADDITIONAL_RATE_TYPE, mockRateCode);
    });

    it('should return an accrual schedule classification', async () => {
      // Act
      const result = await controller.findAdditionalRate({ rateCode: mockRateCode });

      // Assert
      expect(result).toStrictEqual(mockAccrualScheduleClassification);
    });

    describe('when odsAccrualsService.findScheduleClassification throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        odsAccrualsService.findScheduleClassification = jest.fn<OdsAccrualsService['findScheduleClassification']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          odsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findAdditionalRate({ rateCode: mockRateCode });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getBaseRates', () => {
    it('should call odsAccrualsService.getScheduleClassifications', async () => {
      // Act
      await controller.getBaseRates();

      // Assert
      expect(odsAccrualsServiceGetScheduleClassifications).toHaveBeenCalledTimes(1);

      expect(odsAccrualsServiceGetScheduleClassifications).toHaveBeenCalledWith(ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES.BASE_RATE_TYPE);
    });

    it('should return accrual schedule classifications', async () => {
      // Act
      const result = await controller.getBaseRates();

      // Assert
      expect(result).toStrictEqual(mockAccrualScheduleClassifications);
    });
  });

  describe('findBaseRate', () => {
    const mockRateCode = EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.BASE_RATE.CODE;

    it('should call odsAccrualsService.findScheduleClassification', async () => {
      // Act
      await controller.findBaseRate({ rateCode: mockRateCode });

      // Assert
      expect(odsAccrualsServiceFindScheduleClassification).toHaveBeenCalledTimes(1);
      expect(odsAccrualsServiceFindScheduleClassification).toHaveBeenCalledWith(ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES.BASE_RATE_TYPE, mockRateCode);
    });

    it('should return an accrual schedule classification', async () => {
      // Act
      const result = await controller.findBaseRate({ rateCode: mockRateCode });

      // Assert
      expect(result).toStrictEqual(mockAccrualScheduleClassification);
    });

    describe('when odsAccrualsService.findScheduleClassification throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        odsAccrualsService.findScheduleClassification = jest.fn<OdsAccrualsService['findScheduleClassification']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          odsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findBaseRate({ rateCode: mockRateCode });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getCounterpartyRoles', () => {
    it('should call odsCounterpartyRoleService.getAll', async () => {
      // Act
      await controller.getCounterpartyRoles();

      // Assert
      expect(odsCounterpartyRoleServiceGetAll).toHaveBeenCalledTimes(1);
    });

    it('should return counterparty roles', async () => {
      // Act
      const result = await controller.getCounterpartyRoles();

      // Assert
      expect(result).toStrictEqual(mockCounterpartyRoles);
    });
  });

  describe('findCounterpartyRole', () => {
    const mockRoleType = EXAMPLES.COUNTERPARTY_ROLE.ROLE_TYPE;

    it('should call odsCounterpartyRoleService.findOne', async () => {
      // Act
      await controller.findCounterpartyRole({ roleType: mockRoleType });

      // Assert
      expect(odsCounterpartyRoleServiceFindOne).toHaveBeenCalledTimes(1);
      expect(odsCounterpartyRoleServiceFindOne).toHaveBeenCalledWith(mockRoleType);
    });

    it('should return a counterparty role', async () => {
      // Act
      const result = await controller.findCounterpartyRole({ roleType: mockRoleType });

      // Assert
      expect(result).toStrictEqual(mockCounterpartyRole);
    });

    describe('when odsCounterpartyRoleService.findOne throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        odsCounterpartyRoleService.findOne = jest.fn<OdsCounterpartyRoleService['findOne']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          odsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findCounterpartyRole({ roleType: mockRoleType });

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
        odsFacilityCategoryService.findOne = jest.fn<OdsFacilityCategoryService['findOne']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          odsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findFacilityCategory({ categoryCode: mockCategoryCode });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getFeeTypes', () => {
    it('should call odsService.getFeeTypes', async () => {
      // Act
      await controller.getFeeTypes();

      // Assert
      expect(odsServiceGetFeeTypes).toHaveBeenCalledTimes(1);
    });

    it('should return fee types', async () => {
      // Act
      const result = await controller.getFeeTypes();

      // Assert
      expect(result).toStrictEqual(mockFeeTypes);
    });
  });

  describe('findFeeType', () => {
    const mockFeeTypeCode = mockFeeType.feeType;

    it('should call odsService.findFeeType', async () => {
      // Act
      await controller.findFeeType({ feeTypeCode: mockFeeTypeCode });

      // Assert
      expect(odsServiceFindFeeType).toHaveBeenCalledTimes(1);
      expect(odsServiceFindFeeType).toHaveBeenCalledWith(mockFeeTypeCode);
    });

    it('should return a fee type', async () => {
      // Act
      const result = await controller.findFeeType({ feeTypeCode: mockFeeTypeCode });

      // Assert
      expect(result).toStrictEqual(mockFeeType);
    });

    describe('when odsService.findFeeType throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const localOdsService = new OdsService(null, mockLogger);

        localOdsService.findFeeType = jest.fn<OdsService['findFeeType']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          localOdsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findFeeType({ feeTypeCode: mockFeeTypeCode });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('getObligationSubtypes', () => {
    it('should call odsObligationSubtypeService.getAll', async () => {
      // Act
      await controller.getObligationSubtypes();

      // Assert
      expect(odsObligationSubtypeServiceGetAll).toHaveBeenCalledTimes(1);
    });

    it('should return obligation subtypes', async () => {
      // Act
      const result = await controller.getObligationSubtypes();

      // Assert
      expect(result).toStrictEqual(mockObligationSubtypes);
    });
  });

  describe('getObligationSubtypesWithProductCodes', () => {
    it('should call odsObligationSubtypeService.getAllWithProductTypes', async () => {
      // Act
      await controller.getObligationSubtypesWithProductCodes();

      // Assert
      expect(odsObligationSubtypeServiceGetAllWithProductTypes).toHaveBeenCalledTimes(1);
    });

    it('should return obligation subtypes with product types', async () => {
      // Act
      const result = await controller.getObligationSubtypesWithProductCodes();

      // Assert
      expect(result).toStrictEqual(mockObligationSubtypesWithProductTypes);
    });
  });

  describe('findObligationSubtype', () => {
    const mockSubtypeCode = EXAMPLES.OBLIGATION_SUBTYPE.CODE;

    it('should call odsObligationSubtypeService.findOne', async () => {
      // Act
      await controller.findObligationSubtype({ subtypeCode: mockSubtypeCode });

      // Assert
      expect(odsObligationSubtypeServiceFindOne).toHaveBeenCalledTimes(1);
      expect(odsObligationSubtypeServiceFindOne).toHaveBeenCalledWith(mockSubtypeCode);
    });

    it('should return an obligation subtype', async () => {
      // Act
      const result = await controller.findObligationSubtype({ subtypeCode: mockSubtypeCode });

      // Assert
      expect(result).toStrictEqual(mockObligationSubtype);
    });

    describe('when odsObligationSubtypeService.findOne throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        odsObligationSubtypeService.findOne = jest.fn<OdsObligationSubtypeService['findOne']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          odsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findObligationSubtype({ subtypeCode: mockSubtypeCode });

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
        const localOdsService = new OdsService(null, mockLogger);

        localOdsService.findCustomer = jest.fn<OdsService['findCustomer']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          localOdsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

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
        const localOdsService = new OdsService(null, mockLogger);

        localOdsService.findDeal = jest.fn<OdsService['findDeal']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          localOdsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

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
        const localOdsService = new OdsService(null, mockLogger);

        localOdsService.findUkefIndustry = jest.fn<OdsService['findUkefIndustry']>().mockRejectedValueOnce(mockError);

        controller = new OdsController(
          localOdsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findUkefIndustry({ industryCode: EXAMPLES.INDUSTRY.CODE });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });

  describe('findUkefIndustryCodeByCompaniesHouseCode', () => {
    it.each([{ value: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE }, { value: '' }, { value: 'invalid' }])(
      `should call odsService.findUkefIndustryCodeByCompaniesHouseCode with $value`,
      async ({ value }) => {
        // Act
        await controller.findUkefIndustryCode({ companiesHouseIndustryCode: value });

        // Assert
        expect(findUkefIndustryCodeByCompaniesHouseCode).toHaveBeenCalledTimes(1);
        expect(findUkefIndustryCodeByCompaniesHouseCode).toHaveBeenCalledWith(value);
      },
    );

    it('should return an industry when a valid industry code is provided', async () => {
      // Act
      const result = await controller.findUkefIndustryCode({ companiesHouseIndustryCode: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE });

      // Assert
      const expected = {
        ukefIndustryCode: EXAMPLES.UKEF_INDUSTRY_CODE,
      };

      expect(result).toEqual(expected);
    });

    describe('when odsService.findUkefIndustryCodeByCompaniesHouseCode throws an error', () => {
      it('should throw an error', async () => {
        // Arrange
        const localOdsService = new OdsService(null, mockLogger);

        localOdsService.findUkefIndustryCodeByCompaniesHouseCode = jest
          .fn<OdsService['findUkefIndustryCodeByCompaniesHouseCode']>()
          .mockRejectedValueOnce(mockError);

        controller = new OdsController(
          localOdsService,
          odsAccrualsService,
          odsAccrualScheduleService,
          odsCounterpartyRoleService,
          odsFacilityCategoryService,
          odsObligationSubtypeService,
        );

        // Act & Assert
        const promise = controller.findUkefIndustryCode({ companiesHouseIndustryCode: EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE });

        await expect(promise).rejects.toThrow(mockError);
      });
    });
  });
});
