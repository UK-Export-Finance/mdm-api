import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '@ukef/database/database.module';

import { HealthcheckController } from './healthcheck.controller';

@Module({
  imports: [DatabaseModule, TerminusModule],
  controllers: [HealthcheckController],
})
export class HealthcheckModule {}
