import { GetAccrualFrequencyOdsResponseDto, GetAccrualFrequencyResponseDto } from '@ukef/modules/ods/dto';

/**
 * Map an ODS accrual frequency, into a more suitable format for consumers.
 * @param {GetAccrualFrequencyOdsResponseDto} ODS accrual frequency
 * @returns {GetAccrualFrequencyResponseDto} Mapped accrual frequency
 */
export const mapAccrualFrequency = (frequency: GetAccrualFrequencyOdsResponseDto): GetAccrualFrequencyResponseDto => ({
  code: frequency.code,
  name: frequency.name,
  orderId: frequency.orderId,
  frequencyNumberOfUnits: frequency.frequencyNumberOfUnits,
  frequencyUnit: frequency.frequencyUnits,
  isActive: frequency.frequencyActive,
});
