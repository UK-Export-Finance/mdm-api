import { INestApplication } from '@nestjs/common';

import { Api } from '../api';
import { CreateApp } from '../createApp';

describe('Markets', () => {
  let app: INestApplication;
  let api;

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  it(`GET /markets`, async () => {
    const { status, body } = await api.get('/markets');
    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marketId: expect.any(Number),
          marketName: expect.any(String),
          isoCode: expect.any(String),
          createdDatetime: expect.any(String),
          lastUpdatedDatetime: expect.any(String),
          effectiveFromDatetime: expect.any(String),
          effectiveToDatetime: expect.any(String),
          oecdRiskCategory: expect.any(String),
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
        }),
      ]),
    );
  });

  it(`GET /markets?active=Y`, async () => {
    const { status, body } = await api.get('/markets?active=Y');
    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marketId: expect.any(Number),
          marketName: expect.any(String),
          isoCode: expect.any(String),
          createdDatetime: expect.any(String),
          lastUpdatedDatetime: expect.any(String),
          effectiveFromDatetime: expect.any(String),
          effectiveToDatetime: expect.any(String),
          oecdRiskCategory: expect.any(String),
          marketRiskAppetitePublicDesc: expect.any(String),
          geographicalRegionId: expect.any(Number),
          geographicalRegionDesc: expect.any(String),
          sovereignRiskProvision: expect.any(Number),
          ESRAClassificationId: expect.any(Number),
          ESRAClassificationDesc: expect.any(String),
          shortTermCoverAvailabilityId: expect.any(Number),
          shortTermCoverAvailabilityDesc: expect.any(String),
          NBIIssue: expect.any(String),
          active: 'Y',
        }),
      ]),
    );
  });

  it(`GET /markets?active=N`, async () => {
    const { status, body } = await api.get('/markets?active=N');
    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marketId: expect.any(Number),
          marketName: expect.any(String),
          isoCode: expect.any(String),
          createdDatetime: expect.any(String),
          lastUpdatedDatetime: expect.any(String),
          effectiveFromDatetime: expect.any(String),
          effectiveToDatetime: expect.any(String),
          oecdRiskCategory: expect.any(String),
          marketRiskAppetitePublicDesc: expect.any(String),
          geographicalRegionId: expect.any(Number),
          geographicalRegionDesc: expect.any(String),
          sovereignRiskProvision: expect.any(Number),
          ESRAClassificationId: expect.any(Number),
          ESRAClassificationDesc: expect.any(String),
          shortTermCoverAvailabilityId: expect.any(Number),
          shortTermCoverAvailabilityDesc: expect.any(String),
          NBIIssue: expect.any(String),
          active: 'N',
        }),
      ]),
    );
  });

  it(`Compare GET /markets?active=N and GET /markets?active=N`, async () => {
    const responseActive = await api.get('/markets?active=Y');
    const responseDisabled = await api.get('/markets?active=N');
    // We expect more active markets than disabled
    expect(responseActive.body.length).toBeGreaterThan(responseDisabled.body.length);
  });

  it(`GET /markets?active=something-else`, async () => {
    const { status, body } = await api.get('/markets?active=something-else');
    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  it(`GET /markets?active=`, async () => {
    const { status, body } = await api.get('/markets?active=');
    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  it(`GET /markets?active=null`, async () => {
    const { status, body } = await api.get('/markets?active=null');
    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  it(`GET /markets?active=undefined`, async () => {
    const { status, body } = await api.get('/markets?active=undefined');
    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message[0]).toMatch('active must be one of the following values: Y, N');
  });

  afterAll(async () => {
    await app.close();
  });
});
