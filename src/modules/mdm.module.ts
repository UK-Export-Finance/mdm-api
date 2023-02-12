import { Module } from '@nestjs/common';

import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { MarketsModule } from './markets/markets.module';
import { NumbersModule } from './numbers/numbers.module';

@Module({
  imports: [NumbersModule, HealthcheckModule, MarketsModule],
  exports: [NumbersModule, HealthcheckModule, MarketsModule],
})
export class MdmModule {}
