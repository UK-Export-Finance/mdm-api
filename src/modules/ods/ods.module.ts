import { Module } from '@nestjs/common';
import { MsSqlOdsDatabaseModule } from '../database/mssql-ods-database.module';
import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';

@Module({
  imports: [MsSqlOdsDatabaseModule],
  controllers: [OdsController],
  providers: [OdsService],
})
export class OdsModule {}
