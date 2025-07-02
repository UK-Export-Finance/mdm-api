import { HttpStatus } from '@nestjs/common';
import { Api } from '@ukef-test/support/api';

describe('/ods/business-centres', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('/', () => {
    it(`should return ${HttpStatus.OK} with mapped business centres`, async () => {
      // Act
      const { status, body } = await api.get('/api/v1/ods/business-centres');

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

    // TODO: APIM-613 - create a mock request to mimic receiving a 500 error from ODS.
  });
});
