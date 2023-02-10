import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MainModule } from '../../src/main.module';

const request = require('supertest');

describe('Markets', () => {

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Validation pipeline is require to check validations.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it(`GET /markets`, () => {
    return request(app.getHttpServer()).get('/markets')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(require('./expected-responses/GET-markets.json'));
  });

  it(`GET /markets?active=Y`, () => {
    return request(app.getHttpServer()).get('/markets?active=Y')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(require('./expected-responses/GET-markets-query-active-Y.json'));
  });

  it(`GET /markets?active=N`, () => {
    return request(app.getHttpServer()).get('/markets?active=N')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(require('./expected-responses/GET-markets-query-active-N.json'));
  });

  it(`GET /markets?active=something-else`, () => {
    return request(app.getHttpServer()).get('/markets?active=something-else')
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .then(response => {
        expect(response.body.error).toMatch('Bad Request');
        expect(response.body.message[0]).toMatch('active must be one of the following values: Y, N');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
