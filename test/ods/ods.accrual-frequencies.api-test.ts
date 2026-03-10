import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants/examples/examples.constant';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Accrual frequencies', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/accrual-frequencies', () => {
    it(`should return ${HttpStatus.OK} with mapped accrual frequencies`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/accrual-frequencies`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          code: expect.any(String),
          name: expect.any(String),
          orderId: expect.any(Number),
          frequencyNumberOfUnits: expect.any(Number),
          frequencyUnit: expect.any(String),
          isActive: expect.any(Boolean),
        }),
      ]);

      expect(body).toEqual(expected);
    });
  });

  describe('/accrual-frequency/:frequencyCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped accrual frequency`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/accrual-frequency/${EXAMPLES.ACCRUAL_FREQUENCY.CODE}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.objectContaining({
        code: expect.any(String),
        name: expect.any(String),
        orderId: expect.any(Number),
        frequencyNumberOfUnits: expect.any(Number),
        frequencyUnit: expect.any(String),
        isActive: expect.any(Boolean),
      });

      expect(body).toEqual(expected);
    });

    describe('when a single accrual frequency is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/accrual-frequency/INVALID_FREQUENCY_CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
