import { EXAMPLES } from '@ukef/constants';
import { GetDomCompoundingIndexOdsResponseDto } from '@ukef/modules/dom/dto/get-dom-compounding-index-ods-response.dto';

import { mapDomCompoundingIndices } from './map-dom-compounding-indices';

describe('mapDomCompoundingIndices', () => {
  it('should return an array of mapped compounding indices', () => {
    // Arrange
    const mockCompoundingIndices: GetDomCompoundingIndexOdsResponseDto[] = [
      {
        interest_rate_ticker_code: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].code,
        interest_rate_start_datetime: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
        interest_rate_end_datetime: EXAMPLES.DOM.INTEREST_RATES[0].endDate,
        interest_rate_days_active: 1,
        interest_rate: EXAMPLES.DOM.INTEREST_RATES[0].rate,
        interest_compounding_index_value: 10000.5361111111,
        interest_compounding_index_source_start_datetime: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
      },
    ];

    // Act
    const result = mapDomCompoundingIndices(mockCompoundingIndices);

    // Assert
    const expected = [
      {
        code: EXAMPLES.DOM.INTEREST_RATE_TICKERS[0].code,
        startDate: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
        endDate: EXAMPLES.DOM.INTEREST_RATES[0].endDate,
        daysActive: 1,
        rate: EXAMPLES.DOM.INTEREST_RATES[0].rate,
        compoundingIndexValue: 10000.5361111111,
        indexEffectiveDate: EXAMPLES.DOM.INTEREST_RATES[0].startDate,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('should return an empty array when given an empty array', () => {
    // Arrange
    const mockCompoundingIndices: GetDomCompoundingIndexOdsResponseDto[] = [];

    // Act
    const result = mapDomCompoundingIndices(mockCompoundingIndices);

    // Assert
    expect(result).toEqual([]);
  });
});
