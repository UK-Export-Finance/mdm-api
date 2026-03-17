import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { COMPANIES_HOUSE, EXAMPLES, UKEF_INDUSTRY_CODE } from '@ukef/constants';
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

  describe('/ukef-industry-code/:industryCode/by-companies-house-industry-code', () => {
    const baseUrl = `/api/${prefixAndVersion}/ods/ukef-industry-code`;

    it(`should return ${HttpStatus.OK} with a UKEF industry code`, async () => {
      // Act
      const { status, body } = await api.get(`${baseUrl}/${EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE}/by-companies-house-industry-code`);

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
        const { status } = await api.get(`${baseUrl}/${mockIndustryCode}/by-companies-house-industry-code`);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });

    describe('when the industry code is a valid format, but does collate to a UKEF industry code', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const mockIndustryCode = '12345';

        // Act
        const { status, body } = await api.get(`${baseUrl}/${mockIndustryCode}/by-companies-house-industry-code`);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);

        expect(body).toEqual({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No UKEF industry by Companies House industry code ${mockIndustryCode} found in ODS`,
          error: 'Not Found',
        });
      });
    });

    describe('when the industry code is not a number string', () => {
      it(`should return ${HttpStatus.BAD_REQUEST}`, async () => {
        // Arrange
        const mockIndustryCode = 'ABCDE';

        // Act
        const { status, body } = await api.get(`${baseUrl}/${mockIndustryCode}/by-companies-house-industry-code`);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['industryCode must be a number string'],
          error: 'Bad Request',
        });
      });
    });

    describe('when the industry code is below the exact length', () => {
      it(`should return ${HttpStatus.BAD_REQUEST}`, async () => {
        // Arrange
        const mockIndustryCode = 'a'.repeat(COMPANIES_HOUSE.INDUSTRY_CODE.EXACT_LENGTH - 1);

        // Act
        const { status, body } = await api.get(`${baseUrl}/${mockIndustryCode}/by-companies-house-industry-code`);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: [`industryCode must be exactly ${UKEF_INDUSTRY_CODE.EXACT_LENGTH} characters long`, 'industryCode must be a number string'],
          error: 'Bad Request',
        });
      });
    });

    describe('when the industry code is above the exact length', () => {
      it(`should return ${HttpStatus.BAD_REQUEST}`, async () => {
        // Arrange
        const mockIndustryCode = 'a'.repeat(COMPANIES_HOUSE.INDUSTRY_CODE.EXACT_LENGTH + 1);

        // Act
        const { status, body } = await api.get(`${baseUrl}/${mockIndustryCode}`);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: [`industryCode must be exactly ${COMPANIES_HOUSE.INDUSTRY_CODE.EXACT_LENGTH} characters long`, 'industryCode must be a number string'],
          error: 'Bad Request',
        });
      });
    });
  });
});
