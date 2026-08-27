import { GetDomCompoundingIndexOdsResponseDto } from '@ukef/modules/dom/dto/get-dom-compounding-index-ods-response.dto';
import { GetDomCompoundingIndexResponseDto } from '@ukef/modules/dom/dto/get-dom-compounding-index-response.dto';

export const mapDomCompoundingIndices = (compoundingIndices: GetDomCompoundingIndexOdsResponseDto[]): GetDomCompoundingIndexResponseDto[] =>
  compoundingIndices.map((compoundingIndex) => ({
    code: compoundingIndex.interest_rate_ticker_code,
    startDate: compoundingIndex.interest_rate_start_datetime,
    endDate: compoundingIndex.interest_rate_end_datetime,
    daysActive: compoundingIndex.interest_rate_days_active,
    rate: compoundingIndex.interest_rate,
    compoundingIndexValue: compoundingIndex.interest_compounding_index_value,
  }));
