import { GetDomCompoundingIndexOdsResponseDto } from '@ukef/modules/dom/dto/get-dom-compounding-index-ods-response.dto';

import { mapDomCompoundingIndices } from './map-dom-compounding-indices';

describe('mapDomCompoundingIndices', () => {
  it('should return an array of mapped compounding indices', () => {
    // Arrange
    const mockCompoundingIndices: GetDomCompoundingIndexOdsResponseDto[] = [
      {
        interest_rate_ticker_code: 'EUR001',
        interest_rate_start_datetime: '2026-02-09T00:00:00',
        interest_rate_end_datetime: '2026-02-09T23:59:59',
        interest_rate_days_active: 1,
        interest_rate: 1.93,
        interest_compounding_index_value: 10000.5361111111,
      },
    ];

    // Act
    const result = mapDomCompoundingIndices(mockCompoundingIndices);

    // Assert
    expect(result).toEqual([
      {
        code: 'EUR001',
        startDate: '2026-02-09T00:00:00',
        endDate: '2026-02-09T23:59:59',
        daysActive: 1,
        rate: 1.93,
        compoundingIndexValue: 10000.5361111111,
      },
    ]);
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
