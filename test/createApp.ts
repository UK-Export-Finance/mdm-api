import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { MainModule } from '../src/main.module';

export class CreateApp {
  // NestJs app initialisation happens in /src/main.ts, here is some duplication of same process.
  // TODO: maybe it is possible to reuse initialisation in /src/main.ts as similar approach is done in DTFS projects.
  async init() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    const app = moduleFixture.createNestApplication();

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
    return app;
  }
}
