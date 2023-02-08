import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MdmModule } from './modules/mdm.module';
import { MsSqlMdmDatabaseModule, MsSqlCedarDatabaseModule, MsSqlCisDatabaseModule, MsSqlNumberGeneratorDatabaseModule } from './database';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...config],
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
