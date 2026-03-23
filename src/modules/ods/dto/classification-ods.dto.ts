import { GetAdditionalRateOdsResponseDto } from './get-additional-rate-ods-response.dto';
import { GetBaseRateOdsResponseDto } from './get-base-rate-ods-response.dto';
import { GetFacilityCategoryOdsResponseDto } from './get-facility-category-ods-response.dto';
import { GetObligationSubtypeOdsResponseDto } from './get-obligation-subtype-ods-response.dto';

export type ClassificationOdsDto =
  | GetBaseRateOdsResponseDto
  | GetAdditionalRateOdsResponseDto
  | GetFacilityCategoryOdsResponseDto
  | GetObligationSubtypeOdsResponseDto;
