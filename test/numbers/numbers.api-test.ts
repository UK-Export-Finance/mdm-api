import { INestApplication } from '@nestjs/common';

import { Api } from '../api';
import { CreateApp } from '../createApp';
import getNumberTypesExpectation from './expected-responses/GET-number-types.json';

describe('Numbers', () => {
  let app: INestApplication;
  let api;

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  it(`GET /number-types`, async () => {
    const { status, body } = await api.get('/number-types');
    expect(status).toEqual(200);
    expect(body).toEqual(getNumberTypesExpectation);
  });

  it(`GET /numbers?type=1&ukefId=0030581069`, async () => {
    const { status, body } = await api.get('/numbers?type=1&ukefId=0030581069');
    expect(status).toEqual(404);
    expect(body.error).toMatch('Not Found');
  });

  /**
   * To get existing ukef ID we need to generate it first.
   */
  it(`POST /numbers and then GET /numbers?type=1&ukefId=newGeneratedId`, async () => {
    const postNumbersPayload = [
      {
        numberTypeId: 1,
        createdBy: 'Jest',
        requestingSystem: 'Jest 1 - Deal',
      },
    ];
    // Generate
    const postResponse = await api.post(postNumbersPayload).to('/numbers');
    expect(postResponse.status).toEqual(201);

    // Test
    const getResponse = await api.get('/numbers?type=' + postResponse.body[0].type + '&ukefId=' + postResponse.body[0].maskedId);
    expect(getResponse.status).toEqual(200);
    expect(postResponse.body[0]).toEqual(getResponse.body);
  });

  it(`GET /numbers?type=2&ukefId=0030581069`, async () => {
    const { status } = await api.get('/numbers?type=2&ukefId=0030581069');
    expect(status).toEqual(404);
  });

  it(`GET /numbers?type=a&ukefId=a`, async () => {
    const { status, body } = await api.get('/numbers?type=a&ukefId=a');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('type must be an integer number');
    expect(body.message).toContain('ukefId must match /^\\d{10}$/ regular expression');
  });

  it(`GET /numbers?type=null&ukefId=null`, async () => {
    const { status, body } = await api.get('/numbers?type=null&ukefId=null');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('type must be an integer number');
    expect(body.message).toContain('ukefId must match /^\\d{10}$/ regular expression');
  });

  it(`GET /numbers?type=undefined&ukefId=undefined`, async () => {
    const { status, body } = await api.get('/numbers?type=undefined&ukefId=undefined');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('type must be an integer number');
    expect(body.message).toContain('ukefId must match /^\\d{10}$/ regular expression');
  });

  it(`GET /numbers?type=a&ukefId=0030581069`, async () => {
    const { status, body } = await api.get('/numbers?type=a&ukefId=0030581069');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('type must be an integer number');
  });

  it(`GET /numbers?type=3&ukefId=0030581069`, async () => {
    const { status, body } = await api.get('/numbers?type=3&ukefId=0030581069');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Invalid UKEF ID type');
  });

  it(`POST /numbers single`, async () => {
    const payload = [
      {
        numberTypeId: 1,
        createdBy: 'Jest',
        requestingSystem: 'Jest 1 - Deal',
      },
    ];
    const { status, body } = await api.post(payload).to('/numbers');
    expect(status).toEqual(201);
    expect(body).toHaveLength(1);
    expect(body[0].id).toBeDefined();
    expect(body[0].maskedId).toMatch(/^\d*$/);
    expect(body[0].type).toEqual(1);
    expect(body[0].createdBy).toEqual('Jest');
    expect(body[0].createdDatetime).toBeDefined();
    expect(body[0].requestingSystem).toEqual('Jest 1 - Deal');
  });

  it(`POST /numbers single, long values`, async () => {
    const payload = [
      {
        numberTypeId: 1,
        createdBy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mau',
        requestingSystem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mau',
      },
    ];
    const { status, body } = await api.post(payload).to('/numbers');
    expect(status).toEqual(201);
    expect(body).toHaveLength(1);
    expect(body[0].id).toBeDefined();
    expect(body[0].maskedId).toMatch(/^\d*$/);
    expect(body[0].type).toEqual(1);
    expect(body[0].createdBy).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mau');
    expect(body[0].createdDatetime).toBeDefined();
    expect(body[0].requestingSystem).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mau');
  });

  it(`POST /numbers single, long value error`, async () => {
    const payload = [
      {
        numberTypeId: 1,
        createdBy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac magna ipsum',
        requestingSystem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac magna ipsum',
      },
    ];
    const { status, body } = await api.post(payload).to('/numbers');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('createdBy must be shorter than or equal to 60 characters');
    expect(body.message).toContain('createdBy must be shorter than or equal to 60 characters');
  });

  it(`POST /numbers single, missing fields`, async () => {
    const payload = [{}];
    const { status, body } = await api.post(payload).to('/numbers');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('numberTypeId should not be empty');
    expect(body.message).toContain('createdBy should not be empty');
    expect(body.message).toContain('requestingSystem should not be empty');
  });

  it(`POST /numbers single, empty payload`, async () => {
    const payload = '';
    const { status, body } = await api.post(payload).to('/numbers');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Validation failed (parsable array expected)');
  });

  it(`POST /numbers single, empty array`, async () => {
    const payload = [];
    const { status, body } = await api.post(payload).to('/numbers');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Request payload is empty');
  });

  it(`POST /numbers single, empty array`, async () => {
    const payload = '[]';
    const { status, body } = await api.post(payload).to('/numbers');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Validation failed (parsable array expected)');
  });

  it(`POST /numbers single, bad json`, async () => {
    const payload = 'asd';
    const { status, body } = await api.post(payload).to('/numbers');
    expect(status).toEqual(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Validation failed (parsable array expected)');
  });

  it(`POST /numbers multiple numbers`, async () => {
    const payload = [
      {
        numberTypeId: 1,
        createdBy: 'Jest',
        requestingSystem: 'Jest 1 - Deal',
      },
      {
        numberTypeId: 1,
        createdBy: 'Jest',
        requestingSystem: 'Jest 2 - Facility',
      },
      {
        numberTypeId: 2,
        createdBy: 'Jest',
        requestingSystem: 'Jest 3 - Party',
      },
      {
        numberTypeId: 8,
        createdBy: 'Jest',
        requestingSystem: 'Jest 4 - Covenant',
      },
    ];
    const { status, body } = await api.post(payload).to('/numbers');
    expect(status).toEqual(201);
    expect(body).toHaveLength(4);

    /* eslint-disable security/detect-object-injection */
    for (let i = 0; i++; i < 4) {
      expect(body[i].id).toBeDefined();
      expect(body[i].maskedId).toMatch(/^\d*$/);
      expect(body[i].type).toEqual(payload[i].numberTypeId);
      expect(body[i].createdBy).toEqual(payload[i].createdBy);
      expect(body[i].createdDatetime).toBeDefined();
      expect(body[i].requestingSystem).toEqual(payload[i].requestingSystem);
    }
    /* eslint-enable security/detect-object-injection */
  });

  afterAll(async () => {
    await app.close();
  });
});
