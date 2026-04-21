import { GetAccrualFrequencyOdsResponseDto, GetAccrualFrequencyResponseDto } from '@ukef/modules/ods/dto';

import { mapAccrualFrequency } from './map-accrual-frequency';

/**
 * Map ODS accrual frequencies, into a more suitable format for consumers.
 * @param {GetAccrualFrequencyOdsResponseDto[]} ODS accrual frequencies
 * @returns {GetAccrualFrequencyResponseDto[]} Mapped accrual frequencies
 */
export const mapAccrualFrequencies = (frequencies: GetAccrualFrequencyOdsResponseDto[]): GetAccrualFrequencyResponseDto[] =>
  frequencies.map(mapAccrualFrequency);
