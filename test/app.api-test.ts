import { INestApplication } from '@nestjs/common';
import { CreateApp } from './createApp';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let api;

  beforeEach(async () => {
    app = await new CreateApp().init();
    api = require('./api')(app.getHttpServer());
  });

  it(`GET /live`, async () => {
    const { status } = await api.get('/live');
    expect(status).toEqual(200);
  });

  afterAll(async () => {
    await app.close();
  });

});
