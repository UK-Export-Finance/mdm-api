import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'mssql-number-generator',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'mssql-number-generator',
        host: configService.get<string>('database.mssql_number_generator.host'),
        port: configService.get<number>('database.mssql_number_generator.port'),
        username: configService.get<string>('database.mssql_number_generator.username'),
        password: configService.get<string>('database.mssql_number_generator.password'),
        database: configService.get<string>('database.mssql_number_generator.name'),
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
export class MsSqlNumberGeneratorDatabaseModule {}
