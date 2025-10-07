import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DATABASE.CEDAR,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: DATABASE.CEDAR,
        host: configService.get<string>('database.mssql_cedar.host'),
        port: configService.get<number>('database.mssql_cedar.port'),
        username: configService.get<string>('database.mssql_cedar.username'),
        password: configService.get<string>('database.mssql_cedar.password'),
        database: configService.get<string>('database.mssql_cedar.name'),
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
export class MsSqlCedarDatabaseModule {}
