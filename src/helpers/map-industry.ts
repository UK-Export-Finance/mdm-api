import { GetOdsIndustryOdsResponse, GetOdsIndustryResponse } from '@ukef/modules/ods/dto';

/**
 * Map an ODS industry, into a more suitable format for consumers.
 * @param {GetOdsIndustryOdsResponse} ODS industry
 * @returns {GetOdsIndustryResponse} Mapped industry
 */
export const mapIndustry = (industry: GetOdsIndustryOdsResponse): GetOdsIndustryResponse => ({
  id: industry.industry_id,
  code: industry.industry_code,
  description: industry.industry_description,
  groupCode: industry.industry_group_code,
  groupDescription: industry.industry_group_description,
  category: industry.industry_category,
});
