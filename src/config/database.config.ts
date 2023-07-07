import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
export default registerAs(
  'database',
  (): Record<string, any> => ({
    mssql_mdm: {
      host: process.env.DATABASE_MDM_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_MDM_NAME,
    },
    mssql_cedar: {
      host: process.env.DATABASE_CEDAR_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_CEDAR_NAME,
    },
    mssql_number_generator: {
      host: process.env.DATABASE_NUMBER_GENERATOR_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NUMBER_GENERATOR_NAME,
    },
    mssql_cis: {
      host: process.env.DATABASE_CIS_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_CIS_NAME,
    },
  }),
);
