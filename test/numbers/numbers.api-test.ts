import { Api } from '@ukef-test/support/api';

describe('Numbers', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it(`GET /numbers?type=1&ukefId=0010581069`, async () => {
    const { status, body } = await api.get('/api/v1/numbers?type=1&ukefId=0010581069');

    expect(status).toBe(404);
    expect(body.error).toMatch('Not Found');
  });

  /**
   * To get existing UKEF ID we need to generate it first.
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
    const postResponse = await api.post('/api/v1/numbers', postNumbersPayload);

    expect(postResponse.status).toBe(201);

    // Test
    const getResponse = await api.get('/api/v1/numbers?type=' + postResponse.body[0].type + '&ukefId=' + postResponse.body[0].maskedId);

    expect(getResponse.status).toBe(200);
    expect(postResponse.body[0]).toEqual(getResponse.body);
  });

  it(`GET /numbers?type=2&ukefId=0030581069`, async () => {
    const { status } = await api.get('/api/v1/numbers?type=2&ukefId=0030581069');

    expect(status).toBe(404);
  });

  it(`GET /numbers?type=a&ukefId=a`, async () => {
    const { status, body } = await api.get('/api/v1/numbers?type=a&ukefId=a');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('type must be an integer number');
    expect(body.message).toContain('ukefId must match /^\\d{8,10}$/ regular expression');
  });

  it(`GET /numbers?type=null&ukefId=null`, async () => {
    const { status, body } = await api.get('/api/v1/numbers?type=null&ukefId=null');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('type must be an integer number');
    expect(body.message).toContain('ukefId must match /^\\d{8,10}$/ regular expression');
  });

  it(`GET /numbers?type=undefined&ukefId=undefined`, async () => {
    const { status, body } = await api.get('/api/v1/numbers?type=undefined&ukefId=undefined');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('type must be an integer number');
    expect(body.message).toContain('ukefId must match /^\\d{8,10}$/ regular expression');
  });

  it(`GET /numbers?type=a&ukefId=0030581069`, async () => {
    const { status, body } = await api.get('/api/v1/numbers?type=a&ukefId=0030581069');

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('type must be an integer number');
  });

  it(`GET /numbers?type=3&ukefId=0030581069`, async () => {
    const { status, body } = await api.get('/api/v1/numbers?type=3&ukefId=0030581069');

    expect(status).toBe(400);
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
    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(201);
    expect(body).toHaveLength(1);
    expect(body[0].id).toBeDefined();
    expect(body[0].maskedId).toMatch(/^\d*$/);
    expect(body[0].type).toBe(1);
    expect(body[0].createdBy).toBe('Jest');
    expect(body[0].createdDatetime).toBeDefined();
    expect(body[0].requestingSystem).toBe('Jest 1 - Deal');
  });

  it(`POST /numbers single, long values`, async () => {
    const payload = [
      {
        numberTypeId: 1,
        createdBy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mau',
        requestingSystem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mau',
      },
    ];
    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(201);
    expect(body).toHaveLength(1);
    expect(body[0].id).toBeDefined();
    expect(body[0].maskedId).toMatch(/^\d*$/);
    expect(body[0].type).toBe(1);
    expect(body[0].createdBy).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mau');
    expect(body[0].createdDatetime).toBeDefined();
    expect(body[0].requestingSystem).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mau');
  });

  it(`POST /numbers single, long value error`, async () => {
    const payload = [
      {
        numberTypeId: 1,
        createdBy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac magna ipsum',
        requestingSystem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac magna ipsum',
      },
    ];
    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('createdBy must be shorter than or equal to 60 characters');
    expect(body.message).toContain('createdBy must be shorter than or equal to 60 characters');
  });

  it(`POST /numbers single, missing fields`, async () => {
    const payload = [{}];
    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toContain('numberTypeId should not be empty');
    expect(body.message).toContain('createdBy should not be empty');
    expect(body.message).toContain('requestingSystem should not be empty');
  });

  it(`POST /numbers single, empty payload`, async () => {
    const payload = '';
    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Validation failed (parsable array expected)');
  });

  it(`POST /numbers single, empty array`, async () => {
    const payload = [];
    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Request payload is empty');
  });

  it(`POST /numbers single, not parsable array`, async () => {
    const payload = '[]';
    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(400);
    expect(body.error).toMatch('Bad Request');
    expect(body.message).toMatch('Validation failed (parsable array expected)');
  });

  it(`POST /numbers single, bad json`, async () => {
    const payload = 'asd';
    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(400);
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
    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(201);
    expect(body).toHaveLength(4);

    body.forEach((responseUkefIdRecord, i) => {
      expect(responseUkefIdRecord.id).toBeDefined();
      expect(responseUkefIdRecord.maskedId).toMatch(/^\d*$/);
      expect(responseUkefIdRecord.type).toEqual(payload[`${i}`].numberTypeId);
      expect(responseUkefIdRecord.createdBy).toEqual(payload[`${i}`].createdBy);
      expect(responseUkefIdRecord.createdDatetime).toBeDefined();
      expect(responseUkefIdRecord.requestingSystem).toEqual(payload[`${i}`].requestingSystem);
    });
  });

  /**
   * Because of async calls,
   * the order of new ids might be off.
   * We need to check that we return a correctly sorted array.
   */
  it(`POST /numbers check order`, async () => {
    const payload = [
      {
        numberTypeId: 1,
        createdBy: 'Jest',
        requestingSystem: 'Jest 1 - Deal',
      },
      {
        numberTypeId: 1,
        createdBy: 'John',
        requestingSystem: 'Jest 2 - Facility',
      },
      {
        numberTypeId: 2,
        createdBy: 'Jest',
        requestingSystem: 'Jest 1 - Party',
      },
      {
        numberTypeId: 2,
        createdBy: 'Jest',
        requestingSystem: 'Jest 3 - Party',
      },
    ];

    const { status, body } = await api.post('/api/v1/numbers', payload);

    expect(status).toBe(201);
    expect(body).toHaveLength(payload.length);

    // Go through results, group by type and validate the order.
    body.reduce((previousValues, newUkefId) => {
      if (!previousValues[newUkefId.type]) {
        // First call for this type, initialize.
        previousValues[newUkefId.type] = '';
      }

      // Comparing two strings
      expect(previousValues[newUkefId.type] < newUkefId.maskedId).toBeTruthy();

      previousValues[newUkefId.type] = newUkefId.maskedId;

      return previousValues;
    }, Object.create(null));
  });
});
