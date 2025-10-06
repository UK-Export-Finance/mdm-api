import { Module } from '@nestjs/common';
import { AuthModule } from '@ukef/auth/auth.module';
import { DatabaseModule } from '@ukef/database/database.module';
import { CompaniesModule } from '@ukef/modules/companies/companies.module';
import { CurrenciesModule } from '@ukef/modules/currencies/currencies.module';
import { CustomersModule } from '@ukef/modules/customers/customers.module';
import { DomModule } from '@ukef/modules/dom/dom.module';
import { EmailsModule } from '@ukef/modules/emails/emails.module';
import { ExposurePeriodModule } from '@ukef/modules/exposure-period/exposure-period.module';
import { GeospatialModule } from '@ukef/modules/geospatial/geospatial.module';
import { HealthcheckModule } from '@ukef/modules/healthcheck/healthcheck.module';
import { InterestRatesModule } from '@ukef/modules/interest-rates/interest-rates.module';
import { MarketsModule } from '@ukef/modules/markets/markets.module';
import { NumbersModule } from '@ukef/modules/numbers/numbers.module';
import { OdsModule } from '@ukef/modules/ods/ods.module';
import { PremiumSchedulesModule } from '@ukef/modules/premium-schedules/premium-schedules.module';
import { SectorIndustriesModule } from '@ukef/modules/sector-industries/sector-industries.module';
import { YieldRatesModule } from '@ukef/modules/yield-rates/yield-rates.module';

@Module({
  imports: [
    AuthModule,
    CompaniesModule,
    CurrenciesModule,
    CustomersModule,
    DatabaseModule,
    DomModule,
    EmailsModule,
    ExposurePeriodModule,
    GeospatialModule,
    HealthcheckModule,
    InterestRatesModule,
    MarketsModule,
    NumbersModule,
    OdsModule,
    PremiumSchedulesModule,
    SectorIndustriesModule,
    YieldRatesModule,
  ],
  exports: [
    AuthModule,
    CompaniesModule,
    CurrenciesModule,
    CustomersModule,
    DatabaseModule,
    DomModule,
    EmailsModule,
    ExposurePeriodModule,
    GeospatialModule,
    HealthcheckModule,
    InterestRatesModule,
    MarketsModule,
    NumbersModule,
    OdsModule,
    PremiumSchedulesModule,
    SectorIndustriesModule,
    YieldRatesModule,
  ],
})
export class MdmModule {}
