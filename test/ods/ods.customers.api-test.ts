import { HttpStatus } from '@nestjs/common';
import { Api } from '@ukef-test/support/api';

describe('/ods/customers', () => {
  let api: Api;

  const expectedResult = expect.objectContaining({
    name: expect.any(String),
    urn: expect.any(String),
  });

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/:urn', () => {
    it(`should return ${HttpStatus.OK} when the URN has a valid format and belongs to an existing customer`, async () => {
      // Act
      const { status, body } = await api.get('/api/v1/ods/customers/00325182');

      // Assert
      expect(status).toBe(HttpStatus.OK);

      expect(body).toEqual(expectedResult);
    });

    it(`should return ${HttpStatus.NOT_FOUND} when the URN has a valid format, but does not match an existing customer`, async () => {
      // Act
      const { status, body } = await api.get('/api/v1/ods/customers/99999999');

      // Assert
      expect(status).toBe(HttpStatus.NOT_FOUND);

      expect(body).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No customer found',
        error: 'Not Found',
      });
    });

    it(`should return ${HttpStatus.BAD_REQUEST} when the URN is not the right length`, async () => {
      // Act
      const { status, body } = await api.get('/api/v1/ods/customers/1234567');

      // Assert
      expect(status).toBe(HttpStatus.BAD_REQUEST);

      expect(body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['urn must match /^\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });

    it(`should return ${HttpStatus.BAD_REQUEST} when the URN does not match the regex`, async () => {
      // Act
      const { status, body } = await api.get('/api/v1/ods/customers/abc');

      // Assert
      expect(status).toBe(HttpStatus.BAD_REQUEST);

      expect(body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['urn must match /^\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });

    // TODO: APIM-613 - create a mock request to mimic receiving a 500 error from ODS.
  });
});
