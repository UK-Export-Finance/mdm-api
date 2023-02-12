import config from '@mdm/config/';
import { MsSqlCedarDatabaseModule, MsSqlCisDatabaseModule, MsSqlMdmDatabaseModule, MsSqlNumberGeneratorDatabaseModule } from '@mdm/database/';
import { MdmModule } from '@mdm/module/mdm.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    MsSqlMdmDatabaseModule,
    MsSqlCedarDatabaseModule,
    MsSqlCisDatabaseModule,
    MsSqlNumberGeneratorDatabaseModule,
    MdmModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
