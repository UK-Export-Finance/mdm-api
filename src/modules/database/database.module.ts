import { Module } from '@nestjs/common';

import { MsSqlCedarDatabaseModule } from './mssql-cedar-database.module';
import { MsSqlCisDatabaseModule } from './mssql-cis-database.module';
import { MsSqlMdmDatabaseModule } from './mssql-mdm-database.module';
import { MsSqlNumberGeneratorDatabaseModule } from './mssql-number-generator-database.module';

@Module({
  imports: [MsSqlMdmDatabaseModule, MsSqlCedarDatabaseModule, MsSqlCisDatabaseModule, MsSqlNumberGeneratorDatabaseModule],
  exports: [MsSqlMdmDatabaseModule, MsSqlCedarDatabaseModule, MsSqlCisDatabaseModule, MsSqlNumberGeneratorDatabaseModule],
})
export class DatabaseModule {}
