import { GetDomInterestRateTickersDomResponseDto } from '@ukef/modules/dom/dto/get-dom-interest-rate-tickers-dom-response.dto';
import { GetDomInterestRateTickersResponseDto } from '@ukef/modules/dom/dto/get-dom-interest-rate-tickers-response.dto';

export const mapDomInterestRateTickers = (interestRateTickers: GetDomInterestRateTickersDomResponseDto[]): GetDomInterestRateTickersResponseDto[] =>
  interestRateTickers.map((interestRateTicker) => ({
    code: interestRateTicker.interest_rate_ticker_code,
    name: interestRateTicker.interest_rate_ticker_name,
    type: interestRateTicker.interest_rate_ticker_type,
    frequencyCode: interestRateTicker.interest_rate_frequency_code,
    frequencyName: interestRateTicker.interest_rate_frequency_name,
    leadDays: interestRateTicker.interest_rate_ticker_lead_days,
    currencyCode: interestRateTicker.currency_code,
    active: interestRateTicker.interest_rate_ticker_active_flag,
  }));
