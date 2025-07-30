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
