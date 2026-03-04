import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - Facility categories', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/facility-categories', () => {
    it(`should return ${HttpStatus.OK} with mapped facility categories`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/facility-categories`;

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

  describe('/facility-category/:categoryCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped facility category`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/facility-category/${EXAMPLES.FACILITY_CATEGORY.CODE}`;

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

    describe('when a single facility category is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/facility-category/INVALID_CATEGORY_CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
