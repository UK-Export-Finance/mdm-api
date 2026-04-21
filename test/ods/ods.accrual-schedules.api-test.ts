import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants/examples/examples.constant';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Accrual schedules', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/accrual-schedules', () => {
    it(`should return ${HttpStatus.OK} with mapped accrual schedules`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/accrual-schedules`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          code: expect.any(String),
          name: expect.any(String),
          accrualRateType: expect.any(String),
          baseBalanceCategory: expect.any(String),
          incomeClassCode: expect.any(String),
          isActive: expect.any(Boolean),
        }),
      ]);

      expect(body).toEqual(expected);
    });
  });

  describe('/accrual-schedule/:scheduleCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped accrual schedule`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/accrual-schedule/${EXAMPLES.ODS.ACCRUAL_SCHEDULE.code}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.objectContaining({
        code: expect.any(String),
        name: expect.any(String),
        accrualRateType: expect.any(String),
        baseBalanceCategory: expect.any(String),
        incomeClassCode: expect.any(String),
        isActive: expect.any(Boolean),
      });

      expect(body).toEqual(expected);
    });

    describe('when a single accrual schedule is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/accrual-schedule/INVALID_SCHEDULE_CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
