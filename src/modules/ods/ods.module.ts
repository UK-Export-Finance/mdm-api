import { Module } from '@nestjs/common';

import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';
import { MsSqlOdsDatabaseModule } from '../database/mssql-ods-database.module';

@Module({
  imports: [MsSqlOdsDatabaseModule],
  controllers: [OdsController],
  providers: [OdsService],
})
export class OdsModule {}
