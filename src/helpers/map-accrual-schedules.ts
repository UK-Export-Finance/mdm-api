import { GetAccrualScheduleOdsResponseDto, GetAccrualScheduleResponseDto } from '@ukef/modules/ods/dto';

import { mapAccrualSchedule } from './map-accrual-schedule';

/**
 * Map ODS accrual schedules, into a more suitable format for consumers.
 * @param {GetAccrualScheduleOdsResponseDto[]} ODS accrual schedules
 * @returns {GetAccrualScheduleResponseDto[]} Mapped accrual schedules
 */
export const mapAccrualSchedules = (schedules: GetAccrualScheduleOdsResponseDto[]): GetAccrualScheduleResponseDto[] => schedules.map(mapAccrualSchedule);
