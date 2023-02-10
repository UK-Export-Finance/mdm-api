import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MainModule } from '../src/main.module';
const request = require('supertest');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`GET /live`, () => {
    return request(app.getHttpServer()).get('/live')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });

});
