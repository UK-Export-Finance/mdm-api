import { Module } from '@nestjs/common';

import { MsSqlOdsDatabaseModule } from '../database/mssql-ods-database.module';
import { OdsController } from './ods.controller';
import { OdsService } from './ods.service';
import { OdsAccrualsService } from './ods-accruals.service';
import { OdsFacilityCategoryService } from './ods-facility-category.service';
import { OdsObligationSubtypeService } from './ods-obligation-subtype.service';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Module({
  imports: [MsSqlOdsDatabaseModule],
  controllers: [OdsController],
  providers: [OdsService, OdsAccrualsService, OdsFacilityCategoryService, OdsObligationSubtypeService, OdsStoredProcedureService],
})
export class OdsModule {}
