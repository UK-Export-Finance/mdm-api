import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'mssql-mdm',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('database.mssql_mdm.host'),
        port: configService.get<number>('database.mssql_mdm.port'),
        username: configService.get<string>('database.mssql_mdm.username'),
        password: configService.get<string>('database.mssql_mdm.password'),
        database: configService.get<string>('database.mssql_mdm.name'),
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
export class MsSqlMdmDatabaseModule {}
