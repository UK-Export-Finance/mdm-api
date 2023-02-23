import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MsSqlCedarDatabaseModule, MsSqlCisDatabaseModule, MsSqlMdmDatabaseModule, MsSqlNumberGeneratorDatabaseModule } from '@ukef/database';

import { HealthcheckController } from './healthcheck.controller';

@Module({
  imports: [MsSqlMdmDatabaseModule, MsSqlCedarDatabaseModule, MsSqlCisDatabaseModule, MsSqlNumberGeneratorDatabaseModule, TerminusModule],
  controllers: [HealthcheckController],
  providers: [],
})
export class HealthcheckModule {}
