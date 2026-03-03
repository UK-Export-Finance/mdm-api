import { GetAccrualScheduleClassificationOdsResponseDto, GetAccrualScheduleClassificationResponseDto } from '@ukef/modules/ods/dto';

/**
 * Map an ODS accrual schedule, into a more suitable format for consumers.
 * @param {GetAccrualScheduleClassificationOdsResponseDto} ODS accrual schedule
 * @returns {GetAccrualScheduleClassificationResponseDto} Mapped accrual schedule
 */
export const mapAccrualScheduleClassification = (schedule: GetAccrualScheduleClassificationOdsResponseDto): GetAccrualScheduleClassificationResponseDto => ({
  type: schedule.classification_type,
  typeCode: schedule.classification_type_code,
  code: schedule.classification_code,
  description: schedule.classification_description,
  numericValue: schedule.classification_numeric_value,
  isActive: schedule.classification_active_flag,
});
