import { GetAccrualScheduleOdsResponseDto, GetAccrualScheduleResponseDto } from '@ukef/modules/ods/dto';

/**
 * Map an ODS accrual schedule, into a more suitable format for consumers.
 * @param {GetAccrualScheduleOdsResponseDto} ODS accrual schedule
 * @returns {GetAccrualScheduleResponseDto} Mapped accrual schedule
 */
export const mapAccrualSchedule = (schedule: GetAccrualScheduleOdsResponseDto): GetAccrualScheduleResponseDto => ({
  code: schedule.code,
  name: schedule.name,
  accrualRateType: schedule.accrualRateType,
  baseBalanceCategory: schedule.baseBalanceCategory,
  incomeClassCode: schedule.incomeClassCode,
  isActive: schedule.accrualScheduleTypeActive,
});
