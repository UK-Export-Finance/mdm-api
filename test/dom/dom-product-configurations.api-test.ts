import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/dom - product-configuration', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/product-configuration/:productType', () => {
    const baseUrl = `/api/${prefixAndVersion}/dom/product-configuration`;

    const expectedProductConfigShape = expect.objectContaining({
      productType: expect.any(String),
      name: expect.any(String),
      shortName: expect.any(String),
      configuration: expect.objectContaining({
        creditType: expect.any(String),
        leadDays: expect.objectContaining({
          repayments: expect.any(Number),
          interestAccruals: expect.any(Number),
          accruingFees: expect.any(Number),
        }),
        fees: expect.objectContaining({
          creation: expect.any(String),
          inLife: expect.any(String),
        }),
        reinsurance: expect.objectContaining({
          creation: expect.any(String),
          inLife: expect.any(String),
        }),
      }),
      additionalRates: expect.any(Array),
      accrualSchedules: expect.any(Array),
      baseRates: expect.any(Array),
      counterpartyRoleTypes: expect.any(Array),
      facilityCategoryTypes: expect.any(Array),
      feeTypes: expect.any(Array),
      obligationSubtypes: expect.any(Array),
      account: expect.any(Array),
    });

    it(`should return ${HttpStatus.OK} with product configuration - ${EXAMPLES.PRODUCT_TYPES.BIP}`, async () => {
      // Arrange
      const url = `${baseUrl}/${EXAMPLES.PRODUCT_TYPES.BIP}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      expect(body).toEqual(expectedProductConfigShape);

      expect(body.productType).toEqual(EXAMPLES.PRODUCT_TYPES.BIP);
    });

    it(`should return ${HttpStatus.OK} with product configuration - ${EXAMPLES.PRODUCT_TYPES.EXIP}`, async () => {
      // Arrange
      const url = `${baseUrl}/${EXAMPLES.PRODUCT_TYPES.EXIP}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      expect(body).toEqual(expectedProductConfigShape);

      expect(body.productType).toEqual(EXAMPLES.PRODUCT_TYPES.EXIP);
    });

    it(`should return ${HttpStatus.OK} with product configuration - ${EXAMPLES.PRODUCT_TYPES.BSS}`, async () => {
      // Arrange
      const url = `${baseUrl}/${EXAMPLES.PRODUCT_TYPES.BSS}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      expect(body).toEqual(expectedProductConfigShape);

      expect(body.productType).toEqual(EXAMPLES.PRODUCT_TYPES.BSS);
    });

    it(`should return ${HttpStatus.OK} with product configuration - ${EXAMPLES.PRODUCT_TYPES.GEF}`, async () => {
      // Arrange
      const url = `${baseUrl}/${EXAMPLES.PRODUCT_TYPES.GEF}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      expect(body).toEqual(expectedProductConfigShape);

      expect(body.productType).toEqual(EXAMPLES.PRODUCT_TYPES.GEF);
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

      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            productType: expect.any(String),
            name: expect.any(String),
            shortName: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('/product-configurations-by-type', () => {
    const baseUrl = `/api/${prefixAndVersion}/dom/product-configurations-by-type`;

    it(`should return ${HttpStatus.OK} with product configurations`, async () => {
      // Arrange
      const url = `${baseUrl}?productTypes=${EXAMPLES.PRODUCT_TYPES.BIP},${EXAMPLES.PRODUCT_TYPES.GEF}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = {
        [EXAMPLES.PRODUCT_TYPES.BIP]: expect.objectContaining({ productType: EXAMPLES.PRODUCT_TYPES.BIP }),
        [EXAMPLES.PRODUCT_TYPES.GEF]: expect.objectContaining({ productType: EXAMPLES.PRODUCT_TYPES.GEF }),
      };

      expect(body).toEqual(expected);
    });

    describe('when a single product configuration is NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `${baseUrl}?productTypes=${EXAMPLES.PRODUCT_TYPES.BIP},INVALID CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });

    describe('when all product configurations are NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const url = `${baseUrl}?productTypes=INVALID CODE,INVALID CODE`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });

    describe('when a query param with a string below the minimum is provided', () => {
      it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
        // Arrange
        const mockParam = 'ab';

        const url = `${baseUrl}?productTypes=${mockParam}`;

        // Act
        const { body, status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: ['productTypes must be longer than or equal to 3 characters'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });

    describe('when a query param with a string above the maximum is provided', () => {
      it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
        // Arrange
        const mockParam = 'a'.repeat(31);

        const url = `${baseUrl}?productTypes=${mockParam}`;

        // Act
        const { body, status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: ['productTypes must be shorter than or equal to 30 characters'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });

    describe('when no query params are provided', () => {
      it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
        // Act
        const { body, status } = await api.get(baseUrl);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: [
            'productTypes must be shorter than or equal to 30 characters',
            'productTypes must be longer than or equal to 3 characters',
            'productTypes must be a string',
          ],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });

    describe('when an empty query param is provided', () => {
      it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
        // Arrange
        const url = `${baseUrl}?productTypes=`;

        // Act
        const { body, status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: ['productTypes must be longer than or equal to 3 characters'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });

    describe('when a query param with an empty string is provided', () => {
      it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
        // Arrange
        const url = `${baseUrl}?productTypes=''`;

        // Act
        const { body, status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: ['productTypes must be longer than or equal to 3 characters'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });
  });
});
