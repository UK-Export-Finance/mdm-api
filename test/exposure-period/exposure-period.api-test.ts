import { PRODUCTS } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';

describe('Exposure period', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it(`GET /exposure-period?startdate=2017-07-04&enddate=2018-07-04&productgroup=${PRODUCTS.EW}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-07-04&enddate=2018-07-04&productgroup=${PRODUCTS.EW}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(12);
  });

  it(`GET /exposure-period?startdate=2017-07-04&enddate=2018-07-05&productgroup=${PRODUCTS.EW}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-07-04&enddate=2018-07-05&productgroup=${PRODUCTS.EW}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(13);
  });

  it(`GET /exposure-period?startdate=2017-07-04&enddate=2018-07-04&productgroup=${PRODUCTS.BS}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-07-04&enddate=2018-07-04&productgroup=${PRODUCTS.BS}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(13);
  });

  it(`GET /exposure-period?startdate=2017-07-04&enddate=2018-07-05&productgroup=${PRODUCTS.BS}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-07-04&enddate=2018-07-05&productgroup=${PRODUCTS.BS}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(13);
  });

  /**
   * Exposure period logic depends on:
   *   * product group
   *   * if start date is end of month
   *   * if end date is end of month
   *   * if start and end month day matches. For examples 5th March and 5th April is same day since the start of the relevant month.
   * Tests have data to test these edge cases.
   * EOM = date is end of month.
   * DOM = day of month - the actual number of days since the start of the relevant month.
   */

  // EW Start is EOM
  it(`GET /exposure-period?startdate=2017-03-31&enddate=2017-04-01&productgroup=${PRODUCTS.EW}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-03-31&enddate=2017-04-01&productgroup=${PRODUCTS.EW}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(1);
  });

  // BS Start is EOM
  it(`GET /exposure-period?startdate=2017-03-31&enddate=2017-04-29&productgroup=${PRODUCTS.BS}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-03-31&enddate=2017-04-29&productgroup=${PRODUCTS.BS}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(1);
  });

  // EW Start is EOM, end is EOM
  it(`GET /exposure-period?startdate=2017-03-31&enddate=2017-04-30&productgroup=${PRODUCTS.EW}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-03-31&enddate=2017-04-30&productgroup=${PRODUCTS.EW}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(1);
  });

  // BS Start is EOM, end is EOM, +1 for exposure
  it(`GET /exposure-period?startdate=2017-03-31&enddate=2017-04-30&productgroup=${PRODUCTS.BS}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-03-31&enddate=2017-04-30&productgroup=${PRODUCTS.BS}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(2);
  });

  // EW Start DOM = End DOM
  it(`GET /exposure-period?startdate=2017-03-05&enddate=2017-04-05&productgroup=${PRODUCTS.EW}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-03-05&enddate=2017-04-05&productgroup=${PRODUCTS.EW}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(1);
  });

  // BS Start DOM = End DOM, +1 for exposure
  it(`GET /exposure-period?startdate=2017-03-05&enddate=2017-04-05&productgroup=${PRODUCTS.BS}`, async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period?startdate=2017-03-05&enddate=2017-04-05&productgroup=${PRODUCTS.BS}`);
    expect(status).toBe(200);
    expect(body.exposurePeriod).toBe(2);
  });

  // Input error handling checks

  it('GET /exposure-period', async () => {
    const { status, body } = await api.get(`/api/v1/exposure-period`);
    expect(status).toBe(400);
    expect(body.message).toContain('startdate must be a valid ISO 8601 date string');
    expect(body.message).toContain('enddate must be a valid ISO 8601 date string');
    expect(body.message).toContain('productgroup must be one of the following values: EW, BS');
    expect(body.message).toContain('productgroup must be a string');
  });

  it('Should fail Feb 29 and Feb 30 - GET /exposure-period?startdate=2017-02-29&enddate=2017-02-30&productgroup=test', async () => {
    const { status, body } = await api.get('/api/v1/exposure-period?startdate=2017-02-29&enddate=2017-02-30&productgroup=test');
    expect(status).toBe(400);
    expect(body.message).toContain('startdate must be a valid ISO 8601 date string');
    expect(body.message).toContain('enddate must be a valid ISO 8601 date string');
    expect(body.message).toContain('productgroup must be one of the following values: EW, BS');
  });

  it('GET /exposure-period?startdate=2017-01-32&enddate=2017-02-32&productgroup=test', async () => {
    const { status, body } = await api.get('/api/v1/exposure-period?startdate=2017-01-32&enddate=2017-02-32&productgroup=test');
    expect(status).toBe(400);
    expect(body.message).toContain('startdate must be a valid ISO 8601 date string');
    expect(body.message).toContain('enddate must be a valid ISO 8601 date string');
    expect(body.message).toContain('productgroup must be one of the following values: EW, BS');
  });

  it('GET /exposure-period?startdate=null&enddate=null&productgroup=null', async () => {
    const { status, body } = await api.get('/api/v1/exposure-period?startdate=null&enddate=null&productgroup=null');
    expect(status).toBe(400);
    expect(body.message).toContain('startdate must be a valid ISO 8601 date string');
    expect(body.message).toContain('enddate must be a valid ISO 8601 date string');
    expect(body.message).toContain('productgroup must be one of the following values: EW, BS');
  });

  it('GET /exposure-period?startdate=undefined&enddate=undefined&productgroup=undefined', async () => {
    const { status, body } = await api.get('/api/v1/exposure-period?startdate=undefined&enddate=undefined&productgroup=undefined');
    expect(status).toBe(400);
    expect(body.message).toContain('startdate must be a valid ISO 8601 date string');
    expect(body.message).toContain('enddate must be a valid ISO 8601 date string');
    expect(body.message).toContain('productgroup must be one of the following values: EW, BS');
  });

  it('GET /exposure-period?startdate=2017-03-05&enddate=2017-04-05&productgroup=new', async () => {
    const { status, body } = await api.get('/api/v1/exposure-period?startdate=2017-03-05&enddate=2017-04-05&productgroup=new');
    expect(status).toBe(400);
    expect(body.message).toContain('productgroup must be one of the following values: EW, BS');
  });

  it('returns a 404 response if URL is missing /api/v1 at the beginning', async () => {
    const url = '/exposure-period?startdate=2017-03-05&enddate=2017-04-05&productgroup=new';
    const { status, body } = await api.get(url);
    expect(status).toBe(404);
    expect(body.message).toContain(`Cannot GET ${url}`);
  });
});
