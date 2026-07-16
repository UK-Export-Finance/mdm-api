import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/dom - interest rates', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  const baseUrl = `/api/${prefixAndVersion}/dom/interest-rate`;

  it(`should return ${HttpStatus.OK} with interest rates when rateCode and endDate are provided`, async () => {
    // Arrange
    const rateCode = EXAMPLES.DOM.INTEREST_RATES[0].code;
    const endDate = EXAMPLES.DOM.INTEREST_RATES[0].endDate.slice(0, 10);

    const url = `${baseUrl}?rateCode=${rateCode}&endDate=${endDate}`;

    // Act
    const { status, body } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.OK);

    const expected = expect.arrayContaining([
      expect.objectContaining({
        code: expect.any(String),
        startDate: expect.any(String),
        endDate: expect.any(String),
        rate: expect.any(Number),
        adjustedRate: expect.any(Number),
      }),
    ]);

    expect(body).toEqual(expected);
  });

  it(`should return ${HttpStatus.OK} with interest rates when rateCode, startDate and endDate are provided`, async () => {
    // Arrange
    const rateCode = EXAMPLES.DOM.INTEREST_RATES[0].code;
    const startDate = EXAMPLES.DOM.INTEREST_RATES[0].startDate.slice(0, 10);
    const endDate = EXAMPLES.DOM.INTEREST_RATES[0].endDate.slice(0, 10);

    const url = `${baseUrl}?rateCode=${rateCode}&endDate=${endDate}&startDate=${startDate}`;

    // Act
    const { status, body } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.OK);

    const expected = expect.arrayContaining([
      expect.objectContaining({
        code: expect.any(String),
        startDate: expect.any(String),
        endDate: expect.any(String),
        rate: expect.any(Number),
        adjustedRate: expect.any(Number),
      }),
    ]);

    expect(body).toEqual(expected);
  });

  it(`should return ${HttpStatus.BAD_REQUEST} when rateCode is missing`, async () => {
    // Arrange
    const endDate = EXAMPLES.DATE_END;

    const url = `${baseUrl}?endDate=${endDate}`;

    // Act
    const { status } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should return ${HttpStatus.BAD_REQUEST} when endDate is missing`, async () => {
    // Arrange
    const rateCode = EXAMPLES.DOM.INTEREST_RATES[0].code;

    const url = `${baseUrl}?rateCode=${rateCode}`;

    // Act
    const { status } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should return ${HttpStatus.BAD_REQUEST} when endDate is not in YYYY-MM-DD format`, async () => {
    // Arrange
    const rateCode = EXAMPLES.DOM.INTEREST_RATES[0].code;
    const endDate = '2026-12-31T00:00:00';

    const url = `${baseUrl}?rateCode=${rateCode}&endDate=${endDate}`;

    // Act
    const { status } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should return ${HttpStatus.BAD_REQUEST} when startDate is not in YYYY-MM-DD format`, async () => {
    // Arrange
    const rateCode = EXAMPLES.DOM.INTEREST_RATES[0].code;
    const endDate = EXAMPLES.DATE_END;
    const startDate = '2026-01-01T00:00:00';

    const url = `${baseUrl}?rateCode=${rateCode}&endDate=${endDate}&startDate=${startDate}`;

    // Act
    const { status } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.BAD_REQUEST);
  });
});
