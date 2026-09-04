import { GetDomCompoundingIndexOdsResponseDto } from '@ukef/modules/dom/dto/get-dom-compounding-index-ods-response.dto';
import { GetDomCompoundingIndexResponseDto } from '@ukef/modules/dom/dto/get-dom-compounding-index-response.dto';

/**
 * Map the compounding indices from the DOM ODS response to the response DTO format.
 * @param {GetDomCompoundingIndexOdsResponseDto[]} compoundingIndices - The array of compounding indices from the DOM ODS response.
 * @returns {GetDomCompoundingIndexResponseDto[]} An array of compounding indices mapped to the response DTO format.
 */
export const mapDomCompoundingIndices = (compoundingIndices: GetDomCompoundingIndexOdsResponseDto[]): GetDomCompoundingIndexResponseDto[] =>
  compoundingIndices.map((compoundingIndex) => ({
    code: compoundingIndex.interest_rate_ticker_code,
    startDate: compoundingIndex.interest_rate_start_datetime,
    endDate: compoundingIndex.interest_rate_end_datetime,
    daysActive: compoundingIndex.interest_rate_days_active,
    rate: compoundingIndex.interest_rate,
    compoundingIndexValue: compoundingIndex.interest_compounding_index_value,
    indexEffectiveDate: compoundingIndex.interest_compounding_index_source_start_datetime,
  }));
