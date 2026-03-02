import { GetAccrualScheduleOdsResponseDto, GetAccrualScheduleResponseDto } from '@ukef/modules/ods/dto';

/**
 * Map an ODS accrual schedule, into a more suitable format for consumers.
 * @param {GetAccrualScheduleOdsResponseDto} ODS accrual schedule
 * @returns {GetAccrualScheduleResponseDto} Mapped accrual schedule
 */
export const mapAccrualSchedule = (schedule: GetAccrualScheduleOdsResponseDto): GetAccrualScheduleResponseDto => ({
  type: schedule.classification_type,
  typeCode: schedule.classification_type_code,
  code: schedule.classification_code,
  description: schedule.classification_description,
  numericValue: schedule.classification_numeric_value,
  isActive: schedule.classification_active_flag,
});
