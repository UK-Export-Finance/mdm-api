import { Module } from '@nestjs/common';

import { MsSqlOdsDatabaseModule } from '../database/mssql-ods-database.module';
import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';
import { OdsAccrualsService } from './ods-accruals.service';

@Module({
  imports: [MsSqlOdsDatabaseModule],
  controllers: [OdsController],
  providers: [OdsService, OdsAccrualsService],
})
export class OdsModule {}
