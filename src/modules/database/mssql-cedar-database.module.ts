import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME, DATABASE_TYPE } from '@ukef/constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DATABASE_NAME.CEDAR,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: DATABASE_NAME.CEDAR,
        host: configService.get<string>('database.mssql_cedar.host'),
        port: configService.get<number>('database.mssql_cedar.port'),
        username: configService.get<string>('database.mssql_cedar.username'),
        password: configService.get<string>('database.mssql_cedar.password'),
        database: configService.get<string>('database.mssql_cedar.name'),
        type: DATABASE_TYPE.MSSQL,
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
