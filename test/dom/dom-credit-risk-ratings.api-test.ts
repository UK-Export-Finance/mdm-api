import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/dom - credit risk ratings', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it(`should return ${HttpStatus.OK}`, async () => {
    // Arrange
    const url = `/api/${prefixAndVersion}/dom/credit-risk-ratings`;

    // Act
    const { status, body } = await api.get(url);

    // Assert
    expect(status).toBe(HttpStatus.OK);

    const expected = expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(Number),
        description: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        effectiveFrom: expect.any(String),
        effectiveTo: expect.any(String),
      }),
    ]);

    expect(body).toEqual(expected);
  });

  // TODO: APIM-613 - create a mock request to mimic receiving a 500 error from ODS.
});
