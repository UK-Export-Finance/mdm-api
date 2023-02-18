import { INestApplication } from '@nestjs/common';

import { Api } from '../api';
import { CreateApp } from '../createApp';
import getMarketsExpectation from './expected-responses/GET-markets.json';
import getMarketsActiveNExpectation from './expected-responses/GET-markets-query-active-N.json';
import getMarketsActiveYExpectation from './expected-responses/GET-markets-query-active-Y.json';

describe('Markets', () => {
  let app: INestApplication;
  let api;

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  it(`GET /markets`, async () => {
    const { status, body } = await api.get('/markets');
    expect(status).toEqual(200);
    expect(body).toEqual(getMarketsExpectation);
  });

  it(`GET /markets?active=Y`, async () => {
    const { status, body } = await api.get('/markets?active=Y');
    expect(status).toEqual(200);
    expect(body).toEqual(getMarketsActiveYExpectation);
  });

  it(`GET /markets?active=N`, async () => {
    const { status, body } = await api.get('/markets?active=N');
    expect(status).toEqual(200);
    expect(body).toEqual(getMarketsActiveNExpectation);
  });

  it(`GET /markets?active=something-else`, async () => {
    const { status, body } = await api.get('/markets?active=something-else');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  it(`GET /markets?active=`, async () => {
    const { status, body } = await api.get('/markets?active=');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  it(`GET /markets?active=null`, async () => {
    const { status, body } = await api.get('/markets?active=null');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  it(`GET /markets?active=undefined`, async () => {
    const { status, body } = await api.get('/markets?active=undefined');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  afterAll(async () => {
    await app.close();
  });
});
