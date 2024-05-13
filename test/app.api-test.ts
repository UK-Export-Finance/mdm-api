import { Api } from '@ukef-test/support/api';

describe('AppController (e2e)', () => {
  let api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it(`GET /ready`, async () => {
    const { status } = await api.get('/api/v1/ready');

    expect(status).toBe(200);
  });
});
