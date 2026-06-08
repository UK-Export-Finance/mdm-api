import { GetProductConfigOdsResponse } from '@ukef/modules/ods/dto';

import { mapProductConfig } from './map-product-config';

const NOT_APPLICABLE = 'NOT_APPLICABLE';

const baseOdsConfig = {
  name: 'Some Product',
  shortName: 'SP',
  productActive: true,
  configuration: {
    creditType: 'term',
    instrumentType: 'Insurance',
    repaymentType: 'Scheduled',
    leadDays: {
      repayments: 5,
      interestAccruals: 5,
      accruingFees: 5,
    },
  },
  counterpartyRoleTypes: ['CRT001', 'CRT004'],
  facilityCategoryTypes: ['FCT001'],
  feeTypes: ['BEX', 'PLA'],
  obligationSubtypes: ['OST001', 'OST002'],
  account: ['2', '3'],
  additionalRateTypes: ['ARTOTH'],
  baseRateTypes: ['BRTOTH'],
  accrualScheduleTypes: [{ code: 'PAC01', cashIndicator: true }],
};

/** PRT001 is in dom-product-config.json — config fields should be read from JSON. */
const mockOdsProductConfigKnown: GetProductConfigOdsResponse = { ...baseOdsConfig, productType: 'PRT001' };

/** PRTUNKNOWN is not in dom-product-config.json — config fields should fall back to NOT_APPLICABLE. */
const mockOdsProductConfigUnknown: GetProductConfigOdsResponse = { ...baseOdsConfig, productType: 'PRTUNKNOWN' };

