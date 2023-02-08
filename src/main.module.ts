import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { MdmModule } from './modules/mdm.module';
import { MsSqlMdmDatabaseModule, MsSqlCedarDatabaseModule, MsSqlCisDatabaseModule, MsSqlNumberGeneratorDatabaseModule } from './database';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
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
