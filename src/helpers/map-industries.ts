import { GetOdsIndustryOdsResponseDto, GetOdsIndustryResponseDto } from '@ukef/modules/ods/dto';

import { mapIndustry } from './map-industry';

/**
 * Map ODS industries, into a more suitable format for consumers.
 * @param {GetOdsIndustryOdsResponseDto[]} ODS industries
 * @returns {GetOdsIndustryResponseDto[]} Mapped industries
 */
export const mapIndustries = (industries: GetOdsIndustryOdsResponseDto[]): GetOdsIndustryResponseDto[] => industries.map((industry) => mapIndustry(industry));
