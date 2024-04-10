import { Module } from '@nestjs/common';
import { AuthModule } from '@ukef/auth/auth.module';
import { DatabaseModule } from '@ukef/database/database.module';
import { OrdnanceSurveyModule } from '@ukef/helper-modules/ordnance-survey/ordnance-survey.module';
import { CurrenciesModule } from '@ukef/modules/currencies/currencies.module';
import { CustomersModule } from '@ukef/modules/customers/customers.module';
import { ExposurePeriodModule } from '@ukef/modules/exposure-period/exposure-period.module';
import { GeospatialModule } from '@ukef/modules/geospatial/geospatial.module';
import { HealthcheckModule } from '@ukef/modules/healthcheck/healthcheck.module';
import { InterestRatesModule } from '@ukef/modules/interest-rates/interest-rates.module';
import { MarketsModule } from '@ukef/modules/markets/markets.module';
import { NumbersModule } from '@ukef/modules/numbers/numbers.module';
import { PremiumSchedulesModule } from '@ukef/modules/premium-schedules/premium-schedules.module';
import { SectorIndustriesModule } from '@ukef/modules/sector-industries/sector-industries.module';
import { YieldRatesModule } from '@ukef/modules/yield-rates/yield-rates.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    CurrenciesModule,
    CustomersModule,
    ExposurePeriodModule,
    HealthcheckModule,
    InterestRatesModule,
    MarketsModule,
    NumbersModule,
    PremiumSchedulesModule,
    SectorIndustriesModule,
    YieldRatesModule,
    OrdnanceSurveyModule,
    GeospatialModule,
  ],
  exports: [
    AuthModule,
    DatabaseModule,
    CurrenciesModule,
    CustomersModule,
    ExposurePeriodModule,
    HealthcheckModule,
    InterestRatesModule,
    MarketsModule,
    NumbersModule,
    PremiumSchedulesModule,
    SectorIndustriesModule,
    YieldRatesModule,
    OrdnanceSurveyModule,
    GeospatialModule,
  ],
})
export class MdmModule {}
