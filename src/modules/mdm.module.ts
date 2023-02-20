import { HealthcheckModule } from '@mdm/module/healthcheck/healthcheck.module';
import { InterestRatesModule } from '@mdm/module/interest-rates/interest-rates.module';
import { MarketsModule } from '@mdm/module/markets/markets.module';
import { NumbersModule } from '@mdm/module/numbers/numbers.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [NumbersModule, HealthcheckModule, MarketsModule, InterestRatesModule],
  exports: [NumbersModule, HealthcheckModule, MarketsModule, InterestRatesModule],
})
export class MdmModule {}
