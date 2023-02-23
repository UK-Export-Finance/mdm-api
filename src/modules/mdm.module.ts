import { HealthcheckModule } from '@ukef/module/healthcheck/healthcheck.module';
import { InterestRatesModule } from '@ukef/module/interest-rates/interest-rates.module';
import { MarketsModule } from '@ukef/module/markets/markets.module';
import { NumbersModule } from '@ukef/module/numbers/numbers.module';
import { SectorIndustriesModule } from '@ukef/module/sector-industries/sector-industries.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [NumbersModule, HealthcheckModule, MarketsModule, InterestRatesModule, SectorIndustriesModule],
  exports: [NumbersModule, HealthcheckModule, MarketsModule, InterestRatesModule, SectorIndustriesModule],
})
export class MdmModule {}
