import { GetAdditionalRateResponseDto } from './get-additional-rate-response.dto';
import { GetBaseRateResponseDto } from './get-base-rate-response.dto';
import { GetFacilityCategoryResponseDto } from './get-facility-category-response.dto';

export type ClassificationDto = GetBaseRateResponseDto | GetAdditionalRateResponseDto | GetFacilityCategoryResponseDto;
