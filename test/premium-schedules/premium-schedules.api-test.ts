import { INestApplication } from '@nestjs/common';
import Chance from 'chance';

import { Api } from '../api';
import { CreateApp } from '../createApp';

const chance = new Chance();

describe('Premium schedules', () => {
  let app: INestApplication;
  let api: Api;

  const premiumScheduleSchema = {
    id: expect.any(Number),
    facilityURN: expect.any(String),
    calculationDate: expect.any(String),
    income: expect.any(Number),
    incomePerDay: expect.any(Number),
    exposure: expect.any(Number),
    period: expect.any(Number),
    daysInPeriod: expect.any(Number),
    effectiveFrom: expect.any(String),
    effectiveTo: expect.any(String),
    created: expect.any(String),
    updated: expect.any(String),
    isActive: 'Y',
  };

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  it(`GET /premium/segments/12345678`, async () => {
    const { status, body } = await api.get('/premium/segments/12345678');

    // Not generated yet.
    expect(status).toBe(404);
    expect(body.error).toMatch('Not Found');
  });

  /**
   * To get existing premium schedules we need to generate them first.
   */
  it(`POST /premium/schedule and then GET /premium/segments/{facilityId}`, async () => {
    const createSchedules = [
      {
        facilityURN: chance.natural({ min: 10000000, max: 99999999 }),
        productGroup: 'BS',
        premiumTypeId: 1,
        premiumFrequencyId: 1,
        guaranteeCommencementDate: '2021-01-19',
        guaranteeExpiryDate: '2022-05-17',
        guaranteePercentage: 80,
        guaranteeFeePercentage: 1.35,
        dayBasis: '360',
        exposurePeriod: 16,
        cumulativeAmount: null,
        maximumLiability: 40000,
      },
    ];
    // Generate
    const postResponse = await api.post(createSchedules).to('/premium/schedule');

    expect(postResponse.status).toBe(201);

    // Test
    const getResponse = await api.get('/premium/segments/' + postResponse.body[0].facilityURN);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveLength(16);
    expect(postResponse.body).toEqual(getResponse.body);
    expect(postResponse.body).toEqual(expect.arrayContaining([expect.objectContaining(premiumScheduleSchema)]));
    expect(getResponse.body).toEqual(expect.arrayContaining([expect.objectContaining(premiumScheduleSchema)]));
  });

  it(`POST /premium/schedule`, async () => {
    const createSchedules = [
      {
        facilityURN: chance.natural({ min: 10000000, max: 99999999 }),
        productGroup: 'BS',
        premiumTypeId: 1,
        premiumFrequencyId: 1,
        guaranteeCommencementDate: '2023-01-19',
        guaranteeExpiryDate: '2023-02-19',
        guaranteePercentage: 80,
        guaranteeFeePercentage: 1.35,
        dayBasis: '360',
        exposurePeriod: 1,
        cumulativeAmount: null,
        maximumLiability: 40000,
      },
    ];
    const postResponse = await api.post(createSchedules).to('/premium/schedule');

    expect(postResponse.status).toBe(201);
    expect(postResponse.body).toHaveLength(1);
    expect(postResponse.body).toEqual(expect.arrayContaining([expect.objectContaining(premiumScheduleSchema)]));
  });

  it(`GET /premium/segments/null`, async () => {
    const { status, body } = await api.get('/premium/segments/null');
    expect(status).toBe(400);
    expect(body.message).toContain('facilityId must match /^\\d{8,10}$/ regular expression');
  });

  it(`GET /premium/segments/undefined`, async () => {
    const { status, body } = await api.get('/premium/segments/undefined');
    expect(status).toBe(400);
    expect(body.message).toContain('facilityId must match /^\\d{8,10}$/ regular expression');
  });

  it(`POST /premium/schedule, empty array`, async () => {
    const payload = [];
    const { status, body } = await api.post(payload).to('/premium/schedule');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Request payload is empty');
  });

  it(`POST /premium/schedule, not parsable array`, async () => {
    const payload = '[]';
    const { status, body } = await api.post(payload).to('/premium/schedule');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Validation failed (parsable array expected)');
  });

  it(`POST /premium/schedule, bad json`, async () => {
    const payload = 'asd';
    const { status, body } = await api.post(payload).to('/premium/schedule');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Validation failed (parsable array expected)');
  });

  it(`POST /premium/schedule, field validation`, async () => {
    const payload = [{}];
    const { status, body } = await api.post(payload).to('/premium/schedule');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('facilityURN should not be empty');
    expect(body.message).toContain('facilityURN must be an integer number');
    expect(body.message).toContain('productGroup must be longer than or equal to 2 characters');
    expect(body.message).toContain('productGroup must be a string');
    expect(body.message).toContain('productGroup should not be empty');
    expect(body.message).toContain('premiumTypeId should not be empty');
    expect(body.message).toContain('premiumTypeId must be a number conforming to the specified constraints');
    expect(body.message).toContain('premiumFrequencyId should not be empty');
    expect(body.message).toContain('premiumFrequencyId must be a number conforming to the specified constraints');
    expect(body.message).toContain('guaranteeCommencementDate should not be empty');
    expect(body.message).toContain('guaranteeCommencementDate must be a valid ISO 8601 date string');
    expect(body.message).toContain('guaranteeExpiryDate should not be empty');
    expect(body.message).toContain('guaranteeExpiryDate must be a valid ISO 8601 date string');
    expect(body.message).toContain('guaranteePercentage should not be empty');
    expect(body.message).toContain('guaranteePercentage must be a number conforming to the specified constraints');
    expect(body.message).toContain('guaranteeFeePercentage should not be empty');
    expect(body.message).toContain('guaranteeFeePercentage must be a number conforming to the specified constraints');
    expect(body.message).toContain('dayBasis should not be empty');
    expect(body.message).toContain('dayBasis must be a string');
    expect(body.message).toContain('exposurePeriod should not be empty');
    expect(body.message).toContain('exposurePeriod must be a number conforming to the specified constraints');
    expect(body.message).toContain('maximumLiability should not be empty');
    expect(body.message).toContain('maximumLiability must be a number conforming to the specified constraints');
  });

  afterAll(async () => {
    await app.close();
  });
});
