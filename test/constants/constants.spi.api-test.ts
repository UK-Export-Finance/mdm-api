import { INestApplication } from '@nestjs/common';

import { Api } from '../api';
import { CreateApp } from '../createApp';

describe('Constants SPI', () => {
  let app: INestApplication;
  let api: Api;

  const constantsSchema = {
    category: expect.any(String),
    subCategory: expect.any(String),
    oecdRiskCategory: expect.any(String),
    value: expect.any(Number),
    constQualityGrade: expect.any(String),
    constRepaymentFrequency: expect.any(Number),
    constInterestRate: expect.any(Number),
  };

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  it(`GET /constants/spi`, async () => {
    const { status, body } = await api.get('/constants/spi');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(constantsSchema)]));
  });

  it(`GET /constants/spi?oecdRiskCategory=3`, async () => {
    const { status, body } = await api.get('/constants/spi?oecdRiskCategory=3');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(constantsSchema)]));
    // We have 8 country risk ratings (oecdRiskCategory), each rating gets 5 dynamic constants.
    expect(body).toHaveLength(5);
  });

  it(`GET /constants/spi?category=B`, async () => {
    const { status, body } = await api.get('/constants/spi?category=B');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(constantsSchema)]));
    // We have 8 country risk ratings (oecdRiskCategory), so we should get 8 results.
    expect(body).toHaveLength(8);
  });

  it(`GET /constants/spi?category=Percentage of Cover`, async () => {
    const { status, body } = await api.get('/constants/spi?category=Percentage of Cover');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(constantsSchema)]));
    // We have 8 country risk ratings (oecdRiskCategory), so we should get 8 results.
    expect(body).toHaveLength(8);
  });

  it(`GET /constants/spi?oecdRiskCategory=3&category=B`, async () => {
    const { status, body } = await api.get('/constants/spi?oecdRiskCategory=3&category=B');
    expect(status).toBe(200);
    expect(body).toEqual(expect.arrayContaining([expect.objectContaining(constantsSchema)]));
    expect(body).toHaveLength(1);
  });

  // Error checks bellow.

  it(`GET /constants/spi?category=Z`, async () => {
    const { status, body } = await api.get('/constants/spi?category=Z');
    expect(status).toBe(404);
    expect(body.message).toBe('No results for your search criteria');
  });

  it(`GET /constants/spi?category=;DROP users;`, async () => {
    const { status, body } = await api.get('/constants/spi?category=;DROP users;');
    expect(status).toBe(400);
    expect(body.message).toContain('category must match /^[a-zA-Z ]{1,20}$/ regular expression');
  });

  it(`GET /constants/spi?oecdRiskCategory=aaa&category=Some long not existing category;yes`, async () => {
    const { status, body } = await api.get('/constants/spi?oecdRiskCategory=aaa&category=Some long not existing category;yes');
    expect(status).toBe(400);
    expect(body.message).toContain('oecdRiskCategory must not be greater than 7');
    expect(body.message).toContain('oecdRiskCategory must be an integer number');
    expect(body.message).toContain('category must match /^[a-zA-Z ]{1,20}$/ regular expression');
  });

  // category=null is accepted as correct text input.
  it(`GET /constants/spi?oecdRiskCategory=null&category=null`, async () => {
    const { status, body } = await api.get('/constants/spi?oecdRiskCategory=null&category=null');
    expect(status).toBe(400);
    expect(body.message).toContain('oecdRiskCategory must not be greater than 7');
    expect(body.message).toContain('oecdRiskCategory must be an integer number');
  });

  // category=undefined is accepted as correct text input.
  it(`GET /constants/spi?oecdRiskCategory=undefined&category=undefined`, async () => {
    const { status, body } = await api.get('/constants/spi?oecdRiskCategory=undefined&category=undefined');
    expect(status).toBe(400);
    expect(body.message).toContain('oecdRiskCategory must not be greater than 7');
    expect(body.message).toContain('oecdRiskCategory must be an integer number');
  });

  afterAll(async () => {
    await app.close();
  });
});
