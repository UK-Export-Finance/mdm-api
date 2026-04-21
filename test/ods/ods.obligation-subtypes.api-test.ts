import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Obligation subtypes', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/obligation-subtypes', () => {
    it(`should return ${HttpStatus.OK} with mapped obligation subtypes`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/obligation-subtypes`;

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

  describe('/obligation-subtypes/with-product-type-codes', () => {
    describe('/obligation-subtypes', () => {
      it(`should return ${HttpStatus.OK} with mapped obligation subtypes`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/obligation-subtypes/with-product-type-codes`;

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
            productTypeCode: expect.any(String),
          }),
        ]);

        expect(body).toEqual(expected);
      });
    });
  });

  describe('/obligation-subtype/:subtypeCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped obligation subtype`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/obligation-subtype/${EXAMPLES.OBLIGATION_SUBTYPE.CODE}`;

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

    describe('when a single obligation subtype is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/obligation-subtype/INVALID_SUBTYPE_CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
