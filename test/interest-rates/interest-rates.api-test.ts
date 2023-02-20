import { INestApplication } from '@nestjs/common';

import { Api } from '../api';
import { CreateApp } from '../createApp';

describe('Interest rates', () => {
  let app: INestApplication;
  let api: Api;

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  it(`GET /interest-rates`, async () => {
    const { status, body } = await api.get('/interest-rates');
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

  afterAll(async () => {
    await app.close();
  });
});
