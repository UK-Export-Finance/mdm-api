import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'mssql-cis',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'mssql-cis',
        host: configService.get<string>('database.mssql_cis.host'),
        port: configService.get<number>('database.mssql_cis.port'),
        username: configService.get<string>('database.mssql_cis.username'),
        password: configService.get<string>('database.mssql_cis.password'),
        database: configService.get<string>('database.mssql_cis.name'),
        type: 'mssql',
        extra: {
          options: {
            encrypt: true,
            trustServerCertificate: true,
          },
        },
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
})
export class MsSqlCisDatabaseModule {}
