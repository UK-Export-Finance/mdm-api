import { GetDomInterestRateOdsResponseDto } from '@ukef/modules/dom/dto/get-dom-interest-rate-ods-response.dto';
import { GetDomInterestRateResponseDto } from '@ukef/modules/dom/dto/get-dom-interest-rate-response.dto';

export const mapDomInterestRates = (interestRates: GetDomInterestRateOdsResponseDto[]): GetDomInterestRateResponseDto[] =>
  interestRates.map((interestRate) => ({
    code: interestRate.interest_rate_ticker_code,
    startDate: interestRate.interest_rate_start_datetime,
    endDate: interestRate.interest_rate_end_datetime,
    rate: interestRate.interest_rate,
    adjustedRate: interestRate.interest_rate_adjusted,
  }));
