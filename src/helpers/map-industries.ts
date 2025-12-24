import { GetIndustryOdsResponseDto, GetIndustryResponseDto } from '@ukef/modules/ods/dto';

import { mapIndustry } from './map-industry';

/**
 * Map ODS industries, into a more suitable format for consumers.
 * @param {GetIndustryOdsResponseDto[]} ODS industries
 * @returns {GetIndustryResponseDto[]} Mapped industries
 */
export const mapIndustries = (industries: GetIndustryOdsResponseDto[]): GetIndustryResponseDto[] => industries.map((industry) => mapIndustry(industry));
