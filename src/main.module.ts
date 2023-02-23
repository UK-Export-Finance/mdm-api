import config from '@ukef/config';
import { MsSqlCedarDatabaseModule, MsSqlCisDatabaseModule, MsSqlMdmDatabaseModule, MsSqlNumberGeneratorDatabaseModule } from '@ukef/database';
import { MdmModule } from '@ukef/module/mdm.module';
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
