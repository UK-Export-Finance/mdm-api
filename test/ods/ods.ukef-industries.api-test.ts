import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
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

  describe('/ukef-industries', () => {
    it(`should return ${HttpStatus.OK} with mapped UKEF industries`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/ukef-industries`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          code: expect.any(String),
          description: expect.any(String),
          groupCode: expect.any(String),
          groupDescription: expect.any(String),
          category: expect.any(String),
        }),
      ]);

      expect(body).toEqual(expected);
    });
  });

  describe('/ukef-industry-codes', () => {
    it(`should return ${HttpStatus.OK} with UKEF industry codes`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/ukef-industry-codes`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([expect.any(String)]);

      expect(body).toEqual(expected);
    });
  });

  describe('/ukef-industry/:industryCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped UKEF industry`, async () => {
      // Arrange
      const url = `/api/${prefixAndVersion}/ods/ukef-industry/${EXAMPLES.INDUSTRY.CODE}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.objectContaining({
        id: expect.any(String),
        code: expect.any(String),
        description: expect.any(String),
        groupCode: expect.any(String),
        groupDescription: expect.any(String),
        category: expect.any(String),
      });

      expect(body).toEqual(expected);
    });

    describe('when a single UKEF industry is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `/api/${prefixAndVersion}/ods/ukef-industries/INVALID_ID`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
