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
    it('should return 200 when the deal ID is a valid format and belongs to an existing deal', async () => {
      const { status, body } = await api.get('/api/v1/ods/deal/00325182');

      expect(status).toBe(200);

      expect(body).toEqual(expectedResult);
    });

    it('should return 404 when the deal ID is a valid format, but does not match an existing deal', async () => {
      const { status, body } = await api.get('/api/v1/ods/deal/99999999');

      expect(status).toBe(404);

      expect(body).toEqual({
        statusCode: 404,
        message: 'No matching deal found',
        error: 'Not Found',
      });
    });

    it('should return 400 when the deal ID is not the right length', async () => {
      const { status, body } = await api.get('/api/v1/ods/deal/1234567');

      expect(status).toBe(400);

      expect(body).toEqual({
        statusCode: 400,
        message: ['urn must match /^\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });

    it('should return 400 when the deal ID is not a list of numbers', async () => {
      const { status, body } = await api.get('/api/v1/ods/deal/abc');

      expect(status).toBe(400);

      expect(body).toEqual({
        statusCode: 400,
        message: ['Deal ID must match /^\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });
  });
});
