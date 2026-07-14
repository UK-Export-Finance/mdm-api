import { EXAMPLES } from '@ukef/constants';
import { GetDomInterestRateOdsResponseDto } from '@ukef/modules/dom/dto/get-dom-interest-rate-ods-response.dto';

import { mapDomInterestRates } from './map-dom-interest-rates';

describe('mapDomInterestRates', () => {
  it('should return an array of mapped interest rates', () => {
    // Arrange

    const mockInterestRates = [EXAMPLES.ODS.INTEREST_RATE];

    // Act
    const result = mapDomInterestRates(mockInterestRates);

    // Assert
    const expected = [
      {
        code: EXAMPLES.ODS.INTEREST_RATE.interest_rate_ticker_code,
        startDate: EXAMPLES.ODS.INTEREST_RATE.interest_rate_start_datetime,
        endDate: EXAMPLES.ODS.INTEREST_RATE.interest_rate_end_datetime,
        rate: EXAMPLES.ODS.INTEREST_RATE.interest_rate,
        adjustedRate: EXAMPLES.ODS.INTEREST_RATE.interest_rate_adjusted,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('should return an empty array when given an empty array', () => {
    // Arrange
    const mockInterestRates: GetDomInterestRateOdsResponseDto[] = [];

    // Act
    const result = mapDomInterestRates(mockInterestRates);

    // Assert
    expect(result).toEqual([]);
  });
});
