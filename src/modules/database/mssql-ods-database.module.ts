import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DATABASE.ODS,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: DATABASE.ODS,
        host: configService.get<string>('database.mssql_ods.host'),
        port: configService.get<number>('database.mssql_ods.port'),
        database: configService.get<string>('database.mssql_ods.name'),
        type: 'mssql',
        authentication: {
          type: 'azure-active-directory-service-principal-secret',
          options: {
            clientId: configService.get<string>('database.mssql_ods.client_id'), // Your Azure AD service principal client ID
            clientSecret: configService.get<string>('database.mssql_ods.client_secret'), // Your Azure AD service principal client secret
            tenantId: configService.get<string>('database.mssql_ods.tenant_id'), // Your Azure AD tenant ID
          },
        },
        extra: {
          options: {
            encrypt: true,
            trustServerCertificate: true,
            useUTC: true,
          },
        },
      }),
    }),
  ],
})
export class MsSqlODSDatabaseModule {}
