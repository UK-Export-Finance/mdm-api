import PRODUCT_CONFIG_OVERRIDES from '@ukef/helper-modules/dom/dom-product-config.json';
import { GetDomProductConfigResponse } from '@ukef/modules/dom/dto';
import { GetProductConfigOdsResponse } from '@ukef/modules/ods/dto';

const NOT_APPLICABLE = 'NOT_APPLICABLE';

/**
 * Maps an ODS product config response to a DOM product config response.
 *
 * Fields not supplied by ODS (date-requirement config fields and fees) are
 * sourced from `dom-product-config.json` keyed by `productType`. If the product
 * does not appear in the JSON the field falls back to `NOT_APPLICABLE`.
 * Field renames:
 *   - `additionalRateTypes` → `additionalRates`
 *   - `baseRateTypes`       → `baseRates`
 *   - `accrualScheduleTypes`→ `accrualSchedules`
 * Fields that are currently unused in downstream consumers are set directly to NOT_APPLICABLE,
 * and may be removed in future
 */
export const mapProductConfig = (odsProductConfig: GetProductConfigOdsResponse): GetDomProductConfigResponse => {
  const override = PRODUCT_CONFIG_OVERRIDES.find((c) => c.productType === odsProductConfig.productType);
  const conf = override?.configuration;

  return {
    productType: odsProductConfig.productType,
    name: odsProductConfig.name,
    shortName: odsProductConfig.shortName,
    configuration: {
      commitmentDate: NOT_APPLICABLE,
      issuedDate: conf?.issuedDate ?? NOT_APPLICABLE,
      effectiveDate: conf?.effectiveDate ?? NOT_APPLICABLE,
      availabilityEndDate: conf?.availabilityEndDate ?? NOT_APPLICABLE,
      expiryDate: conf?.expiryDate ?? NOT_APPLICABLE,
      creditType: odsProductConfig.configuration.creditType.toUpperCase(),
      instrumentType: odsProductConfig.configuration.instrumentType,
      participations: NOT_APPLICABLE,
      scheduledRepayments: NOT_APPLICABLE,
      nonCashObligations: NOT_APPLICABLE,
      cashObligations: NOT_APPLICABLE,
      accrualSchedule: NOT_APPLICABLE,
      pimOwner: NOT_APPLICABLE,
      riskRating: NOT_APPLICABLE,
      preCreditPeriod: NOT_APPLICABLE,
      creditPeriod: NOT_APPLICABLE,
      lossGivenDefault: NOT_APPLICABLE,
      provisionRate: NOT_APPLICABLE,
      forecastYear: NOT_APPLICABLE,
      bankRate: NOT_APPLICABLE,
      repaymentType: odsProductConfig.configuration.repaymentType,
      fees: {
        creation: conf?.fees?.creation ?? NOT_APPLICABLE,
        inLife: conf?.fees?.inLife ?? NOT_APPLICABLE,
      },
      reinsurance: {
        creation: conf?.reinsurance?.creation ?? NOT_APPLICABLE,
        inLife: conf?.reinsurance?.inLife ?? NOT_APPLICABLE,
      },
      leadDays: odsProductConfig.configuration.leadDays,
    },
    additionalRates: odsProductConfig.additionalRateTypes,
    accrualSchedules: odsProductConfig.accrualScheduleTypes,
    baseRates: odsProductConfig.baseRateTypes,
    counterpartyRoleTypes: odsProductConfig.counterpartyRoleTypes,
    facilityCategoryTypes: odsProductConfig.facilityCategoryTypes,
    feeTypes: odsProductConfig.feeTypes,
    obligationSubtypes: odsProductConfig.obligationSubtypes,
    account: odsProductConfig.account,
    productActive: odsProductConfig.productActive,
  };
};
