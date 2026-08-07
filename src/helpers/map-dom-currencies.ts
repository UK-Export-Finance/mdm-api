import { GetDomCurrencyOdsResponseDto } from '@ukef/modules/dom/dto/get-dom-currency-ods-response.dto';
import { GetDomCurrencyResponseDto } from '@ukef/modules/dom/dto/get-dom-currency-response.dto';

/**
 * Map DOM currencies into a more suitable format for consumers.
 * @param {GetDomCurrencyOdsResponseDto[]} DOM currencies
 * @returns {GetDomCurrencyResponseDto[]} Mapped currencies
 */
export const mapDomCurrencies = (currencies: GetDomCurrencyOdsResponseDto[]): GetDomCurrencyResponseDto[] =>
  currencies.map((currency) => ({
    code: currency.currency_code,
    name: currency.currency_name,
    decimalPlaces: currency.currency_decimal_place,
    calendarCode: currency.rate_setting_calendar_code ?? null,
  }));
