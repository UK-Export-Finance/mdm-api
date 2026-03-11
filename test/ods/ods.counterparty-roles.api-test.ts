import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Counterparty roles', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/counterparty-roles', () => {
    it(`should return ${HttpStatus.OK} with mapped counterparty roles`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/counterparty-roles`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          counterpartyRoleType: expect.any(String),
          name: expect.any(String),
          hasSharePercentage: expect.any(Boolean),
          isActive: expect.any(Boolean),
        }),
      ]);

      expect(body).toEqual(expected);
    });
  });
});
