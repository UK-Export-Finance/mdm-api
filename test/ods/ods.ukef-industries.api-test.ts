import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { COMPANIES, EXAMPLES } from '@ukef/constants';
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
        const url = `/api/${prefixAndVersion}/ods/ukef-industry/0000`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });
  });

  describe('/ukef-industry-code/by-companies-house-industry-code/:companiesHouseIndustryCode', () => {
    const baseUrl = `/api/${prefixAndVersion}/ods/ukef-industry-code`;

    describe(`with a UKEF industry code - ${COMPANIES.INDUSTRY_CODE.MODERN_LENGTH} digits`, () => {
      it(`should return ${HttpStatus.OK}`, async () => {
        // Act
        const { status, body } = await api.get(`${baseUrl}/by-companies-house-industry-code/${EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE}`);

        // Assert
        expect(status).toBe(HttpStatus.OK);

        const expected = {
          ukefIndustryCode: expect.any(String),
        };

        expect(body).toEqual(expected);
      });

      describe('when a single UKEF industry is NOT found', () => {
        it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
          // Arrange
          const mockIndustryCode = '00000';

          // Act
          const { status } = await api.get(`${baseUrl}/by-companies-house-industry-code/${mockIndustryCode}`);

          // Assert
          expect(status).toBe(HttpStatus.NOT_FOUND);
        });
      });
    });

    describe(`with a UKEF industry code - ${COMPANIES.INDUSTRY_CODE.LEGACY_LENGTH} digits`, () => {
      it(`should return ${HttpStatus.OK} with a UKEF industry code - ${COMPANIES.INDUSTRY_CODE.LEGACY_LENGTH} digits`, async () => {
        // Act
        const { status, body } = await api.get(`${baseUrl}/by-companies-house-industry-code/${EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE_FOUR_DIGITS}`);

        // Assert
        expect(status).toBe(HttpStatus.OK);

        const expected = {
          ukefIndustryCode: expect.any(String),
        };

        expect(body).toEqual(expected);
      });

      describe('when a single UKEF industry is NOT found', () => {
        it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
          // Arrange
          const mockIndustryCode = '0000';

          // Act
          const { status } = await api.get(`${baseUrl}/by-companies-house-industry-code/${mockIndustryCode}`);

          // Assert
          expect(status).toBe(HttpStatus.NOT_FOUND);
        });
      });
    });

    describe('when the industry code is above the maximum length', () => {
      it(`should return ${HttpStatus.BAD_REQUEST}`, async () => {
        // Arrange
        const mockIndustryCode = '000000';

        // Act
        const { status, body } = await api.get(`${baseUrl}/by-companies-house-industry-code/${mockIndustryCode}`);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: [`companiesHouseIndustryCode must be shorter than or equal to ${COMPANIES.INDUSTRY_CODE.MODERN_LENGTH} characters`],
          error: 'Bad Request',
        });
      });
    });

    describe('when the industry code is below the minimum length', () => {
      it(`should return ${HttpStatus.BAD_REQUEST}`, async () => {
        // Arrange
        const mockIndustryCode = '000';

        // Act
        const { status, body } = await api.get(`${baseUrl}/by-companies-house-industry-code/${mockIndustryCode}`);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: [`companiesHouseIndustryCode must be longer than or equal to ${COMPANIES.INDUSTRY_CODE.LEGACY_LENGTH} characters`],
          error: 'Bad Request',
        });
      });
    });

    describe('when the industry code is not a number string', () => {
      it(`should return ${HttpStatus.BAD_REQUEST}`, async () => {
        // Arrange
        const mockIndustryCode = 'ABCDE';

        // Act
        const { status, body } = await api.get(`${baseUrl}/by-companies-house-industry-code/${mockIndustryCode}`);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: [`companiesHouseIndustryCode must be a number string`],
          error: 'Bad Request',
        });
      });
    });
  });
});
