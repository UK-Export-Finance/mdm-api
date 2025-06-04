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
    it('should return 200 when the urn has a valid format and belongs to an existing customer', async () => {
      const { status, body } = await api.get('/api/v1/ods/customers/00325182');

      expect(status).toBe(200);

      expect(body).toEqual(expectedResult);
    });

    it('should return 404 when the urn has a valid format, but does not match an existing customer', async () => {
      const { status, body } = await api.get('/api/v1/ods/customers/99999999');

      expect(status).toBe(404);

      expect(body).toEqual({
        statusCode: 404,
        message: 'No matching customer found',
        error: 'Not Found',
      });
    });

    it('should return 400 when the urn is not the right length', async () => {
      const { status, body } = await api.get('/api/v1/ods/customers/1234567');

      expect(status).toBe(400);

      expect(body).toEqual({
        statusCode: 400,
        message: ['urn must match /^\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });

    it('should return 400 when the urn is not a list of numbers', async () => {
      const { status, body } = await api.get('/api/v1/ods/customers/abc');

      expect(status).toBe(400);

      expect(body).toEqual({
        statusCode: 400,
        message: ['urn must match /^\\d{8}$/ regular expression'],
        error: 'Bad Request',
      });
    });
  });
});
