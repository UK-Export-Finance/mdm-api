import { Module } from '@nestjs/common';

import { MdmCountriesModule } from './countries/mdm-countries.module';
import { CountryModule } from './country/country.module';
import { CreditRiskRatingModule } from './credit-risk-rating/credit-risk-rating.module';
import { BondTypeModule } from './bond-types/bond-types.module';

@Module({
  imports: [MdmCountriesModule, CountryModule, CreditRiskRatingModule, BondTypeModule],
  exports: [MdmCountriesModule, CountryModule, CreditRiskRatingModule, BondTypeModule],
})
export class MdmModule {}
