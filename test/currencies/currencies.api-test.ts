import { INestApplication } from '@nestjs/common';

import { Api } from '../api';
import { CreateApp } from '../createApp';

describe('Currencies', () => {
  let app: INestApplication;
  let api: Api;

  const expectedResult = expect.arrayContaining([
    expect.objectContaining({
      id: expect.any(Number),
      sourceCurrencyId: expect.any(Number),
      targetCurrencyId: expect.any(Number),
      currencyPair: expect.any(String),
      bidPrice: expect.any(Number),
      askPrice: expect.any(Number),
      lastPrice: expect.any(Number),
      midPrice: expect.any(Number),
      created: expect.any(String),
      updated: expect.any(String),
      effectiveFrom: expect.any(String),
      effectiveTo: expect.any(String),
    }),
  ]);

  beforeAll(async () => {
    app = await new CreateApp().init();
    api = new Api(app.getHttpServer());
  });

  describe('/currencies/exchange', () => {
    it('should return 200 on GET `/currencies/exchange?source=GBP&target=AED&exchangeRateDate=2021-01-26`', async () => {
      const { status, body } = await api.get('/currencies/exchange?source=GBP&target=AED&exchangeRateDate=2021-01-26');
      expect(status).toBe(200);
      expect(body).toEqual(expectedResult);
    });

    it('should return 200 on GET `/currencies/exchange?source=GBP&target=AED`', async () => {
      const { status, body } = await api.get('/currencies/exchange?source=GBP&target=AED');
      expect(status).toBe(200);
      expect(body).toEqual(expectedResult);
    });

    it('should return 200 on GET `currencies/exchange?source=USD&target=GBP`', async () => {
      const { status, body } = await api.get('/currencies/exchange?source=USD&target=GBP');
      expect(status).toBe(200);
      expect(body).toEqual(expectedResult);
    });

    it('should return 404 on GET `/currencies/exchange?source=AED&target=GBP`', async () => {
      const { status, body } = await api.get('/currencies/exchange?source=AED&target=GBP');
      expect(status).toBe(404);
      expect(body).toEqual({
        statusCode: 404,
        message: 'The selected exchange rate is not available',
        error: 'Not Found',
      });
    });

    it('should return 400 on GET `/currencies/exchange?source=GBP&target=abc`', async () => {
      const { status, body } = await api.get('/currencies/exchange?source=GBP&target=abc');
      expect(status).toBe(400);
      expect(body).toEqual({
        statusCode: 400,
        message: ['target must be a valid ISO4217 currency code'],
        error: 'Bad Request',
      });
    });

    it('should return 400 on GET `/currencies/exchange?source=abc&target=AED`', async () => {
      const { status, body } = await api.get('/currencies/exchange?source=abc&target=AED');
      expect(status).toBe(400);
      expect(body).toEqual({
        statusCode: 400,
        message: ['source must be a valid ISO4217 currency code'],
        error: 'Bad Request',
      });
    });

    it('should return 400 on GET `/currencies/exchange?source=abc&target=def`', async () => {
      const { status, body } = await api.get('/currencies/exchange?source=abc&target=def');
      expect(status).toBe(400);
      expect(body).toEqual({
        statusCode: 400,
        message: ['source must be a valid ISO4217 currency code', 'target must be a valid ISO4217 currency code'],
        error: 'Bad Request',
      });
    });

    it('should return 400 on GET `/currencies/exchange`', async () => {
      const { status, body } = await api.get('/currencies/exchange');
      expect(status).toBe(400);
      expect(body).toEqual({
        statusCode: 400,
        message: ['source must be a valid ISO4217 currency code', 'target must be a valid ISO4217 currency code'],
        error: 'Bad Request',
      });
    });

    it('should return 400 on GET `/currencies/exchange?source=GBP`', async () => {
      const { status, body } = await api.get('/currencies/exchange?source=GBP');
      expect(status).toBe(400);
      expect(body).toEqual({
        statusCode: 400,
        message: ['target must be a valid ISO4217 currency code'],
        error: 'Bad Request',
      });
    });

    it('should return 400 on GET `/currencies/exchange?target=GBP`', async () => {
      const { status, body } = await api.get('/currencies/exchange?target=GBP');
      expect(status).toBe(400);
      expect(body).toEqual({
        statusCode: 400,
        message: ['source must be a valid ISO4217 currency code'],
        error: 'Bad Request',
      });
    });
  });

  describe('/currencies', () => {
    it('should return 200 on GET `/currencies`', async () => {
      const { status, body } = await api.get('/currencies');
      expect(status).toBe(200);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            isoCode: expect.any(String),
            created: expect.any(String),
            updated: expect.any(String),
            effectiveFrom: expect.any(String),
            effectiveTo: expect.any(String),
            acbsCode: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('/currencies/{isoCode}', () => {
    it('should return 200 on GET `/currencies/GBP`', async () => {
      const { status, body } = await api.get('/currencies/GBP');
      expect(status).toBe(200);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            isoCode: expect.any(String),
            created: expect.any(String),
            updated: expect.any(String),
            effectiveFrom: expect.any(String),
            effectiveTo: expect.any(String),
            acbsCode: expect.any(String),
          }),
        ]),
      );
    });

    it('should return 400 on GET `/currencies/abc`', async () => {
      const { status, body } = await api.get('/currencies/abc');
      expect(status).toBe(400);
      expect(body).toEqual({
        statusCode: 400,
        message: ['isoCode must be a valid ISO4217 currency code'],
        error: 'Bad Request',
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
