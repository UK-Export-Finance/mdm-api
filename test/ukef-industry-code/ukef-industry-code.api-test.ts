import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES, INDUSTRY_CODE } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

const {
  versioning: { prefixAndVersion },
} = AppConfig();

describe('/ukef-industry-code/by-companies-house-industry-code', () => {
  const url = `/api/${prefixAndVersion}/ukef-industry-code/by-companies-house-industry-code`;

  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/:industryCode', () => {
    describe('when the industry code is a valid format and belongs to an existing industry code', () => {
      it(`should return ${HttpStatus.OK}`, async () => {
        // Arrange
        const mockIndustryCode = EXAMPLES.COMPANIES_HOUSE_INDUSTRY_CODE;

        // Act
        const response = await api.get(`${url}/${mockIndustryCode}`);

        const { status, body } = response;

        // Assert
        expect(status).toBe(HttpStatus.OK);

        const expected = {
          ukefIndustryCode: EXAMPLES.UKEF_INDUSTRY_CODE,
        };

        expect(body).toEqual(expected);
      });
    });

    describe('when the industry code is a valid format, but does collate to a UKEF industry code', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const mockIndustryCode = '1234';

        // Act
        const { status, body } = await api.get(`${url}/${mockIndustryCode}`);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);

        expect(body).toEqual({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No UKEF industry code found for Companies House industry code ${mockIndustryCode}`,
          error: 'Not Found',
        });
      });
    });

    describe('when the industry code is not a number string', () => {
      it(`should return ${HttpStatus.BAD_REQUEST}`, async () => {
        // Arrange
        const mockIndustryCode = 'ABCD';

        // Act
        const { status, body } = await api.get(`${url}/${mockIndustryCode}`);

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
        const mockIndustryCode = 'a'.repeat(INDUSTRY_CODE.EXACT_LENGTH - 1);

        // Act
        const { status, body } = await api.get(`${url}/${mockIndustryCode}`);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: [`industryCode must be exactly ${INDUSTRY_CODE.EXACT_LENGTH} characters long`, 'industryCode must be a number string'],
          error: 'Bad Request',
        });
      });
    });

    describe('when the industry code is above the exact length', () => {
      it(`should return ${HttpStatus.BAD_REQUEST}`, async () => {
        // Arrange
        const mockIndustryCode = 'a'.repeat(INDUSTRY_CODE.EXACT_LENGTH + 1);

        // Act
        const { status, body } = await api.get(`${url}/${mockIndustryCode}`);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          statusCode: HttpStatus.BAD_REQUEST,
          message: [`industryCode must be exactly ${INDUSTRY_CODE.EXACT_LENGTH} characters long`, 'industryCode must be a number string'],
          error: 'Bad Request',
        });
      });
    });

    // TODO: APIM-613 - create a mock request to mimic receiving a 500 error from ODS.
  });
});
