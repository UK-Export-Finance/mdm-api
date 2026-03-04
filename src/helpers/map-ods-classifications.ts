import {
  GetAccrualScheduleClassificationOdsResponseDto,
  GetAccrualScheduleClassificationResponseDto,
  GetFacilityCategoryOdsResponseDto,
  GetFacilityCategoryResponseDto,
} from '@ukef/modules/ods/dto';

import { mapOdsClassification } from './map-ods-classification';

type ClassificationOdsDto = GetAccrualScheduleClassificationOdsResponseDto | GetFacilityCategoryOdsResponseDto;

type ClassificationDto = GetAccrualScheduleClassificationResponseDto | GetFacilityCategoryResponseDto;

/**
 * Map ODS accrual schedule classifications, into a more suitable format for consumers.
 * @param {ClassificationOdsDto[]} ODS accrual schedules classifications
 * @returns {ClassificationDto[]} Mapped accrual schedule classifications
 */
export const mapOdsClassifications = (classifications: ClassificationOdsDto[]): ClassificationDto[] =>
  classifications.map((classification) => mapOdsClassification(classification));
