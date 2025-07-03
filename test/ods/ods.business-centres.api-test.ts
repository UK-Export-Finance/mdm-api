import { HttpStatus } from '@nestjs/common';
import { BUSINESS_CENTRE } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

describe('/ods/business-centres', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/business-centres', () => {
    it(`should return ${HttpStatus.OK} with mapped business centres`, async () => {
      // Act
      const { status, body } = await api.get('/api/v1/ods/business-centres');

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          code: expect.any(String),
          name: expect.any(String),
        }),
      ]);

      expect(body).toEqual(expected);
    });

    // TODO: APIM-613 - create a mock request to mimic receiving a 500 error from ODS.
  });

  describe('/business-center/:code/non-working-days', () => {
    it(`should return ${HttpStatus.OK} with mapped non working days`, async () => {
      // Act
      const { status, body } = await api.get(`/api/v1/ods/business-centre/${BUSINESS_CENTRE.EXAMPLES.CODE}/non-working-days`);

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
      // Act
      const INVALID_BUSINESS_CENTRE = 'InvalidBusinessCentre';

      const { status, body } = await api.get(`/api/v1/ods/business-centre/${INVALID_BUSINESS_CENTRE}/non-working-days`);

      // Assert
      expect(status).toBe(HttpStatus.NOT_FOUND);

      expect(body).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No business centre non working days found',
        error: 'Not Found',
      });
    });

    // TODO: APIM-613 - create a mock request to mimic receiving a 500 error from ODS.
  });
});
