import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { DOM_BUSINESS_CENTRES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/dom - business centres', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/business-centre/:centreCode', () => {
    describe('when a business centre is found', () => {
      it(`should return ${HttpStatus.OK} with a business centre`, async () => {
        // Arrange
        const mockCentreCode = DOM_BUSINESS_CENTRES.AE_DXB.CODE;

        const url = `/api/${prefixAndVersion}/dom/business-centre/${mockCentreCode}`;

        // Act
        const { status, body } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.OK);

        const expected = {
          code: DOM_BUSINESS_CENTRES.AE_DXB.CODE,
          name: DOM_BUSINESS_CENTRES.AE_DXB.NAME,
        };

        expect(body).toEqual(expected);
      });
    });

    describe('when a business centre is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const mockCentreCode = 'INVALID CODE';

        const url = `/api/${prefixAndVersion}/dom/business-centre/${mockCentreCode}`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });

  describe('/business-center/:centerCode/non-working-days', () => {
    // Arrange
    const baseUrl = `/api/${prefixAndVersion}/dom/business-centre`;

    it(`should return ${HttpStatus.OK} with mapped non working days`, async () => {
      // Arrange
      const mockCentreCode = DOM_BUSINESS_CENTRES.AE_DXB.CODE;

      // Act
      const { status, body } = await api.get(`${baseUrl}/${mockCentreCode}/non-working-days`);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.arrayContaining([
        expect.objectContaining({
          code: mockCentreCode,
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
        message: `No DOM to ODS business centre code found ${mockCentreCode}`,
        error: 'Not Found',
      });
    });

    // TODO: APIM-613 - create a mock request to mimic receiving a 404 error from ODS non working days endpoint
    // TODO: APIM-613 - create a mock request to mimic receiving a 500 error from ODS.
  });

  describe('/business-centres', () => {
    const url = `/api/${prefixAndVersion}/dom/business-centres`;

    it(`should return ${HttpStatus.OK} with mapped business centres`, async () => {
      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = Object.values(DOM_BUSINESS_CENTRES).map((centre) => ({
        code: centre.CODE,
        name: centre.NAME,
      }));

      expect(body).toEqual(expected);
    });
  });
});
