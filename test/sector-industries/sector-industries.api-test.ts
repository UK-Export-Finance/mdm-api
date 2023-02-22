import { INestApplication } from '@nestjs/common';

import { Api } from '../api';
import { CreateApp } from '../createApp';

describe('Sector industries', () => {
  let app: INestApplication;
  let api: Api;

  const sectorIndustriesSchema = {
    id: expect.any(Number),
    ukefSectorId: expect.any(String),
    ukefSectorName: expect.any(String),
    internalNo: null,
    ukefIndustryId: expect.any(String),
    ukefIndustryName: expect.any(String),
    acbsSectorId: expect.any(String),
    acbsSectorName: expect.any(String),
    acbsIndustryId: expect.any(String),
    acbsIndustryName: expect.any(String),
    created: expect.any(String),
    updated: expect.any(String),
    effectiveFrom: expect.any(String),
    effectiveTo: expect.any(String),
  };

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  it(`GET /sector-industries`, async () => {
    const { status, body } = await api.get('/sector-industries');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(sectorIndustriesSchema)]));
  });

  it(`GET /sector-industries?ukefSectorId=1001`, async () => {
    const { status, body } = await api.get('/sector-industries?ukefSectorId=1001');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(sectorIndustriesSchema)]));
    expect(body.length).toBeGreaterThan(1);
  });

  it(`GET /sector-industries?ukefIndustryId=01120`, async () => {
    const { status, body } = await api.get('/sector-industries?ukefIndustryId=01120');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(sectorIndustriesSchema)]));
    expect(body).toHaveLength(1);
  });

  it(`GET /sector-industries?ukefSectorId=1001&ukefIndustryId=01120`, async () => {
    const { status, body } = await api.get('/sector-industries?ukefSectorId=1001&ukefIndustryId=01120');
    expect(status).toBe(200);
    expect(body).toHaveLength(1);
  });

  it(`GET /sector-industries?ukefSectorId=1234`, async () => {
    const { status, body } = await api.get('/sector-industries?ukefSectorId=1234');
    expect(status).toBe(404);
  });

  it(`GET /sector-industries?ukefSectorId=a&ukefIndustryId=a`, async () => {
    const { status, body } = await api.get('/sector-industries?ukefSectorId=a&ukefIndustryId=a');
    expect(status).toBe(400);
    expect(body.message).toContain('ukefSectorId must match /^\\d{4}$/ regular expression');
    expect(body.message).toContain('ukefIndustryId must match /^\\d{5}$/ regular expression');
  });

  it(`GET /sector-industries?ukefSectorId=null&ukefIndustryId=null`, async () => {
    const { status, body } = await api.get('/sector-industries?ukefSectorId=null&ukefIndustryId=null');
    expect(status).toBe(400);
    expect(body.message).toContain('ukefSectorId must match /^\\d{4}$/ regular expression');
    expect(body.message).toContain('ukefIndustryId must match /^\\d{5}$/ regular expression');
  });

  it(`GET /sector-industries?ukefSectorId=undefined&ukefIndustryId=undefined`, async () => {
    const { status, body } = await api.get('/sector-industries?ukefSectorId=undefined&ukefIndustryId=undefined');
    expect(status).toBe(400);
    expect(body.message).toContain('ukefSectorId must match /^\\d{4}$/ regular expression');
    expect(body.message).toContain('ukefIndustryId must match /^\\d{5}$/ regular expression');
  });

  afterAll(async () => {
    await app.close();
  });
});
