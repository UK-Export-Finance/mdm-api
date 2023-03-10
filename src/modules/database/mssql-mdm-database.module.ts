import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DATABASE.MDM,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: DATABASE.MDM,
        host: configService.get<string>('database.mssql_mdm.host'),
        port: configService.get<number>('database.mssql_mdm.port'),
        username: configService.get<string>('database.mssql_mdm.username'),
        password: configService.get<string>('database.mssql_mdm.password'),
        database: configService.get<string>('database.mssql_mdm.name'),
        type: 'mssql',
        extra: {
          options: {
            encrypt: true,
            trustServerCertificate: true,
            useUTC: true,
          },
        },
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
})
export class MsSqlMdmDatabaseModule {}
