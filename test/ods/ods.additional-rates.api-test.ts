import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Additional rates', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/additional-rates', () => {
    it(`should return ${HttpStatus.OK} with mapped additional rates`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/additional-rates`;

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

  describe('/additional-rate/:rateCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped additional rate`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/additional-rate/${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE.CODE}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.objectContaining({
        type: expect.any(String),
        typeCode: expect.any(String),
        code: expect.any(String),
        description: expect.any(String),
        isActive: expect.any(Boolean),
      });

      expect(body).toEqual(expected);
    });

    describe('when a single additional rate is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/additional-rate/INVALID_RATE_CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
