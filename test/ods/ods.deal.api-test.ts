import { HttpStatus } from '@nestjs/common';
import { Api } from '@ukef-test/support/api';

describe('/ods/deal', () => {
  let api: Api;

  const expectedResult = expect.objectContaining({
    dealId: expect.any(String),
    name: expect.any(String),
  });

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/:id', () => {
    it(`should return ${HttpStatus.OK} when the deal ID is a valid format and belongs to an existing deal`, async () => {
      const { status, body } = await api.get('/api/v1/ods/deal/00325182');

      expect(status).toBe(HttpStatus.OK);

      expect(body).toEqual(expectedResult);
    });

    it(`should return ${HttpStatus.NOT_FOUND} when the deal ID is a valid format, but does not match an existing deal`, async () => {
      const { status, body } = await api.get('/api/v1/ods/deal/99999999');

      expect(status).toBe(HttpStatus.NOT_FOUND);

      expect(body).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No matching deal found',
        error: 'Not Found',
      });
    });

    it(`should return ${HttpStatus.BAD_REQUEST} when the deal ID is not the right length`, async () => {
      const { status, body } = await api.get('/api/v1/ods/deal/1234567');

      expect(status).toBe(HttpStatus.BAD_REQUEST);

      expect(body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['urn must match /^\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });

    it(`should return ${HttpStatus.BAD_REQUEST} when the deal ID does not match the regex`, async () => {
      const { status, body } = await api.get('/api/v1/ods/deal/abc');

      expect(status).toBe(HttpStatus.BAD_REQUEST);

      expect(body).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['Deal ID must match /^\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });

    // TODO: APIM-613 - create a mock request to mimick receiving a 500 error from ODS.
  });
});
