import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@ukef/auth/auth.module';
import { AuthService } from '@ukef/auth/auth.service';
import config from '@ukef/config';
import { DatabaseModule } from '@ukef/database/database.module';
import { MdmModule } from '@ukef/module/mdm.module';
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
    AuthModule,
    DatabaseModule,
    MdmModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class MainModule {}
