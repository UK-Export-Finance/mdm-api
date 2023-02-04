import { Module } from '@nestjs/common';

import { NumbersModule } from './numbers/numbers.module';
import { MarketsModule } from './markets/markets.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [NumbersModule, HealthcheckModule, MarketsModule],
  exports: [NumbersModule, HealthcheckModule, MarketsModule],
})
export class MdmModule {}
