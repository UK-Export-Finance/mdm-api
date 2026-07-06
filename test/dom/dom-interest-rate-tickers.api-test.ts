import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/dom - interest rate tickers', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it(`should return ${HttpStatus.OK}`, async () => {
    // Arrange
    const url = `/api/${prefixAndVersion}/dom/interest-rate-tickers`;

    // Act
    const { status, body } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.OK);

    const expected = expect.arrayContaining([
      expect.objectContaining({
        code: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
        frequencyCode: expect.any(String),
        frequencyName: expect.any(String),
        leadDays: expect.any(Number),
        currencyCode: expect.any(String),
        active: expect.any(Boolean),
      }),
    ]);

    expect(body).toEqual(expected);
  });
});
