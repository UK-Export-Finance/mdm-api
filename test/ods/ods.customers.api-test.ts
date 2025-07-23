import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { Api } from '@ukef-test/support/api';

const {
  domOdsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods - customers', () => {
  const url = `/api/${prefixAndVersion}/ods/customers`;

  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/customers/:urn', () => {
    it(`should return ${HttpStatus.OK} when the URN has a valid format and belongs to an existing customer`, async () => {
      // Arrange
      const mockUrn = '00325182';

      // Act
      const { status, body } = await api.get(`${url}/${mockUrn}`);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.objectContaining({
        name: expect.any(String),
        urn: expect.any(String),
      });

      expect(body).toEqual(expected);
    });

    it(`should return ${HttpStatus.NOT_FOUND} when the URN has a valid format, but does not match an existing customer`, async () => {
      // Arrange
      const mockUrn = '99999999';

      // Act
      const { status, body } = await api.get(`${url}/${mockUrn}`);

      // Assert
      expect(status).toBe(HttpStatus.NOT_FOUND);

      expect(body).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No customer found ${mockUrn}`,
        error: 'Not Found',
      });
    });

    it(`should return ${HttpStatus.BAD_REQUEST} when the URN is not the right length`, async () => {
      // Arrange
      const mockUrn = '1234567';

      // Act
      const { status, body } = await api.get(`${url}/${mockUrn}`);

      // Assert
      expect(status).toBe(HttpStatus.BAD_REQUEST);

      expect(body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['urn must match /^\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });

    it(`should return ${HttpStatus.BAD_REQUEST} when the URN does not match the regex`, async () => {
      // Arrange
      const mockUrn = 'abc';

      // Act
      const { status, body } = await api.get(`${url}/${mockUrn}`);

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
