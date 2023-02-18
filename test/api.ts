///* eslint-disable */
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

// This type is required to set variable of type MultipartValue.
type FormData = string | boolean | number;
export class Api {
  app: INestApplication;

  public constructor(app: INestApplication) {
    this.app = app;
  }

  get(url: string) {
    return request(this.app).get(url);
  }

  post(data) {
    return { to: (url: string) => request(this.app).post(url).send(data) };
  }

  postEach(list) {
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

  put(data) {
    return { to: (url: string) => request(this.app).put(url).send(data) };
  }

  putMultipartForm(data: FormData[], files = []) {
    return {
      to: (url) => {
        const apiRequest = request(this.app).put(url);

        if (files.length) {
          files.forEach((file) => apiRequest.attach(file.fieldname, file.filepath));
        }

        Object.entries(data).forEach(([fieldname, value]) => {
          apiRequest.field(fieldname, value);
        });

        return apiRequest;
      },
    };
  }

  remove(data) {
    return {
      to: (url: string) => request(this.app).delete(url).send(data),
    };
  }
}

///* eslint-enable */
