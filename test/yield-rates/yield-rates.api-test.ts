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

  // UKEF at the moment has yield rates since 2010-03-15, maybe some old data will be retired in future.
  it(`returns 404 for any date past 2010-03-15 where the yield data does not exist`, async () => {
    const { status } = await api.get('/yield-rates?searchDate=2010-03-14');
    expect(status).toBe(404);
  });

  // Current yield rates have effective date till 9999-12-31, so 9999-12-30 is max date with results.
  it(`GET /yield-rates?searchDate=9999-12-30`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=9999-12-30');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining({ ...yieldRateSchema, effectiveTo: DATE.MAXIMUM_TIMEZONE_LIMIT })]));
  });

  // Current yield rates have effective date till 9999-12-31, so no rates for this max date.
  it(`returns 404 for GET /yield-rates?searchDate=9999-12-31`, async () => {
    const { status } = await api.get('/yield-rates?searchDate=9999-12-31');
    expect(status).toBe(404);
  });

  it(`returns 400 for GET /yield-rates?searchDate=2023-03-02T16:29:04.027Z`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=2023-03-02T16:29:04.027Z');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate should use format YYYY-MM-DD');
  });

  it(`returns 400 for GET /yield-rates?searchDate=null`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=null');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  it(`returns 400 for GET /yield-rates?searchDate=undefined`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=undefined');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  it(`returns 400 for GET /yield-rates?searchDate=ABC`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=ABC');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  it(`returns 400 for GET /yield-rates?searchDate=123`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=123');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  it(`returns 400 for GET /yield-rates?searchDate=!"£!"£`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=!"£!"£');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  it(`returns 400 for GET /yield-rates?searchDate=A%20£`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=A%20£');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  it(`returns 400 for GET /yield-rates?searchDate=++`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=++');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  it(`returns 400 for GET /yield-rates?searchDate=0000-00-00`, async () => {
    const { status, body } = await api.get('/yield-rates?searchDate=0000-00-00');
    expect(status).toBe(400);
    expect(body.message).toContain('searchDate must be a valid ISO 8601 date string');
  });

  afterAll(async () => {
    await app.close();
  });
});
