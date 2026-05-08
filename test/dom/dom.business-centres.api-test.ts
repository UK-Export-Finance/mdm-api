import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { EXAMPLES } from '@ukef/constants';
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
        const mockCentreCode = EXAMPLES.BUSINESS_CENTRE.CODE;

        const url = `/api/${prefixAndVersion}/dom/business-centre/${mockCentreCode}`;

        // Act
        const { status, body } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.OK);

        const expected = {
          code: EXAMPLES.BUSINESS_CENTRE.CODE,
          name: EXAMPLES.BUSINESS_CENTRE.NAME,
          description: EXAMPLES.BUSINESS_CENTRE.DESCRIPTION,
          isActive: EXAMPLES.BUSINESS_CENTRE.IS_ACTIVE,
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

  describe('/business-center/:centreCode/non-working-days', () => {
    // Arrange
    const baseUrl = `/api/${prefixAndVersion}/dom/business-centre`;

    it(`should return ${HttpStatus.OK} with mapped non working days`, async () => {
      // Arrange
      const mockCentreCode = EXAMPLES.BUSINESS_CENTRE.CODE;

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

      const expected = expect.arrayContaining([
        expect.objectContaining({
          code: expect.any(String),
          name: expect.any(String),
        }),
      ]);

      expect(body).toEqual(expected);
    });
  });

  describe('/business-centres/non-working-days', () => {
    const baseUrl = `/api/${prefixAndVersion}/dom/business-centres/non-working-days`;

    it(`should return ${HttpStatus.OK} with mapped business centres`, async () => {
      // Arrange
      const mockCentreCodes = `${EXAMPLES.BUSINESS_CENTRE.CODE},${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE}`;

      const url = `${baseUrl}?centreCodes=${mockCentreCodes}`;

      // Act
      const { status, body } = await api.get(url);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      expect(Object.keys(body)).toHaveLength(2);

      expect(body[EXAMPLES.BUSINESS_CENTRE.CODE]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: EXAMPLES.BUSINESS_CENTRE.CODE,
            name: expect.any(String),
            date: expect.any(String),
          }),
        ]),
      );

      expect(body[EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            code: EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE,
            name: expect.any(String),
            date: expect.any(String),
          }),
        ]),
      );
    });

    describe("when a single business centre's non working days are NOT found", () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const mockCentreCodes = `${EXAMPLES.BUSINESS_CENTRE.CODE},INVALID CODE`;

        const url = `${baseUrl}?centreCodes=${mockCentreCodes}`;

        // Act
        const { status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.NOT_FOUND);
      });
    });

    describe('when all business centres non working days are NOT found', () => {
      it(`should return ${HttpStatus.NOT_FOUND}`, async () => {
        // Arrange
        const mockCentreCodes = `INVALID CODE,INVALID CODE`;

        const url = `${baseUrl}?centreCodes=${mockCentreCodes}`;

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

        const url = `${baseUrl}?centreCodes=${mockParam}`;

        // Act
        const { body, status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: ['centreCodes must be longer than or equal to 3 characters'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });

    describe('when a query param with a string above the maximum is provided', () => {
      it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
        // Arrange
        const mockParam = 'a'.repeat(31);

        const url = `${baseUrl}?centreCodes=${mockParam}`;

        // Act
        const { body, status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: ['centreCodes must be shorter than or equal to 30 characters'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });

    describe('when no query params are provided', () => {
      it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
        // Arrange
        const url = `${baseUrl}`;

        // Act
        const { status, body } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: [
            'centreCodes must be shorter than or equal to 30 characters',
            'centreCodes must be longer than or equal to 3 characters',
            'centreCodes must be a string',
          ],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });

    describe('when an empty query param is provided', () => {
      it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
        // Arrange
        const url = `${baseUrl}?centreCodes=`;

        // Act
        const { body, status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: ['centreCodes must be longer than or equal to 3 characters'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });

    describe('when a query param with an empty string is provided', () => {
      it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
        // Arrange
        const url = `${baseUrl}?centreCodes=''`;

        // Act
        const { body, status } = await api.get(url);

        // Assert
        expect(status).toBe(HttpStatus.BAD_REQUEST);

        expect(body).toEqual({
          message: ['centreCodes must be longer than or equal to 3 characters'],
          error: 'Bad Request',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });
    });
    describe('with optional date filters', () => {
      describe('when startDate and endDate filters are provided in YYYY-MM-DD format', () => {
        it(`should return ${HttpStatus.OK} with filtered non-working days`, async () => {
          // Arrange
          const mockCentreCodes = `${EXAMPLES.BUSINESS_CENTRE.CODE},${EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE}`;
          const startDate = '2026-01-01';
          const endDate = '2026-12-31';

          const url = `${baseUrl}?centreCodes=${mockCentreCodes}&startDate=${startDate}&endDate=${endDate}`;

          // Act
          const { status, body } = await api.get(url);

          // Assert
          expect(status).toBe(HttpStatus.OK);

          expect(Object.keys(body)).toHaveLength(2);

          expect(body[EXAMPLES.BUSINESS_CENTRE.CODE]).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                code: EXAMPLES.BUSINESS_CENTRE.CODE,
                name: expect.any(String),
                date: expect.any(String),
              }),
            ]),
          );

          expect(body[EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE]).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                code: EXAMPLES.BUSINESS_CENTRE_ALTERNATIVE_EXAMPLE.CODE,
                name: expect.any(String),
                date: expect.any(String),
              }),
            ]),
          );
        });
      });

      describe('when only startDate filter is provided', () => {
        it(`should return ${HttpStatus.OK} with non-working days from startDate onwards`, async () => {
          // Arrange
          const mockCentreCodes = EXAMPLES.BUSINESS_CENTRE.CODE;
          const startDate = '2026-06-01';

          const url = `${baseUrl}?centreCodes=${mockCentreCodes}&startDate=${startDate}`;

          // Act
          const { status, body } = await api.get(url);

          // Assert
          expect(status).toBe(HttpStatus.OK);

          expect(body[EXAMPLES.BUSINESS_CENTRE.CODE]).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                code: EXAMPLES.BUSINESS_CENTRE.CODE,
                name: expect.any(String),
                date: expect.any(String),
              }),
            ]),
          );
        });
      });

      describe('when only endDate filter is provided', () => {
        it(`should return ${HttpStatus.OK} with non-working days up to endDate`, async () => {
          // Arrange
          const mockCentreCodes = EXAMPLES.BUSINESS_CENTRE.CODE;
          const endDate = '2026-06-30';

          const url = `${baseUrl}?centreCodes=${mockCentreCodes}&endDate=${endDate}`;

          // Act
          const { status, body } = await api.get(url);

          // Assert
          expect(status).toBe(HttpStatus.OK);

          expect(body[EXAMPLES.BUSINESS_CENTRE.CODE]).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                code: EXAMPLES.BUSINESS_CENTRE.CODE,
                name: expect.any(String),
                date: expect.any(String),
              }),
            ]),
          );
        });
      });

      describe('when startDate is provided in an invalid format', () => {
        it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
          // Arrange
          const mockCentreCodes = EXAMPLES.BUSINESS_CENTRE.CODE;
          const invalidStartDate = '01-06-2026'; // MM-DD-YYYY format instead of YYYY-MM-DD

          const url = `${baseUrl}?centreCodes=${mockCentreCodes}&startDate=${invalidStartDate}`;

          // Act
          const { status, body } = await api.get(url);

          // Assert
          expect(status).toBe(HttpStatus.BAD_REQUEST);

          expect(body).toEqual({
            message: expect.arrayContaining([expect.stringContaining('startDate')]),
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        });
      });

      describe('when endDate is provided in an invalid format', () => {
        it(`should return ${HttpStatus.BAD_REQUEST} with validation errors`, async () => {
          // Arrange
          const mockCentreCodes = EXAMPLES.BUSINESS_CENTRE.CODE;
          const invalidEndDate = '12/31/2026'; // MM/DD/YYYY format instead of YYYY-MM-DD

          const url = `${baseUrl}?centreCodes=${mockCentreCodes}&endDate=${invalidEndDate}`;

          // Act
          const { status, body } = await api.get(url);

          // Assert
          expect(status).toBe(HttpStatus.BAD_REQUEST);

          expect(body).toEqual({
            message: expect.arrayContaining([expect.stringContaining('endDate')]),
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        });
      });

      describe('when startDate exceeds max length for YYYY-MM-DD format', () => {
        it(`should return ${HttpStatus.BAD_REQUEST} with validation error`, async () => {
          // Arrange
          const mockCentreCodes = EXAMPLES.BUSINESS_CENTRE.CODE;
          const invalidStartDate = '2026-01-01T10:00:00'; // includes time

          const url = `${baseUrl}?centreCodes=${mockCentreCodes}&startDate=${encodeURIComponent(invalidStartDate)}`;

          // Act
          const { status, body } = await api.get(url);

          // Assert
          expect(status).toBe(HttpStatus.BAD_REQUEST);

          expect(body).toEqual({
            message: expect.arrayContaining([expect.stringContaining('startDate should use format YYYY-MM-DD')]),
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        });
      });

      describe('when endDate exceeds max length for YYYY-MM-DD format', () => {
        it(`should return ${HttpStatus.BAD_REQUEST} with validation error`, async () => {
          // Arrange
          const mockCentreCodes = EXAMPLES.BUSINESS_CENTRE.CODE;
          const invalidEndDate = '2026-12-31T23:59:59'; // includes time

          const url = `${baseUrl}?centreCodes=${mockCentreCodes}&endDate=${encodeURIComponent(invalidEndDate)}`;

          // Act
          const { status, body } = await api.get(url);

          // Assert
          expect(status).toBe(HttpStatus.BAD_REQUEST);

          expect(body).toEqual({
            message: expect.arrayContaining([expect.stringContaining('endDate should use format YYYY-MM-DD')]),
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        });
      });
    });
  });
});
