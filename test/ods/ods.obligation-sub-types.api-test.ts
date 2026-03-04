import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Obligation sub-types', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/obligation-sub-types', () => {
    it(`should return ${HttpStatus.OK} with mapped obligation sub-types`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/obligation-sub-types`;

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

  describe('/obligation-sub-type/:subTypeCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped obligation sub-type`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/obligation-sub-type/${EXAMPLES.OBLIGATION_SUB_TYPE.CODE}`;

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

    describe('when a single obligation sub-type is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/obligation-sub-type/INVALID_SUB_TYPE_CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
