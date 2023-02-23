import { HealthcheckModule } from '@mdm/module/healthcheck/healthcheck.module';
import { InterestRatesModule } from '@mdm/module/interest-rates/interest-rates.module';
import { MarketsModule } from '@mdm/module/markets/markets.module';
import { NumbersModule } from '@mdm/module/numbers/numbers.module';
import { SectorIndustriesModule } from '@mdm/module/sector-industries/sector-industries.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [NumbersModule, HealthcheckModule, MarketsModule, InterestRatesModule, SectorIndustriesModule],
  exports: [NumbersModule, HealthcheckModule, MarketsModule, InterestRatesModule, SectorIndustriesModule],
})
export class MdmModule {}
