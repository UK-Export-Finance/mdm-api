import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MdmModule } from './modules/mdm.module';
import { MsSqlDatabaseModule, RedisCacheModule } from './database';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
    }),
    MsSqlDatabaseModule,
    RedisCacheModule,
    MdmModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
