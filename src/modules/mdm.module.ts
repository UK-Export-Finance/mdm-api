import { Module } from '@nestjs/common';
import { AuthModule } from '@ukef/auth/auth.module';
import { DatabaseModule } from '@ukef/database/database.module';
import { ConstantsModule } from '@ukef/module/constants/constants.module';
import { CurrenciesModule } from '@ukef/module/currencies/currencies.module';
import { ExposurePeriodModule } from '@ukef/module/exposure-period/exposure-period.module';
import { HealthcheckModule } from '@ukef/module/healthcheck/healthcheck.module';
import { InterestRatesModule } from '@ukef/module/interest-rates/interest-rates.module';
import { MarketsModule } from '@ukef/module/markets/markets.module';
import { NumbersModule } from '@ukef/module/numbers/numbers.module';
import { PremiumSchedulesModule } from '@ukef/module/premium-schedules/premium-schedules.module';
import { SectorIndustriesModule } from '@ukef/module/sector-industries/sector-industries.module';
import { YieldRatesModule } from '@ukef/module/yield-rates/yield-rates.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConstantsModule,
    CurrenciesModule,
    ExposurePeriodModule,
    HealthcheckModule,
    InterestRatesModule,
    MarketsModule,
    NumbersModule,
    PremiumSchedulesModule,
    SectorIndustriesModule,
    YieldRatesModule,
  ],
  exports: [
    AuthModule,
    DatabaseModule,
    ConstantsModule,
    CurrenciesModule,
    ExposurePeriodModule,
    HealthcheckModule,
    InterestRatesModule,
    MarketsModule,
    NumbersModule,
    PremiumSchedulesModule,
    SectorIndustriesModule,
    YieldRatesModule,
  ],
})
export class MdmModule {}
