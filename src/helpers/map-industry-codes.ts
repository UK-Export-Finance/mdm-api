import { GetOdsIndustryOdsResponseDto } from '@ukef/modules/ods/dto';

/**
 * Map ODS industries, returning an array of industry codes.
 * @param {GetOdsIndustryOdsResponseDto[]} ODS industries
 * @returns {string[]} Industry codes
 */
export const mapIndustryCodes = (industries: GetOdsIndustryOdsResponseDto[]): string[] => industries.map((industry) => industry.industry_code);
