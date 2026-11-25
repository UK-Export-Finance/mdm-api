import { GetDomInterestRateTickersDomResponseDto } from '@ukef/modules/dom/dto/get-dom-interest-rate-tickers-dom-response.dto';

import { mapDomInterestRateTickers } from './map-dom-interest-rate-tickers';

describe('mapDomInterestRateTickers', () => {
  it('should return an array of mapped interest rate tickers', () => {
    // Arrange
    const mockTicker: GetDomInterestRateTickersDomResponseDto = {
      interest_rate_ticker_code: 'EUR001',
      interest_rate_ticker_name: 'ESTR Overnight Daily Compounding (5-day lag)',
      interest_rate_ticker_type: 'Compounding Rate',
      interest_rate_frequency_code: 'FREQEBD',
      interest_rate_frequency_name: 'Every Business Day',
      interest_rate_ticker_lead_days: 5,
      currency_code: 'EUR',
      interest_rate_ticker_active_flag: true,
    };
    const mockTickers = [mockTicker];

    // Act
    const result = mapDomInterestRateTickers(mockTickers);

    // Assert
    const expected = [
      {
        code: mockTicker.interest_rate_ticker_code,
        name: mockTicker.interest_rate_ticker_name,
        type: mockTicker.interest_rate_ticker_type,
        frequencyCode: mockTicker.interest_rate_frequency_code,
        frequencyName: mockTicker.interest_rate_frequency_name,
        leadDays: mockTicker.interest_rate_ticker_lead_days,
        currencyCode: mockTicker.currency_code,
        active: mockTicker.interest_rate_ticker_active_flag,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('should return an empty array when given an empty array', () => {
    // Arrange
    const mockTickers: GetDomInterestRateTickersDomResponseDto[] = [];

    // Act
    const result = mapDomInterestRateTickers(mockTickers);

    // Assert
    expect(result).toEqual([]);
  });
});
