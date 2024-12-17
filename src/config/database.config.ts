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
    mssql_ods: {
      host: process.env.DATABASE_ODS_HOST,
      port: +process.env.DATABASE_PORT,
      client_id: process.env.DATABASE_ODS_CLIENT_ID,
      tenant_id: process.env.DATABASE_ODS_TENANT_ID,
      client_secret: process.env.DATABASE_ODS_CLIENT_SECRET,
      name: process.env.DATABASE_ODS_NAME,
      ods_integration_enabled: process.env.FF_ODS_INTEGRATION_ENABLED
    }
  }),
);
