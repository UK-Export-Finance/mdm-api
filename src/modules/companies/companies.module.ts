import { Module } from '@nestjs/common';
import { CompaniesHouseModule } from '@ukef/helper-modules/companies-house/companies-house.module';

import { SectorIndustriesModule } from '../sector-industries/sector-industries.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [CompaniesHouseModule, SectorIndustriesModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
