import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

export default registerAs(
  'database',
  (): Record<string, any> => ({
    mssql_mdm: {
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_MDM_NAME,
    },
    mssql_cedar: {
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_CEDAR_NAME,
    },
    mssql_number_generator: {
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NUMBER_GENERATOR_NAME,
    },
    mssql_cis: {
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_CIS_NAME,
    },
    redis: {
      host: process.env.REDIS_HOST,
      ttl: process.env.REDIS_TTL || 60,
      port: +process.env.REDIS_PORT || 6379,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    },
  }),
);
