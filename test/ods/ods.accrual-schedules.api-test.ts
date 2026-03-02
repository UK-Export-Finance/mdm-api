import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - UKEF industries', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/accrual-schedules', () => {
    it(`should return ${HttpStatus.OK} with mapped accrual-schedules`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/accrual-schedules`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
          typeCode: expect.any(String),
          code: expect.any(String),
          description: expect.any(String),
          isActive: expect.any(Boolean),
        }),
      ]);

      expect(body).toEqual(expected);
    });
  });
});
