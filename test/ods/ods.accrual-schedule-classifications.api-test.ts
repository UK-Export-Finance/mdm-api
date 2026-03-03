import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Accrual schedule classifications', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/accrual-schedule-classifications', () => {
    it(`should return ${HttpStatus.OK} with mapped accrual schedule classifications`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/accrual-schedule-classifications`;

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

  describe('/accrual-schedule-classification/:classificationCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped accrual schedule classification`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/accrual-schedule-classification/${EXAMPLES.ACCRUAL_SCHEDULE_CLASSIFICATION.CODE}`;

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

    describe('when a single accrual schedule is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/accrual-schedule-classification/INVALID_TYPE_CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
