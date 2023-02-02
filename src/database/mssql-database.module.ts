import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('database.mssql.host'),
        port: configService.get<number>('database.mssql.port'),
        username: configService.get<string>('database.mssql.username'),
        password: configService.get<string>('database.mssql.password'),
        database: configService.get<string>('database.mssql.name'),
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
export class MsSqlDatabaseModule {}
