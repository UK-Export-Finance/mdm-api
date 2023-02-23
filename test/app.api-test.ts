import { INestApplication } from '@nestjs/common';

import { Api } from './api';
import { CreateApp } from './createApp';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let api;

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  it(`GET /ready`, async () => {
    const { status } = await api.get('/ready');

    expect(status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
