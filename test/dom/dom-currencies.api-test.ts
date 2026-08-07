import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/dom - currencies', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it(`should return ${HttpStatus.OK}`, async () => {
    // Arrange
    const url = `/api/${prefixAndVersion}/dom/currencies`;

    // Act
    const { status, body } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.OK);

    const expected = expect.arrayContaining([
      expect.objectContaining({
        code: expect.any(String),
        name: expect.any(String),
        decimalPlaces: expect.any(Number),
      }),
    ]);

    expect(body).toEqual(expected);

    body.forEach((currency) => {
      expect(currency).toHaveProperty('calendarCode');
      expect(currency.calendarCode === null || typeof currency.calendarCode === 'string').toBe(true);
    });
  });
});
