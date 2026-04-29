import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Fee types', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/fee-types', () => {
    it(`should return ${HttpStatus.OK} with mapped fee types`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/fee-types`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          feeType: expect.any(String),
          name: expect.any(String),
          classification: expect.any(String),
          expenseIncome: expect.any(String),
          isActive: expect.any(Boolean),
        }),
      ]);

      expect(body).toEqual(expected);
    });
  });

  describe('/fee-type/:feeTypeCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped fee type`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/fee-type/${EXAMPLES.FEE_TYPE.FEE_TYPE}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.objectContaining({
        feeType: expect.any(String),
        name: expect.any(String),
        classification: expect.any(String),
        expenseIncome: expect.any(String),
        isActive: expect.any(Boolean),
      });

      expect(body).toEqual(expected);
    });

    describe('when a single fee type is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/fee-type/INVALID_FEE_TYPE_CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
