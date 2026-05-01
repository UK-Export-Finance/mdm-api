export const ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES = {
  ADDITIONAL_RATE_TYPE: 'additionalRateType',
  BASE_RATE_TYPE: 'baseRateType',
  DAY_BASIS: 'dayBasis',
  FREQUENCY: 'frequency',
} as const;

export type OdsScheduleClassificationTypeCodes = (typeof ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES)[keyof typeof ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES];
