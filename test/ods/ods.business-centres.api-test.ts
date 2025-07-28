import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { BUSINESS_CENTRE } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - business centres', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/business-center/:centerCode/non-working-days', () => {
    // Arrange
    const baseUrl = `/api/${prefixAndVersion}/ods/business-centre`;

    it(`should return ${HttpStatus.OK} with mapped non working days`, async () => {
      // Act
      const { status, body } = await api.get(`${baseUrl}/${BUSINESS_CENTRE.EXAMPLES.CODE}/non-working-days`);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          code: expect.any(String),
          name: expect.any(String),
          date: expect.any(String),
        }),
      ]);

      expect(body).toEqual(expected);
    });

    it(`should return ${HttpStatus.NOT_FOUND} when the provided code param is a valid format, but does not match an existing business centre`, async () => {
      // Arrange
      const mockCentreCode = 'INVALID CODE';

      // Act
      const { status, body } = await api.get(`${baseUrl}/${mockCentreCode}/non-working-days`);

      // Assert
      expect(status).toBe(HttpStatus.NOT_FOUND);

      expect(body).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No business centre ${mockCentreCode} non working days found`,
        error: 'Not Found',
      });
    });

    // TODO: APIM-613 - create a mock request to mimic receiving a 500 error from ODS.
  });
});
