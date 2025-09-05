import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import PRODUCT_CONFIG from '@ukef/helper-modules/dom/dom-product-config.json';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - product-configuration', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/product-configuration/:productType', () => {
    const baseUrl = `/api/${prefixAndVersion}/dom/product-configuration`;

    it(`should return ${HttpStatus.OK} with product configuration - ${EXAMPLES.PRODUCT_TYPES.BIP}`, async () => {
      // Arrange
      const url = `${baseUrl}/${EXAMPLES.PRODUCT_TYPES.BIP}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      expect(body).toEqual(PRODUCT_CONFIG[0]);

      expect(body.productType).toEqual(EXAMPLES.PRODUCT_TYPES.BIP);
    });

    it(`should return ${HttpStatus.OK} with product configuration - ${EXAMPLES.PRODUCT_TYPES.EXIP}`, async () => {
      // Arrange
      const url = `${baseUrl}/${EXAMPLES.PRODUCT_TYPES.EXIP}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      expect(body).toEqual(PRODUCT_CONFIG[1]);

      expect(body.productType).toEqual(EXAMPLES.PRODUCT_TYPES.EXIP);
    });

    describe('when a product configuration is not found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const mockProductType = 'INVALID PRODUCT TYPE';

        const url = `${baseUrl}/${mockProductType}`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });

    describe('when a product type is not provided', () => {
      it(`should return ${HttpStatus.NOT_FOUND} with validation errors`, async () => {
        // Arrange
        const url = `${baseUrl}/`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });

  describe('/product-configurations', () => {
    const url = `/api/${prefixAndVersion}/dom/product-configurations`;

    it(`should return ${HttpStatus.OK} with product configurations`, async () => {
      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      expect(body).toEqual(PRODUCT_CONFIG);
    });
  });
});
