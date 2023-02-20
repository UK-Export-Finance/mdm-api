import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export class Api {
  app: INestApplication;

  public constructor(app: INestApplication) {
    this.app = app;
  }

  get(url: string) {
    return request(this.app).get(url);
  }

  post(data: string | object) {
    return { to: (url: string) => request(this.app).post(url).send(data) };
  }

  postEach(list: any) {
    return {
      to: async (url: string) => {
        const results = [];

        for (const data of list) {
          const result = await request(this.app).post(url).send(data);

          results.push(result);
        }

        return results;
      },
    };
  }

  put(data: string | object) {
    return { to: (url: string) => request(this.app).put(url).send(data) };
  }

  remove(data: string | object) {
    return {
      to: (url: string) => request(this.app).delete(url).send(data),
    };
  }
}
