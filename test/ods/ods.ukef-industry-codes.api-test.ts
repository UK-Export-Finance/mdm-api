import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - UKEF industry codes', () => {
  let api: Api;

  const baseUrl = `/api/${prefixAndVersion}/ods/ukef-industry-codes`;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/ukef-industry-codes', () => {
    it(`should return ${HttpStatus.OK} with mapped UKEF industries`, async () => {
      // Act
      const { status, body } = await api.get(baseUrl);

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

  describe('/ukef-industry-codes/:industryCode', () => {
    it(`should return ${HttpStatus.OK} with a mapped UKEF industry`, async () => {
      // Arrange
      const url = `${baseUrl}/${EXAMPLES.INDUSTRY.CODE}`;

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
        const url = `${baseUrl}/INVALID_ID`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });
});
