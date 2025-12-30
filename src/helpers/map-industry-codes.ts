import { GetIndustryOdsResponseDto } from '@ukef/modules/ods/dto';

/**
 * Map ODS industries, returning an array of industry codes.
 * @param {GetIndustryOdsResponseDto[]} ODS industries
 * @returns {string[]} Industry codes
 */
export const mapIndustryCodes = (industries: GetIndustryOdsResponseDto[]): string[] => industries.map((industry) => industry.industry_code);
