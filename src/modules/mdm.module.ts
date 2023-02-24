import { Module } from '@nestjs/common';
import { ConstantsModule } from '@ukef/module/constants/constants.module';
import { ExposurePeriodModule } from '@ukef/module/exposure-period/exposure-period.module';
import { HealthcheckModule } from '@ukef/module/healthcheck/healthcheck.module';
import { InterestRatesModule } from '@ukef/module/interest-rates/interest-rates.module';
import { MarketsModule } from '@ukef/module/markets/markets.module';
import { NumbersModule } from '@ukef/module/numbers/numbers.module';
import { SectorIndustriesModule } from '@ukef/module/sector-industries/sector-industries.module';

@Module({
  imports: [ConstantsModule, ExposurePeriodModule, HealthcheckModule, InterestRatesModule, MarketsModule, NumbersModule, SectorIndustriesModule],
  exports: [ConstantsModule, ExposurePeriodModule, HealthcheckModule, InterestRatesModule, MarketsModule, NumbersModule, SectorIndustriesModule],
})
export class MdmModule {}
