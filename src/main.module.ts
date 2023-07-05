import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@ukef/config';
import { MdmModule } from '@ukef/modules/mdm.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          customProps: () => ({
            context: 'HTTP',
          }),
          level: config.get<string>('app.logLevel'),
          transport: {
            target: 'pino-pretty',
            options: {
              singleLine: true,
            },
          },
        },
      }),
    }),
    MdmModule,
  ],
})
export class MainModule {}
