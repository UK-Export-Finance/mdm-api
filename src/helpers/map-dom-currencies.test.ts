import { GetDomCurrencyOdsResponseDto } from '@ukef/modules/dom/dto/get-dom-currency-ods-response.dto';

import { mapDomCurrencies } from './map-dom-currencies';

describe('mapDomCurrencies', () => {
  it('should return an array of mapped currencies', () => {
    // Arrange
    const mockCurrencies: GetDomCurrencyOdsResponseDto[] = [
      {
        currency_code: 'USD',
        currency_iso_code: 'USD',
        currency_name: 'United States Dollar',
        currency_decimal_place: 2,
        rate_setting_calendar_code: 'CCYUSD',
        currency_active_flag: true,
      },
    ];

    // Act
    const result = mapDomCurrencies(mockCurrencies);

    // Assert
    expect(result).toEqual([
      {
        code: 'USD',
        name: 'United States Dollar',
        decimalPlaces: 2,
        calendarCode: 'CCYUSD',
      },
    ]);
  });

  it('should set calendarCode to null when rate_setting_calendar_code is null', () => {
    // Arrange
    const mockCurrencies: GetDomCurrencyOdsResponseDto[] = [
      {
        currency_code: 'JPY',
        currency_iso_code: 'JPY',
        currency_name: 'Japanese Yen',
        currency_decimal_place: 0,
        rate_setting_calendar_code: null,
        currency_active_flag: true,
      },
    ];

    // Act
    const result = mapDomCurrencies(mockCurrencies);

    // Assert
    expect(result[0].calendarCode).toBeNull();
  });

  it('should set calendarCode to null when rate_setting_calendar_code is missing', () => {
    // Arrange
    const mockCurrencies: GetDomCurrencyOdsResponseDto[] = [
      {
        currency_code: 'EUR',
        currency_iso_code: 'EUR',
        currency_name: 'Euro',
        currency_decimal_place: 2,
        currency_active_flag: true,
      },
    ];

    // Act
    const result = mapDomCurrencies(mockCurrencies);

    // Assert
    expect(result[0].calendarCode).toBeNull();
  });

  it('should return an empty array when given an empty array', () => {
    // Arrange
    const mockCurrencies: GetDomCurrencyOdsResponseDto[] = [];

    // Act
    const result = mapDomCurrencies(mockCurrencies);

    // Assert
    expect(result).toEqual([]);
  });
});
