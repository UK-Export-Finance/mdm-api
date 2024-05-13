import { Api } from '@ukef-test/support/api';

import { TEST_CONSTANTS } from '../test-constants';

describe('Markets', () => {
  let api: Api;

  const marketSchema = {
    marketId: expect.any(Number),
    marketName: expect.any(String),
    isoCode: expect.any(String),
    createdDatetime: expect.any(String),
    lastUpdatedDatetime: expect.any(String),
    effectiveFromDatetime: expect.any(String),
    effectiveToDatetime: expect.any(String),
    oecdRiskCategory: expect.any(Number),
    marketRiskAppetitePublicDesc: expect.any(String),
    geographicalRegionId: expect.any(Number),
    geographicalRegionDesc: expect.any(String),
    sovereignRiskProvision: expect.any(Number),
    ESRAClassificationId: expect.any(Number),
    ESRAClassificationDesc: expect.any(String),
    shortTermCoverAvailabilityId: expect.any(Number),
    shortTermCoverAvailabilityDesc: expect.any(String),
    NBIIssue: expect.any(String),
    active: expect.any(String),
  };

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it(`GET /markets`, async () => {
    const { status, body } = await api.get('/api/v1/markets');

    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(marketSchema)]));
  });

  it(`GET /markets?active=Y`, async () => {
    const { status, body } = await api.get('/api/v1/markets?active=Y');

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...marketSchema,
          active: 'Y',
        }),
      ]),
    );
  });

  it(`GET /markets?active=N`, async () => {
    const { status, body } = await api.get('/api/v1/markets?active=N');

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...marketSchema,
          active: 'N',
        }),
      ]),
    );
  });

  it(`returns more results from GET /markets?active=Y than GET /markets?active=N`, async () => {
    const responseActive = await api.get('/api/v1/markets?active=Y');
    const responseDisabled = await api.get('/api/v1/markets?active=N');

    // We expect more active markets than disabled
    expect(responseActive.body.length).toBeGreaterThan(responseDisabled.body.length);
  });

  it(`GET /markets?active=something-else`, async () => {
    const { status, body } = await api.get('/api/v1/markets?active=something-else');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  it(`GET /markets?active=`, async () => {
    const { status, body } = await api.get('/api/v1/markets?active=');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  it(`GET /markets?active=null`, async () => {
    const { status, body } = await api.get('/api/v1/markets?active=null');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  it(`GET /markets?active=undefined`, async () => {
    const { status, body } = await api.get('/api/v1/markets?active=undefined');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  // Testing "search" query parameter

  it(`GET /markets?search=Aus`, async () => {
    const { status, body } = await api.get('/api/v1/markets?search=Aus');

    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(marketSchema)]));
    expect(body).toHaveLength(2);
  });

  it(`GET /markets?search=AUT`, async () => {
    const { status, body } = await api.get('/api/v1/markets?search=AUT');

    expect(status).toBe(200);

    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(marketSchema)]));
    expect(body[0].marketName).toBe('Austria');
    expect(body[0].isoCode).toBe('AUT');
  });

  it(`test that query param search is not case sensitive`, async () => {
    const { status, body } = await api.get('/api/v1/markets?search=Aus');
    const lowerCaseResponse = await api.get('/api/v1/markets?search=aus');

    expect(status).toBe(200);
    expect(lowerCaseResponse.status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(lowerCaseResponse.body);
  });

  it(`GET /markets?active=Y&search=Aus`, async () => {
    const { status, body } = await api.get('/api/v1/markets?active=Y&search=Aus');

    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(marketSchema)]));
  });

  it(`GET /markets?active=N&search=Aus`, async () => {
    const { status, body } = await api.get('/api/v1/markets?active=N&search=Aus');

    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it(`GET /markets?search=undefined`, async () => {
    const { status, body } = await api.get('/api/v1/markets?search=undefined');

    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it(`GET /markets?search=null`, async () => {
    const { status, body } = await api.get('/api/v1/markets?search=null');

    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it(`GET /markets?search=`, async () => {
    const { status, body } = await api.get('/api/v1/markets?search=');

    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(marketSchema)]));
  });

  it(`GET /markets?search=${TEST_CONSTANTS.SPECIAL_CHARACTERS}`, async () => {
    const { status, body } = await api.get(`/api/v1/markets?search=${TEST_CONSTANTS.SPECIAL_CHARACTERS}`);

    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it(`GET /markets?search=%20%20%20`, async () => {
    const { status, body } = await api.get('/api/v1/markets?search=%20%20%20');

    expect(status).toBe(200);
    expect(body).toEqual([]);
  });
});
