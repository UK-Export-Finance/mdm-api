import { GetAccrualScheduleClassificationOdsResponseDto, GetAccrualScheduleClassificationResponseDto } from '@ukef/modules/ods/dto';

import { mapAccrualScheduleClassification } from './map-accrual-schedule-classification';

/**
 * Map ODS accrual schedule classifications, into a more suitable format for consumers.
 * @param {GetAccrualScheduleClassificationOdsResponseDto[]} ODS accrual schedules classifications
 * @returns {GetAccrualScheduleClassificationResponseDto[]} Mapped accrual schedule classifications
 */
export const mapAccrualScheduleClassifications = (
  classifications: GetAccrualScheduleClassificationOdsResponseDto[],
): GetAccrualScheduleClassificationResponseDto[] => classifications.map((classification) => mapAccrualScheduleClassification(classification));
