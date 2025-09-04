import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
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
