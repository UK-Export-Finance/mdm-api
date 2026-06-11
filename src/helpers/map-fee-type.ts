import { GetFeeTypeOdsResponseDto, GetFeeTypeResponseDto } from '@ukef/modules/ods/dto';

/**
 * Map an ODS fee type, into a more suitable format for consumers.
 * @param {GetFeeTypeOdsResponseDto} ODS fee type
 * @returns {GetFeeTypeResponseDto} Mapped fee type
 */
export const mapFeeType = (feeType: GetFeeTypeOdsResponseDto): GetFeeTypeResponseDto => ({
  feeType: feeType.feeType,
  name: feeType.name,
  classification: feeType.feeTypeClassification,
  expenseIncome: feeType.feeTypeExpenseIncome,
  isActive: feeType.feeTypeActive,
  balanceCategory: feeType.balanceCategory,
  baseBalanceCategory: feeType.baseBalanceCategory ?? null,
  nonFacilityCurrencySettlement: feeType.nonFacilityCurrencySettlement,
});
