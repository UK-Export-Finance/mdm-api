import { Api } from '@ukef-test/support/api';

describe('Interest rates', () => {
  let api: Api;

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it(`GET /interest-rates`, async () => {
    const { status, body } = await api.get('/api/v1/interest-rates');

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          category: expect.any(String),
          subCategory: expect.any(String),
          termMonths: expect.any(Number),
          sourceTerm: expect.any(String),
          currency: expect.any(String),
          interestRate: expect.any(Number),
          bukKey: expect.any(String),
          effectiveFrom: expect.any(String),
          effectiveTo: expect.any(String),
          created: expect.any(String),
          updated: expect.any(String),
        }),
      ]),
    );
  });
});
