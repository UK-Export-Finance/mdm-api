import {
  GetAdditionalRateOdsResponseDto,
  GetAdditionalRateResponseDto,
  GetFacilityCategoryOdsResponseDto,
  GetFacilityCategoryResponseDto,
} from '@ukef/modules/ods/dto';

import { mapOdsClassification } from './map-ods-classification';

type ClassificationOdsDto = GetAdditionalRateOdsResponseDto | GetFacilityCategoryOdsResponseDto;

type ClassificationDto = GetAdditionalRateResponseDto | GetFacilityCategoryResponseDto;

/**
 * Map ODS classifications, into a more suitable format for consumers.
 * @param {ClassificationOdsDto[]} ODS classifications
 * @returns {ClassificationDto[]} Mapped classifications
 */
export const mapOdsClassifications = (classifications: ClassificationOdsDto[]): ClassificationDto[] => classifications.map(mapOdsClassification);