describe('mapProductConfig', () => {
  it('should passthrough productType, name, shortName', () => {
    const result = mapProductConfig(mockOdsProductConfigKnown);

    expect(result.productType).toEqual(mockOdsProductConfigKnown.productType);
    expect(result.name).toEqual(mockOdsProductConfigKnown.name);
    expect(result.shortName).toEqual(mockOdsProductConfigKnown.shortName);
  });

  it('should passthrough configuration.creditType, instrumentType, leadDays, and repaymentType', () => {
    const result = mapProductConfig(mockOdsProductConfigKnown);

    expect(result.configuration.creditType).toEqual(mockOdsProductConfigKnown.configuration.creditType.toUpperCase());
    expect(result.configuration.instrumentType).toEqual(mockOdsProductConfigKnown.configuration.instrumentType);
    expect(result.configuration.leadDays).toEqual(mockOdsProductConfigKnown.configuration.leadDays);
    expect(result.configuration.repaymentType).toEqual(mockOdsProductConfigKnown.configuration.repaymentType);
  });

  describe('when the product type exists in dom-product-config.json', () => {
    it('should read date-requirement config fields from the JSON', () => {
      const result = mapProductConfig(mockOdsProductConfigKnown);

      // PRT001 values from dom-product-config.json
      expect(result.configuration.commitmentDate).toEqual(NOT_APPLICABLE);
      expect(result.configuration.issuedDate).toEqual(NOT_APPLICABLE);
      expect(result.configuration.effectiveDate).toEqual('REQUIRED');
      expect(result.configuration.availabilityEndDate).toEqual(NOT_APPLICABLE);
      expect(result.configuration.expiryDate).toEqual('REQUIRED');
      expect(result.configuration.participations).toEqual('OPTIONAL');
      expect(result.configuration.scheduledRepayments).toEqual('REQUIRED');
      expect(result.configuration.nonCashObligations).toEqual('REQUIRED');
      expect(result.configuration.cashObligations).toEqual(NOT_APPLICABLE);
      expect(result.configuration.accrualSchedule).toEqual(NOT_APPLICABLE);
      expect(result.configuration.pimOwner).toEqual('REQUIRED');
      expect(result.configuration.riskRating).toEqual('REQUIRED');
      expect(result.configuration.preCreditPeriod).toEqual('REQUIRED');
      expect(result.configuration.creditPeriod).toEqual('REQUIRED');
      expect(result.configuration.lossGivenDefault).toEqual('REQUIRED');
      expect(result.configuration.provisionRate).toEqual('REQUIRED');
      expect(result.configuration.forecastYear).toEqual('REQUIRED');
      expect(result.configuration.bankRate).toEqual(NOT_APPLICABLE);
    });

    it('should read configuration.fees from the JSON', () => {
      const result = mapProductConfig(mockOdsProductConfigKnown);

      // PRT001 values from dom-product-config.json
      expect(result.configuration.fees.creation).toEqual('REQUIRED');
      expect(result.configuration.fees.inLife).toEqual('OPTIONAL');
    });
  });

  describe('when the product type does not exist in dom-product-config.json', () => {
    it('should default date-requirement config fields to NOT_APPLICABLE', () => {
      const result = mapProductConfig(mockOdsProductConfigUnknown);

      expect(result.configuration.commitmentDate).toEqual(NOT_APPLICABLE);
      expect(result.configuration.issuedDate).toEqual(NOT_APPLICABLE);
      expect(result.configuration.effectiveDate).toEqual(NOT_APPLICABLE);
      expect(result.configuration.availabilityEndDate).toEqual(NOT_APPLICABLE);
      expect(result.configuration.expiryDate).toEqual(NOT_APPLICABLE);
      expect(result.configuration.participations).toEqual(NOT_APPLICABLE);
      expect(result.configuration.scheduledRepayments).toEqual(NOT_APPLICABLE);
      expect(result.configuration.nonCashObligations).toEqual(NOT_APPLICABLE);
      expect(result.configuration.cashObligations).toEqual(NOT_APPLICABLE);
      expect(result.configuration.accrualSchedule).toEqual(NOT_APPLICABLE);
      expect(result.configuration.pimOwner).toEqual(NOT_APPLICABLE);
      expect(result.configuration.riskRating).toEqual(NOT_APPLICABLE);
      expect(result.configuration.preCreditPeriod).toEqual(NOT_APPLICABLE);
      expect(result.configuration.creditPeriod).toEqual(NOT_APPLICABLE);
      expect(result.configuration.lossGivenDefault).toEqual(NOT_APPLICABLE);
      expect(result.configuration.provisionRate).toEqual(NOT_APPLICABLE);
      expect(result.configuration.forecastYear).toEqual(NOT_APPLICABLE);
      expect(result.configuration.bankRate).toEqual(NOT_APPLICABLE);
    });

    it('should default configuration.fees to NOT_APPLICABLE', () => {
      const result = mapProductConfig(mockOdsProductConfigUnknown);

      expect(result.configuration.fees.creation).toEqual(NOT_APPLICABLE);
      expect(result.configuration.fees.inLife).toEqual(NOT_APPLICABLE);
    });
  });

  it('should rename additionalRateTypes to additionalRates', () => {
    const result = mapProductConfig(mockOdsProductConfigKnown);

    expect(result.additionalRates).toEqual(mockOdsProductConfigKnown.additionalRateTypes);
  });

  it('should rename baseRateTypes to baseRates', () => {
    const result = mapProductConfig(mockOdsProductConfigKnown);

    expect(result.baseRates).toEqual(mockOdsProductConfigKnown.baseRateTypes);
  });

  it('should rename accrualScheduleTypes to accrualSchedules preserving shape', () => {
    const result = mapProductConfig(mockOdsProductConfigKnown);

    expect(result.accrualSchedules).toEqual(mockOdsProductConfigKnown.accrualScheduleTypes);
  });

  it('should passthrough counterpartyRoleTypes, facilityCategoryTypes, feeTypes, obligationSubtypes, account', () => {
    const result = mapProductConfig(mockOdsProductConfigKnown);

    expect(result.counterpartyRoleTypes).toEqual(mockOdsProductConfigKnown.counterpartyRoleTypes);
    expect(result.facilityCategoryTypes).toEqual(mockOdsProductConfigKnown.facilityCategoryTypes);
    expect(result.feeTypes).toEqual(mockOdsProductConfigKnown.feeTypes);
    expect(result.obligationSubtypes).toEqual(mockOdsProductConfigKnown.obligationSubtypes);
    expect(result.account).toEqual(mockOdsProductConfigKnown.account);
  });
});
