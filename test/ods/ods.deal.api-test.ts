import { HttpStatus } from '@nestjs/common';
import AppConfig from '@ukef/config/app.config';
import { Api } from '@ukef-test/support/api';

const {
  odsVersioning: { prefixAndVersion },
} = AppConfig();

describe('/ods/v2/deal', () => {
  const url = `/api/${prefixAndVersion}/ods/deal`;

  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/:id', () => {
    it(`should return ${HttpStatus.OK} when the deal ID is a valid format and belongs to an existing deal`, async () => {
      // Arrange
      const mockId = '0000000436';

      // Act
      const { status, body } = await api.get(`${url}/${mockId}`);

      // Assert
      expect(status).toBe(HttpStatus.OK);

      const expected = expect.objectContaining({
        dealId: expect.any(String),
        name: expect.any(String),
      });

      expect(body).toEqual(expected);
    });

    it(`should return ${HttpStatus.NOT_FOUND} when the deal ID is a valid format, but does not match an existing deal`, async () => {
      // Arrange
      const mockId = '0000000001';

      // Act
      const { status, body } = await api.get(`${url}/${mockId}`);

      // Assert
      expect(status).toBe(HttpStatus.NOT_FOUND);

      expect(body).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No deal found ${mockId}`,
        error: 'Not Found',
      });
    });

    it(`should return ${HttpStatus.BAD_REQUEST} when the deal ID is not the right length`, async () => {
      // Arrange
      const mockId = '1234567';

      // Act
      const { status, body } = await api.get(`${url}/${mockId}`);

      // Assert
      expect(status).toBe(HttpStatus.BAD_REQUEST);

      expect(body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['id must match /^00\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });

    it(`should return ${HttpStatus.BAD_REQUEST} when the deal ID does not match the regex`, async () => {
      // Arrange
      const mockId = 'abc';

      // Act
      const { status, body } = await api.get(`${url}/${mockId}`);

      // Assert
      expect(status).toBe(HttpStatus.BAD_REQUEST);

      expect(body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['id must match /^00\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });

    // TODO: APIM-613 - create a mock request to mimic receiving a 500 error from ODS.
  });
});
