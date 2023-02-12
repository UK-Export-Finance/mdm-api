import { HealthcheckModule } from '@mdm/module/healthcheck/healthcheck.module';
import { MarketsModule } from '@mdm/module/markets/markets.module';
import { NumbersModule } from '@mdm/module/numbers/numbers.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [NumbersModule, HealthcheckModule, MarketsModule],
  exports: [NumbersModule, HealthcheckModule, MarketsModule],
})
export class MdmModule {}
