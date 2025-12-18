import { GetOdsIndustryOdsResponse, GetOdsIndustryResponse } from '@ukef/modules/ods/dto';

import { mapIndustry } from './map-industry';

/**
 * Map ODS industries, into a more suitable format for consumers.
 * @param {GetOdsIndustryOdsResponse[]} ODS industries
 * @returns {GetOdsIndustryResponse[]} Mapped industries
 */
export const mapIndustries = (industries: GetOdsIndustryOdsResponse[]): GetOdsIndustryResponse[] => industries.map((industry) => mapIndustry(industry));
