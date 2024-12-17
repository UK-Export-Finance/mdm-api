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
      useFactory: (configService: ConfigService) => {
        const isFeatureEnabled = configService.get<boolean>('database.mssql_ods.ods_integration_enabled');

        // If feature flag is false, skip the database connection
        if (!isFeatureEnabled) {
          console.log('Database connection is disabled by feature flag.');
          return null; // Returning null skips connecting the database
        }
        console.log(configService.get<string>('database.mssql_ods.host'));
        console.log(configService.get<number>('database.mssql_ods.port'));
        console.log(configService.get<string>('database.mssql_ods.name'));
        console.log(configService.get<string>('database.mssql_ods.client_id'));
        console.log(configService.get<string>('database.mssql_ods.client_secret'));
        console.log(configService.get<string>('database.mssql_ods.tenant_id'));

        // Database connection config
        return {
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
        };
      },
    }),
  ],
})
export class MsSqlODSDatabaseModule {}
