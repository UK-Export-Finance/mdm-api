import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

export default registerAs(
  'database',
  (): Record<string, any> => ({
    mssql: {
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT || 1433,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT || 6379,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    },
  }),
);
