import { GetAdditionalRateResponseDto } from './get-additional-rate-response.dto';
import { GetBaseRateResponseDto } from './get-base-rate-response.dto';
import { GetFacilityCategoryResponseDto } from './get-facility-category-response.dto';
import { GetObligationSubtypeResponseDto } from './get-obligation-subtype-response.dto';

export type ClassificationDto = GetBaseRateResponseDto | GetAdditionalRateResponseDto | GetFacilityCategoryResponseDto | GetObligationSubtypeResponseDto;
