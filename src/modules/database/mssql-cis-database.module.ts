import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME, DATABASE_TYPE } from '@ukef/constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DATABASE_NAME.CIS,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: DATABASE_NAME.CIS,
        host: configService.get<string>('database.mssql_cis.host'),
        port: configService.get<number>('database.mssql_cis.port'),
        username: configService.get<string>('database.mssql_cis.username'),
        password: configService.get<string>('database.mssql_cis.password'),
        database: configService.get<string>('database.mssql_cis.name'),
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
export class MsSqlCisDatabaseModule {}
