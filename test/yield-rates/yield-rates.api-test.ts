import { INestApplication } from '@nestjs/common';
import { DATE } from '@ukef/constants';

import { Api } from '../api';
import { CreateApp } from '../createApp';

describe('Interest rates', () => {
  let app: INestApplication;
  let api: Api;

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  const yieldRateSchema = {
    id: expect.any(Number),
    shortName: expect.any(String),
    pxBidPrice: expect.any(Number),
    pxAskPrice: expect.any(Number),
    pxLastPrice: expect.any(Number),
    pxMidPrice: expect.any(Number),
    futureMonthYear: expect.any(String),
    sourceErrorCode: expect.any(Number),
    sourceUpdateTimestamp: expect.any(String),
    yieldIndex: expect.any(String),
    created: expect.any(String),
    updated: expect.any(String),
    effectiveFrom: expect.any(String),
    effectiveTo: expect.any(String),
  };

  it(`GET /yield-rates`, async () => {
    const { status, body } = await api.get('/yield-rates');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining({ ...yieldRateSchema, effectiveTo: DATE.MAXIMUM_TIMEZONE_LIMIT })]));
  });

  it(`GET /yield-rates?searchDate=2023-03-02`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=2023-03-02');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(yieldRateSchema)]));

    // Field effectiveTo should NOT be set to MAXIMUM LIMIT
    expect(body).not.toEqual(expect.arrayContaining([expect.objectContaining({ ...yieldRateSchema, effectiveTo: DATE.MAXIMUM_TIMEZONE_LIMIT })]));
  });

  it(`Expect 404 for GET /yield-rates?searchDate=2010-03-14`, async () => {
    const { status } = await api.get('/yield-rates?searchDate=2010-03-14');
    expect(status).toBe(404);
  });

  it(`Expect 400 for GET /yield-rates?searchDate=2023-03-02T16:29:04.027Z`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=2023-03-02T16:29:04.027Z');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate should use format YYYY-MM-DD');
  });

  it(`Expect 400 for GET /yield-rates?searchDate=a`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=a');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  it(`Expect 400 for GET /yield-rates?searchDate=null`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=null');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  it(`Expect 400 for GET /yield-rates?searchDate=undefined`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=undefined');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  afterAll(async () => {
    await app.close();
  });
});
